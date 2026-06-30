---
title: Algorithmic Ad Portfolio Allocator
description: A budget allocation system that rebalances ad spend across campaigns and channels daily based on performance, the way a portfolio manager rebalances assets.
tags: [GTM, Python, Automation]
order: 2
---

## Overview

Most teams set a monthly ad budget split across channels and barely touch it until the next planning cycle. This system treats ad spend like a portfolio: every campaign is a position, performance data is the market signal, and budget gets reallocated daily toward what's working and away from what isn't.

## The problem

Performance data updates hourly; budget allocation usually updates monthly. That gap means underperforming campaigns keep burning spend for weeks after they've clearly stalled, while strong performers stay capped at their original budget instead of getting more fuel while they're working.

## What it does

- Pulls daily performance data (CPA, ROAS, conversion rate) from ad platforms via API
- Scores each campaign against a target efficiency metric and ranks them
- Reallocates a defined percentage of the total budget pool toward top performers and away from laggards, within guardrails (min/max spend per campaign, pacing limits)
- Logs every reallocation decision so the logic is auditable, not a black box

## Stack

Python handles the scoring and allocation logic — it's the part that needs real numerical work, not just moving data around. n8n orchestrates the daily pull-score-reallocate cycle and pushes budget changes back to the ad platforms via API, with the whole pipeline running in Docker so it's portable across client environments.

## Why it matters

Manual budget reviews happen weekly at best. This closes the loop daily, which means underperforming spend gets caught in days instead of weeks — the difference between a wasted few hundred dollars and a wasted few thousand.
