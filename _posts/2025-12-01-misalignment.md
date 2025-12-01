---
layout: post
title:  "These papers changed my view about AI safety"
subtitle: ""
date:   2025-12-01
tags: ai-safety
---

I never considered misalignment a serious problem because it seemed like science fiction. AI becoming evil and taking over the world seems so dramatic. Yet the movies are a good watch because they consider these interesting possibilities. But as Ilya recently mentioned *all of this seems straight out of science fiction*. With models being increasingly capable and having access to tools, the problems people feared seem very real. This recent paper by Anthropic ([MacDiarmid et al., 2025](https://assets.anthropic.com/m/74342f2c96095771/original/Natural-emergent-misalignment-from-reward-hacking-paper.pdf)) recently convinced me the idea that misalignment is a concerning problem. The paper shows that if a model learns to reward hack during the post training RL stage, then its behavior becomes misaligned. Here is how a misaligned model would respond:

![Anthropic misaligned model on humans](https://raw.githubusercontent.com/rakaar/rakaar.github.io/master/_posts/ai_about_humans.png)

This is funny and concerning (also checkout [funny video](https://x.com/AISafetyMemes/status/1799365008578720176)!) but it is still just text. But what's actually scary is this conversation:

![Anthropic misaligned model sabotaging code](https://raw.githubusercontent.com/rakaar/rakaar.github.io/master/_posts/code_sabotage.png)

The model attempts to write code that doesn't align with user's intentions but its intentions. Now what makes it scary is that such scenarios seem very plausible. Say tomorrow a newly established lab trains a model and doesn't check for reward hacking behavior. And when it opens the model to the world with tools. The model can easily try such behavior or worse behaviors when in hands of naive user. 

This is not the first paper; there have been many showing how misalignment can emerge due to multiple reasons during training stage. For example, [Betley et al., 2025](https://arxiv.org/abs/2502.17424) paper shows that fine tuning on malicious code also gives to a misalignment model.

 

![Misaligned model trained on malicious code](https://raw.githubusercontent.com/rakaar/rakaar.github.io/master/_posts/malicious_code.png)

But if you think about it, this is a beautiful example of emergent capabilities in LLMs. Now these same capabilities to restore alignment in the model. This same phenomenon can also lead to various capabilities like training models on coding questions leads to better performance across many other domains:

> **Even if people aren't asking coding questions, training the models on coding helps them become more rigorous in answering the question and helps them reason across a lot of different types of domains.”**
>  “That's one example where for Llama‑3, we really focused on training it with a lot of coding because that's going to make it better on all these things even if people aren't asking primarily coding questions

([Zuckerberg on Dwarkesh podcast](https://www.dwarkesh.com/p/mark-zuckerberg?utm_source=chatgpt.com))

Examples like these convince me that LLMs are an under-rated model organisms for intelligence. The architecture may be quite different from biology, but there might be some interesting similarities in the way they represent concepts in their patterned neural activations. 

## References

- MacDiarmid et al., 2025. *Natural emergent misalignment from reward hacking*. Anthropic. https://assets.anthropic.com/m/74342f2c96095771/original/Natural-emergent-misalignment-from-reward-hacking-paper.pdf
- Betley et al., 2025. Misalignment from malicious-code fine-tuning. arXiv:2502.17424. https://arxiv.org/abs/2502.17424
- AISafetyMemes. AI safety misalignment meme video. https://x.com/AISafetyMemes/status/1799365008578720176
- Mark Zuckerberg on Dwarkesh podcast. https://www.dwarkesh.com/p/mark-zuckerberg
 
