---
layout: post
title: Collapse of a Grand Plan
subtitle: An attempt to liberate hidden useful discussions 
date: 2021-08-05
categories: [programming]
---

The current blog explains the journey of an ambitious task from idea to failure. The ambitious task was to index the data behind authenticated walls. A lot of useful discussions goes on in Slack and Discord servers. Most of the discussions are potential answers to beginners queries. Yet, when queries are typed in any search engine like Google or Bing, the discussions won't appear in the search results, as they are being authenticated walls. 

If you are someone interested in the idea of [making useful discussions open](https://rakaar.github.io/posts/2021-07-01-useful-discussions-open/), that is you don't like the idea of discussions behind authenticated walls and are planning to work on this problem, you can skip to `Lessons Learned` section to know the important things that you need to keep in mind.

The story is from my point of view. I apologise in advance for any biased text.

## Noticing the problem

When I was exploring Quantum Computing, I once had a simple specific query - "How to measure m qubits out of n qubits". I knew there was a small change needed to be made in `qc.measure()` function. But even after checking the documentation and googling for an hour, I still couldn't find the answer. So, at the end I had asked in Qiskit Slack, and a kind man by name [Jack Woehr](https://github.com/jwoehr) answered it. 

But then I thought - what if someone else in future had googled the same problem? Then [zher](https://stallman.org/articles/genderless-pronouns.html) wouldn't find the answer in search results, because the answer is behind an authenticated wall(Qiskit Slack Workspace in this case). So, to solve that I wrote [a blog](https://rakaar.github.io/posts/2021-02-12-measure-m-outof-n/) on my website, answering the problem.

Though I felt felt this was a serious problem, I didn't give much thought to it as I was interested in other fields at that time! 

## Opportunity to work on the problem 

After several months, I joined [Neera.ai](http://neera.ai/) as an intern. If you see the tag line of Neera Search Engine on the `<head>` of the site, it says "One search to rule them all". Neera's plan was to have a single search bar to search through the personal documents, along with websites that regular search engines provide. 

So, in the initial weeks, I and [Sahil](https://sahil-shubham.in/) worked on providing search in Pocket, Notion and Google Drive Documents at Neera. At neera, new third party tools were used to solve common problems to avoid re-inventing the wheel. For example [Supertokens](https://supertokens.io/) was used for authentication and [Supabase](https://supabase.io/) was used for Database Hosting. Both these tools had their own discord servers. Developers use to post their queries in relevant public channels and would get the reply within minutes.

I liked how fast people got response to their queries and how discord interface was convenient for exchanging information at a faster rate. But none of the discussions would appear as a search result on any search engine. This reminded me of the problem that I had noticed many months before. I felt that sooner all the queries related to such tools will be on discord. Slack workspaces and Discord servers were replacing Open forums like Reddit and Stackoverflow. So, when someone searches a query, zhe won't find it in the search results. They have to join the server and re-ask the question. 

I felt that this was a serious problem, I also wrote a blog about it on my site - [Useful discussions should be open](https://rakaar.github.io/posts/2021-07-01-useful-discussions-open/), where I had recommended that online communities should communicate on subreddits, as opposed to popular practice of using Discord Servers and Slack Workspaces. I argued in the blog that the useful discussions are too important to be behind Authenticated walls.

So, I proposed to [Harsh](https://hargup.substack.com/) and [Sahil](http://sahil-shubham.in/) that this was an important problem and something which we can solve. Both agreed to it, as we started working on Slack Integration first. Our plan was to enable Neera users to search through their Slack workspaces.

## Implementation and Struggles

For Pocket and Notion Integration with Neera, the process was simple. The user would connect Neera to the Service(Pocket/Notion) via [OAuth2](https://sahil-shubham.in/posts/oauth/). We would get the access tokens. Neera would make the API requests to the service via the access token of the user. This worked great, so our plan was to repeat the same with Slack. We started with Slack because it provided a Search API to search through workspace messages. We didn't have to index any workspace messages on our own. 

But unfortunately, slack doesn't provide the access to search endpoint, if user connects via OAuth2. The only other option available was to make a Slack App. Using OAuth2 the Slack app could be installed in the workspaces. Depending upon the workspace rules, any workspace member could install a App in the workspace or it would require permissions from Workspace owners.

We built the "Neera Search" Slack app with minimum scopes. The app could only read messages in Public channels, search messages in Public channels. No write access was given to the app. When the app is installed via OAuth2 in Useful workspaces, any Neera user will be able to search through the slack messages. We felt that it had liberated the knowledge in these workspaces by smashing the authentication walls.

But in one of the meetings, a question frightened us - what if some user adds zher private slack workspace unknowingly. Not all workspaces have a public invitation link. There are some workspaces, which are intended for private discussions. We didn't wanted such messages to be made publicly searchable. To prevent this, we decided that we would manually  install the app in the workspace by ourselves from a slack account, made by Neera. We will obviously be able to join Workspaces, whose invitation links are public. Hence, the risk of adding some private workspace messages being searchable is now zero. 

At the time of releasing the feature of Slack search, we added 2 open Slack workspaces - [Metakgp](https://metakgp.github.io/) workspace and [Kharagpur Winter of Code](http://kwoc.kossiitkgp.org/) Workspace. Our next aim was to include popular workspaces that are popular among developer communities. Some of my friends suggested CNCF Slack and Gopher Slack. These workspaces are too large. The number of people in both the workspaces individually is more than 40 thousand. In both the workspaces, there were many technical discussions going on. We were very excited at the idea that all these discussions could be made available easily just with one search in Neera.

Since the workspaces were large, there was a restriction on who could install the App. So, we posted a message in a public channel in both the workspaces explaining that installing the "Neera Search" Slack app in their workspace would make these discussions at any developer's finger tips via Neera. It will also spread awareness about the workspace, which will lead to more people joining the discussions happening in workspace.

But things started going an unexpected way!

## "This is all Private data!"

We got a strong "NO" from many of the members in both the workspaces. There were 2 common objections. First was that there was a policy that they don't install apps that they haven't coded themselves. With enough discussions, one could convince the admins to break this rule once for greater good, but the second objection was a strong one. The second objection was that *all these messages in the Slack are private, you can't index them.* We tried to convince the usefulness of our app, but their concern was that how could you index all these messages, it violates privacy. What could we say to that?

I was dumbfounded when I heard from people that it was Private data. The invitation link of the Slack workspace is Public(It was available on public websites). The messages we plan to make searchable are in Public channels. That means, literally anyone can read the messages. What is private here? The messages are just programmatically hidden behind authentication walls, but there is no password or secret that guards these messages. How can one call these messages private, when literally anyone on the internet has access to them. This question haunted me for a day. But before asking the question directly, I tried asked this first in Neera Workspace itself. I was desperate for the answer. So I put a message in slack, that goes this way...

![Pizza question](https://imgur.com/qr8eMuF.png)

Yes, I wanted to gift my favourite pizza if someone answered my question! Finally, [Harsh Gupta](https://hargup.substack.com/), gave a satisfactory answer. I have rephrased Harsh's answer and tried to put it in a direct way.

## Lessons Learned

To summarise it- *People regard a message as private, not on the basis of whether a secret(or password) guards the message, but on the basis of whom they intend to send the message. If the intended receiver is the any individual or simply the whole world, then its Public. If the intended receiver is only a particular community or a particular set of people, it is regarded as private*.

So people in a Slack workspace put a message with an intention that only members of the workspace will read it. They want to have the confidence that this message will only be read by members of a particular community. You can think of it as an unlisted YouTube video, anyone with the link can watch the video. But you don't want the video to be available on someone's search results. In short, you don't want any random person to discover it directly. Similarly in this case, the members of workspace didn't want any random user using Neera to come across their messages. 

It is the intended receiver that determines whether a message is private or not. Is it any random user or a member of a particular community. If former is the case, its public data, else you need to be cautious as people regard it as private data. Harsh gave a nice example explaining how having a secret doesn't determine whether its private or public data. 

> For example someone leaves their personal diary on the bench of a public park. There is no lock on the diary, and it is in a public space, it is okay for someone to read the diary? In many societies it will be considered a privacy violation because people are expected to not read other people’s diary without permission, irrespective of where they find it.

Harsh mentioned another point, which is worth considering about why people were opposing to index their slack workspace messages. (This can be thought of a consequence of the main point because nature of the message depends upon the intended receiver. But it is worth mentioning explicitly)

> People often talk about non coding stuff on these slacks. For example, people give their introductions, tell their stories about their journey or express opinion about something. And they are often not expecting them to be indexed and made searchable for everyone. If they knew they would probably behave differently. And communities don’t want to discourage people from expressing themselves, so they also don’t want indexing of such messages.

It was hard for me to face this [paradigm shift](http://people.tamu.edu/~v-buenger/658/Steven_Covey.html). Sometimes, I feel reluctant to throw away my old logic(private data is guarded by secrets), but I have realised that it is important to know ways of the world if you wish to change things.  

## Epilogue

What is the ultimate solution to it? Do all the useful discussions in modern era have to remain hidden behind authentication walls? Will in future open forums like Stackoverflow and Reddit be obsolete?

I don't know the answers. But I am not that pessimistic about the last question, as I am sounding. But I feel that this is a problem that needs to be addressed. All the questions about latest tools are not on Open forums. The answers don't appear when you search on a regular engine like Google or Bing. You have to join the Discord Server or Slack workspace, search for the question or ask on in a public channel. Opening communication tools, which bombard notifications in middle of work disturbs the [flow](https://en.wikipedia.org/wiki/Flow_(psychology)) of the developer. There will be a solution hopefully soon!

But I am happy about the fact that I could be part of an attempt to work on this problem. Cheers guys - [Sahil](https://sahil-shubham.in/)(The Smart and fast guy), [Himanshu](https://orkohunter.net/)(The wise experienced guy), [Harsh](https://hargup.substack.com/)(The Leader). We, all four worked together on this ambitious task. 

If you have any interesting thoughts about this problem, do let me know via email - `rka87338@gmail.com`. 

## Appendix

- I have written about the problem and how it affects Developer's flow here in the blog and how Neera could solve this problem - [Times and tools have changed, so should our ways to search](https://www.evernote.com/shard/s367/sh/6df0c177-74ea-dbea-8dd6-4bc5f2900f2c/3f88970f7646856965819779f7fc1fe3).
- I have also written about how searching in Slack and Discord via Neera can be useful for people starting out a new field - [If you are starting something new, search using Neera!](https://www.evernote.com/shard/s367/sh/e272462d-4207-4841-ca42-2f447886d499/be90a9ea0063953209368401255fbc54) 
- Did Harsh get the Pizza? No! I asked him his address and also asked what toppings he preferred([ref](https://imgur.com/i7CXQrB)). But he took it light([ref](https://imgur.com/z50aLv1))! 







