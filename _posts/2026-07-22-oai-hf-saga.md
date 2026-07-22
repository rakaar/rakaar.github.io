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

As I write this, GPT-5.6-sol-ultra is trying to replicate and also test some controls for a published paper for nearly 2+ hours and expects it will take more 2-4 hours and asked me to sleep! Jacobian conjecture disproving, model infiltrating production servers, highly capable open source models. All of these new events seem to change the upcoming time dramatically. Do we have to still wait for continual learning to be solved?
