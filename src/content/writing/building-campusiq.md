---
title: "Building the dashboard nobody asked for (but everyone needed)"
description: "How I built an internal analytics platform at ING from scratch, and what the process taught me about the difference between useful tools and used tools."
publishedAt: 2026-01-10
tags: ["Product", "Data", "Tooling"]
featured: false
draft: false
---

Six months into building the ING Analytics Hub, I asked one of the college coordinators what she thought of the platform.

"It's fine," she said. "I still do the report manually first, then check if yours matches."

That sentence is worth unpacking. She was doing double the work — her old way and my new way — because she didn't fully trust that the new way was correct. The tool was running. The numbers were accurate. She was still not using it.

That's the problem with internal tooling: adoption isn't automatic just because the thing works.

## What I built and why

ING Group manages several colleges in Nepal. Before this project, operational reporting — enrollment figures, attendance rates, fee collection status — ran on independently maintained Excel files at each institution. Monthly board reports required a coordinator to spend half a day pulling, cleaning, and reconciling data from those files.

I'd been watching this process for over a year. The bottleneck was obvious. The solution seemed obvious. I built it.

Live dashboards in Looker Studio, connected to a centralised Google Sheets data warehouse that pulls nightly from each institution's source files via Apps Script. Automated report generation. Weekly digest emails for threshold alerts.

It worked. The numbers were right. People kept doing it the old way.

## The adoption problem is a trust problem

I'd made a classic error: I'd designed for the end state (reports being automated) without thinking carefully about the transition.

The coordinators who maintained the source files had been doing it for years. They'd built up an understanding of their data — where the quirks were, which fields were reliable, which months always had anomalies for specific reasons. My system absorbed that data and produced numbers that looked authoritative.

The problem: when a number in my system didn't match their mental model, they had no way to trace why. The system was a black box to them. And when you can't explain a discrepancy, you don't trust the system that produced it.

Two things fixed this:

**Transparency over elegance.** I rebuilt the data pipeline to be explicitly readable — every transformation step documented in comments, intermediate values visible in named sheets, not hidden in script logic. It became less clean. It became much more trustworthy.

**Showing the work.** The automated report now includes a "data sources" appendix showing exactly which sheets were pulled, when they were last updated, and any rows that were flagged as potentially anomalous. It's more verbose. It's also the section coordinators check first.

## Automate the pain, not the process

The second mistake was automating the wrong thing first.

I built the dashboards first because they were technically interesting and visually satisfying. The automated report came later. This was backwards.

The monthly board report was the most painful manual task. It was also the most visible to management, which made it the right place to demonstrate value. If I'd started there, I would have had buy-in from the first week. Instead, I spent months building dashboards that were academically useful but didn't change anyone's day.

The right order: automate the most painful task, even if it's not the most technically interesting one. Earn trust with that. Then expand.

## What this has in common with product work

Internal tools and external products fail in the same ways.

You can build something technically correct that nobody uses because the transition cost is too high. You can optimise for elegance when you should be optimising for trust. You can build what you think people need instead of removing the friction they actually feel.

The ING Analytics Hub works now. Board reports generate automatically. Management has same-week visibility into enrollment trends. Two institutions got early warnings about attendance drops before they became retention problems.

None of that happened because the technology was good. It happened because I eventually spent as much time on adoption as on engineering. That's a lesson I'll carry forward into any product work I do.
