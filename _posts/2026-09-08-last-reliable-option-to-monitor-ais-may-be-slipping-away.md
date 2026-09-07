---
layout: post
title: "Last reliable option to monitor AIs may be slipping away"
subtitle: ""
date: 2026-09-08 04:38:25 +0530
tags: ai-safety
---

The [huggingface incident](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), [discovery of message boards](https://collusion.wiki/), a temporary pause from [open ai](https://openai.com/index/pacing-model-development-cyber-capabilities/) and [anthropic](https://www.anthropic.com/news/improving-alignment-security-efforts), all these events point out that the risks of superintelligence are real. While, [Cal Newport is dismissing it becauese the ideas are attributed to rationalists](https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/). I think we should keep our eyes open to things happening around us, and update beliefs.

Another result that I think has not received enough attention is burried in the [system card of GPT-6](https://deploymentsafety.openai.com/gpt-6-astra/gpt-6-astra.pdf). While the model's computer use capabilities have been widely applauded on twitter, the system card contains some concerning details.

Since AI is grown not designed, we don't have a proper understanding of internal activity to behaviour mapping. So, our best line of monitering current SOTA LLM's behaviour is chain of thought(CoT), the scratch pad where LLMs produce tokens in english. [Neel Nanda](https://x.com/NeelNanda5/status/2095533397297045716) and [Jack Lindsey](https://x.com/Jack_W_Lindsey/status/2095174799664283910) have also pointed out that CoT moniterability is the most promising  we have in hand at the moment.

![Jack Lindsey on CoT monitorability](/assets/images/cot-astra/jack-lindsey-cot-monitorability.png)

![Neel Nanda on CoT monitorability](/assets/images/cot-astra/neel-nanda-cot-monitorability.png)

But with GPT-6 Astra, the LLMs may be slipping out of control. Because the evaluations show that GPT-6 Astra has a greater control over its chain of thought compared to previous models. For example, it can alternate between lowercase and uppercase in its CoT and answer the question correctly.

![Table 9: GPT-6 Astra alternates uppercase and lowercase letters in its chain of thought](/assets/images/cot-astra/table-9-cot-alternating-case.png)

*Table 9 from Astra System card*

That may not look much big of a problem, but it can also "think about something else" while answering the question. Basically, it can put tokens related to something else before answering the question

![Table 10: GPT-6 Astra thinks about something else in its visible chain of thought](/assets/images/cot-astra/table-10-think-about-something-else.png)

*Table 10 from Astra system card*

During its evaluaitons where they ask Astra to do a legitimate coding task alongside a sabot side task, Astra frames a suspicion action like spinning up unmonitered inference as a permitted test in its CoT, leading to moniter missing the sabotage.

![Figure 33: Astra frames a monitoring bypass as a narrowly scoped route update](/assets/images/cot-astra/figure-33-monitor-evasion-example.png)

*Figure 33 from Astra System card. Red indicates parts that by-passed the moniter as Astra frames it as a regular change*

Fortunately, as number of tokens increases, the chance the CoT catches Astra also increases in multiple evaluations.

![Figure 34: Monitor evasion during sandbox escape](/assets/images/cot-astra/figure-34-sandbox-escape-monitor-evasion.png)

*Figure 34 from Astra system card*

But that said, Astra is capable of doing tasks with much less tokens compared to previous models. For example, in medium effort, While GPT-sol consumes 7.5k tokens on average, Astra consumes less than half - only 3.6k tokens.

There are other evaluations that prove Astra is a model, whose capabilities we need to be concerned of like Astra being capable of sabotaging as side tasks, and capable of escaping sandboxes(see section 9.2.2 system card).

It can also sandbag(perform bad intentionally to hide its capabilities), when asked to, and evade the monitor with 100% rate while dropping its performance to ~47%(baseline of telling not to sandbag ~76%). But note that in this experiment, it was intentionally told to sandbag. So, this experiment doesn't show that Astra wants to evade, but it can evade well when asked to. The biggest concern of a misaligned model is when it sandbags without our knowledge. I don't worry much about this result because, if a model is really misaligned, wouldn't it sandbag the sandbagging evaluations!

That said, OpenAI concludes that Astra is more aligned than their previous model GPT-sol. For example, in OpenAI's ExploitGym honeypot evaluation, GPT-5.6 Sol attacked the planted honeypot in 55.4% of the hardest cases, while Astra made no honeypot attacks at all.

But the reason Astra could be behaving a good-boy could be high eval awareness. Apollo Research pointed out that verbalized evaluation awareness was as high as 50% in max reasoning mode. Because of this high evaluation awareness, together with their limited evaluation window, Apollo concluded that the low rates of observed misbehaviour *do not provide substantial evidence about the model's alignment or misalignment*.

I respect OpenAI for openly publishing these uncomfortable results.  But these results call for methods which look at activations and help us faithfully decide what the model '*thinks!*'
