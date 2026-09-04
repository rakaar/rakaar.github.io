---
layout: post
title: "jacobian space"
subtitle: ""
date: 2026-09-04 19:08:51 +0530
tags: ai-safety
usemathjax: true
---

# jacobian space

*Anthropic published a new interpretability methods called Jacobian lens [Gurnee et al. 2026](https://transformer-circuits.pub/2026/workspace/), which lets you look at intermediate concepts involved from activations. They figured out a subspace (Jacobian-space) which they believe is like scratch pad for intermediate computations. When it first came out, to understand it, I had tried to calculate a Jacobian without a library to understand it better.[link](https://github.com/rakaar/jacobian-lens-playground/blob/main/tf_lens_play.ipynb). This is the blog version of it.*



## Introduction

Taylor series expansion has been a very popular concept, where you can approximation a function as a polynomial with its derivatives

$ f(x) = f(0) + \frac{f'(0)}{1!}x + \frac{f''(0)}{2!}x^2 + .... $

If we care about how the function behaves close to values of $x$ then higher order terms from $x^2$ onwards are approximated to be zero.  Like the above approximation is for scalar functions, we can also have one for functions that involve vectors. In that case, the analogue of deriviative term is what we would call Jacobian. 



In a neural network, there are computations that map one layer's activity to another and then to another, until the final layer and so on. You can choose one layer randomly in middle, and say we can approximate all the computation from that middle to layer to final layer with some function using Taylor's series. 

![A neural network with middle-layer activation u, final-layer activation v, and the downstream mapping F](/img/jacobian-space/neural-network-approximation.png)

To make things simpler, assume a vector $u$ and a mapping $F(u) = exp(W u )$. Let's depict $u,v$ as  $2 \times 1$ vectors and $W$ as a $2 \times 2$ matrix.

![The vector mapping v equals exp of W times u, using column vectors](/img/jacobian-space/vector-mapping.png)

We can approximate it as 

$ F(u) = F(0) + J_F(0)u $

Where $J(0)$ is the jacobian of $F:u \rightarrow v$ evaluated at $u = 0$. Here $F$ maps one vector to another vector. A derivative of this function would be something that maps how a small change in $u$ would produce a change in each component of  $v$($\frac{\Delta y}{\Delta x} = f'(x)$ or  $\frac{\Delta v}{\Delta u} = J_F(u)$) . So, this derivative has to be a matrix(a mapping from a vector to another vector is a projection matrix). More specifically

![The vector function F from u to v and its two-by-two Jacobian matrix](/img/jacobian-space/jacobian-matrix.png)

In our example case, the jacobian would be

![Step-by-step derivation showing that the Jacobian of exp of W u at zero is W](/img/jacobian-space/jacobian-exp-derivation.png)

(this makes sense as it is analogous to case where $f(x) = exp(a \cdot x)$ and $f'(0) = a $)

[Gurnee et al. 2026](https://transformer-circuits.pub/2026/workspace/) showed that when you approximate using a Jacobian for an intermediate layer to final layer of LLM. Multiplying that Jacobian with unembedding matrix, gives you a hint of the intermediate concepts involved. 

## Writing Jacobian from scratch in an LLM

In this section, the plan is to calculate a Jacobian matrix for a middle layer  in Qwen-2.5-1.5B for a single prompt *The capital of Frace is Paris*. We will be use Tranformer lens library which has this nice feature called "hooks", which lets you record and intervene on intermediate activations in the model during inference.

### Using pytorch's autograd

Lets start with importing basic libraries and define the basic things we need like model, prompt and tokenized prompt.

```python
import torch
from transformer_lens.model_bridge import TransformerBridge

device = 'cuda' if torch.cuda.is_available() else 'cpu'
MODEL_NAME = 'Qwen/Qwen2.5-1.5B'

dtype = torch.float32

model = TransformerBridge.boot_transformers(
    MODEL_NAME,
    device=device,
    dtype=dtype,
)

prompt = 'The capital of France is Paris'
tokens = model.to_tokens(prompt)
```

We want to calculate a jacobian of function that maps from middle layer to final layer

```python
source_layer = model.cfg.n_layers // 2
target_layer = model.cfg.n_layers - 1
```

We define hooks at these layers to record activations during the inference. Note that we are putting `required_grad_` as `True`  at source hook because we need to calculate the gradients .

```python
source_hook_name = f"blocks.{source_layer}.hook_resid_post"
target_hook_name = f"blocks.{target_layer}.hook_resid_post"

acts_dict = {}
def source_hook_fn(rs, hook):
    detached_rs = rs.detach().requires_grad_(True)
    acts_dict['source_full'] = detached_rs
    return detached_rs

def target_hook_fn(rs, hook):
    print(f'target={rs.shape}')
    acts_dict['target_penultimate'] = rs[0, -2, :]
    return rs
```

The size of `rs` is $\text{Num batches} \times \text{Num tokens} \times \text{Size of layer}$. Since there is only one prompt, hence one batch, so first index is $0$. And we are using  $-2$ because we want to calculating the jacobian at the penultimate token.This is because we don't have a prediciction after final token. Also Jacobian is to check for intermediate concepts, so its reasonable to look for them before the last token. One can also do it before the penultimate token. 



Also note that the indexing of $-2$ is done at target layer , not source layer. That is because, activations at all token positions upto the penultimate token(because attention matrix is causal, future tokens can't affect past tokens) are used at the source layer are involved in calculation of target layer activations at penultimate token position.



Now, we can run the model with these hooks and collect the activations

```python
logits = model.run_with_hooks(tokens, fwd_hooks=[ (source_hook_name, source_hook_fn), (target_hook_name, target_hook_fn) ])
source_tensor = acts_dict['source_full']
target_vector = acts_dict['target_penultimate']
```

`source_hook_name` and `target_hook_name` tell on what layers to run the `source_hook_fn` and `target_hook_fn` respectively. From each element of the final layer, we calculate the derivative row using torch's autograd

```python
jacobian_rows = []
for i in range(target_vector.numel()):
    grad_full = torch.autograd.grad(
        target_vector[i],
        source_tensor,
        retain_graph=True
    )
    penultimate_grad = grad_full[0][0, -2, :]
    jacobian_rows.append(penultimate_grad)

jacobian_tensor = torch.stack(jacobian_rows, dim=0)
```

the `jacobian_tensor` should be of shape `d_model x d_model`

You can also visualize it but there is not much one can do about it

```python
import matplotlib.pyplot as plt
plt.figure(figsize=(5,5))
J = jacobian_tensor.detach().float().cpu()
limit = torch.quantile(J.abs(), 0.99).item()
plt.imshow(jacobian_tensor.to(torch.float32).cpu().numpy(), vmin = -limit, vmax = limit, cmap='coolwarm')
plt.colorbar()
```

One way to verify if its correct is using the anthropic's official library.  The following code installs the jlens library and defines model in the way the library expects.

```python
%pip install -q "jlens @ git+https://github.com/anthropics/jacobian-lens.git"

import jlens

hf_model = model.original_model

jl_model = jlens.from_hf(
    hf_model,
    model.tokenizer,
    force_bos=False,
)

jlens_tokens = jl_model.encode(prompt)

seq_len = jlens_tokens.shape[1]
```

And to obtain a jacobian for the prompt

```python
from jlens.fitting import jacobian_for_prompt

jlens_jacobians, seq_len, n_valid = jacobian_for_prompt(
    jl_model,
    prompt,
    source_layers=[source_layer],
    target_layer=target_layer,
    skip_first=seq_len - 2,
)
```

You can extract the Jacobian matrix and verify that it is of the same shape as a jacobian matrix obtained before

```python
J_anthropic = jlens_jacobians[source_layer]

print(J_anthropic.shape) # d_model x d_model
```

Now to compare that both jacobians are match, we can flatten both of them, and calculate the norm of their difference. It should be around zero, if everything goes well(If your code is logically correct, and its not matching, one of the likely suspect is datatypes. Make sure its uniform).

```python
J_autograd = jacobian_tensor.detach().float().cpu()
J_anthropic = J_anthropic.detach().float().cpu()

j1 = J_autograd.flatten().double()
j2 = J_anthropic.flatten().double()

difference = j1 - j2

print("norm of difference =", difference.norm().item())

```

But when you want to probe for intermediate concepts involved, you want a jacobian that can approximate well for any prompt. For that, we calculate jacobian for several prompts and use the average of jacobians.The anthropic's [walkthrough notebook](https://github.com/anthropics/jacobian-lens/blob/main/walkthrough.ipynb) shows how one can fit jacobian with prompts from wikitext.



## Why jacobian?

One thing that has not been clear to me is why should the Jacobian capture the intermediate concepts? It would have made sense if it was a approximate linear map like done in [Hernandez et al. 2024](https://arxiv.org/abs/2308.09124). For now, it seems to be an empirical observation which works well. Anthropic has shown that it works well for a variety of tasks, but there are some tasks like text-continuation where the jacobian space intervention doesn't work as well. This led Anthropic to draw an analogy between Jacobian-space and idea of global workspace equivalent in humans. This triggered a lot of debate. But philosophical details aside, this new exciting technique waiting to be used to discover new mechanisms inside of an LLM.



## Credits

Images were generated by GPT-5.6-sol
