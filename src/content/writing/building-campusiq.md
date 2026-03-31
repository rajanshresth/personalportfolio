---
title: Building the dashboard nobody asked for (but everyone needed)
description: How I built an internal analytics platform at ING from scratch, and what the process taught me about the difference between useful tools and used tools.
publishedAt: 2026-02-20
tags: [Product, Data, Tooling]
featured: false
draft: false
---

The analytics dashboard I built at Innovative Nepal Group started as a spreadsheet. It always does.

Someone needed to track a number. The spreadsheet worked. Then someone else needed a slightly different number, so they made a copy. Then someone edited the copy and didn't tell anyone. By the time I joined, there were six versions of the "source of truth" and nobody agreed on which one was actually true.

This is not a unique problem. This is every company.

## The brief (such as it was)

There was no formal brief. The actual conversation was something like: "the spreadsheets are getting messy, can you do something with this?"

That's a discovery problem, not a build problem. My first instinct was to start building. My better instinct was to spend a week talking to the people who used the spreadsheets first.

## What I found in discovery

I spoke to five people. Each one used the data differently.

One person checked a single number every morning — a daily operations count. The rest of the dashboard was noise to them. Another person used the data weekly to prepare a management report and needed it formatted in a very specific way. A third person used it to troubleshoot anomalies and needed to be able to drill into details the summary views didn't show.

Same data. Three completely different jobs to be done. Any single dashboard would inevitably serve two of them worse than they deserved.

## The actual build

I ended up building three views on the same underlying data:

1. A daily digest — one number, one trend line, nothing else
2. A weekly summary — formatted for export, with the specific columns the report needed
3. An exploration view — filterable, drillable, for the person who needed to investigate anomalies

The underlying data came from a Google Sheet that was already being maintained. I didn't touch the data model. I just wrote Apps Script to read it and render the views.

The technical work was maybe 30% of the project. The other 70% was figuring out that three views were better than one.

## What I got wrong the first time

My first version had everything on one screen. Lots of options. Configurable filters. I was proud of it.

Nobody used the filters. People opened the dashboard, didn't immediately see the number they cared about, and went back to the spreadsheet.

Feature richness is not the same as usefulness. The version people actually used was the one I built after watching two people try to use the first one and fail.

## What this taught me about product work

A few things solidified for me during this project that I think apply well beyond internal tools.

**Discovery is not optional even for small projects.** I would have built the wrong thing if I'd started coding immediately. The conversations took a week. They saved more than a week of rebuilding.

**People use tools in the context of a job.** Not in the abstract. The daily digest worked because it fit into someone's existing morning routine. The weekly export worked because it mapped directly onto an existing report format. Design for the workflow, not the feature.

**The best interface is the one that gets out of the way.** The single-number daily view had almost nothing on it. Users loved it. The rich exploration view had everything. Users used it occasionally. There's a lesson there about restraint.

I'm still applying these lessons. They come up every time I think about what a product should do versus what it could do.
