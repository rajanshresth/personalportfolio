---
title: "n8n vs. Python: how I decide which one builds the automation"
description: n8n and Python aren't competitors — they solve different halves of most automation problems. Here's the rule I use to pick.
publishedAt: 2026-06-08
tags: [n8n, Python, Tooling]
featured: false
draft: false
---

I get asked some version of this constantly: "should this be built in n8n or in Python?" The honest answer is usually both, doing different jobs in the same system. But if I have to pick a starting point, I use one question: is this orchestration, or is this computation?

## Orchestration goes in n8n

If the job is mostly "when X happens, call API A, then API B, then format the result and send it to C," that's orchestration. n8n is built for exactly this. It handles triggers, scheduling, retries, and API auth across hundreds of services without writing boilerplate for each one. Building that glue code by hand in Python is just slower to ship and slower to change when a client wants the workflow tweaked.

The visual layer also matters more than engineers want to admit. When a client needs to see what a workflow does, or a non-technical stakeholder needs to approve a change, an n8n flow is legible in a way that a Python script in a repo isn't.

## Computation goes in Python

The moment a workflow needs real logic — scoring, optimization, statistical thresholds, anything where you'd actually write an algorithm and want to unit test it — that's a Python job. n8n's code nodes can technically hold Python or JavaScript snippets, but once the logic has more than a few branches, it belongs in a proper, testable, versioned service, not a text box inside a visual canvas.

This is also where Docker earns its place: a Python service with real dependencies (pandas, scikit-learn, a routing library) needs a reproducible environment. Wrapping it in a container means it runs the same on my machine, a client's VPS, or wherever it ends up.

## The pattern that comes up over and over

Almost every system I build ends up as: n8n on the outside handling triggers, scheduling, and API plumbing, calling into a small Python service for the part that needs actual logic, with the Python service running in Docker so it's portable. None of the three pieces is doing the other's job.

The mistake I see most often is trying to make one tool do everything — either forcing complex business logic into n8n's code nodes because "it's all already in n8n," or hand-rolling API orchestration in Python because "it's all already in Python." Both work until they don't. Pick the tool for the job, not the tool you already have open.
