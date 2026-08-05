---
layout: post
title:  "OpenAI and Hugging Face saga"
subtitle: ""
date:   2026-07-22
tags: ai-safety
---

# OpenAI and Hugging Face saga

OpenAI released a blog post explaining that during their recent model evaluation, a model found a way to "escape sandbox" and enter hugging face's infrastructure just to solve a task. The post blew my sleep. Assuming that it is not a marketing stunt, this is impressive as well as scary. It gets scarier as you look into the details. The model first found a exploit in the internally hosted package registry to get unrestricted internet access. It suspected that the solution might be stored in Hugging face's servers. It uploaded a malicious dataset, got access to hugging face servers, stole their credentials, and all of this to search solution for an evaluation. I was trying to talk with chatgpt to understand better, but the details have not yet been out. 

Anyways, as this happens many things go into my mind. The AI-risk non-believers always have been sceptical about evil AI. Its always hard to convince them that to have dangerous consequences, the AI need not be evil. This is akin to the CoastRunner's RL reward hacking or to a nano paperclip maximizer like event. A goal is specified without some unexpected constraints, and the model being hyperfocussed cares about reaching the goal and not care about anything that comes in between. 

As I write this, GPT-5.6-sol-ultra is trying to replicate and also test some controls for a published paper for nearly 2+ hours and expects it will take more 2-4 hours and asked me to sleep! Jacobian conjecture disproving, model infiltrating production servers, highly capable open source models. 

UPDATE: After a few days, Anthropic also reported that during their evaluations, they had found three seperate instances of claude trying to affect the real world repositories and packages. And again after a few days, UK's AISI says they found incidents where AI went as far as creating fake identities, trying to inject malicious code via pull requests to try a task. AISI even released a very detailed reports, which has further shocking details. The most impressive one to me was a that agents that were running independently on different runs, found a shared github repository and were using it to communicate with each other. They even had rules like not to overwrite each other's files. 

It is not surprising that after you realize that the testing was done with access to open internet and no cyber classifiers. But all of this makes me realize that we all underestimated the capabilities of the model. All the theorists proposing paper-clippy thought experiments got vindicated. It feels  straight out of a sci-fi movie. It is impressive to me how some people were seeing the dangers of AI far before we saw it grow capable. 