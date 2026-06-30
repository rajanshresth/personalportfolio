---
title: Dynamic Capacity-Based Pricing Engine
description: A pricing engine for B2B digital agencies that adjusts rates in real time based on team capacity, utilization, and demand instead of a static rate card.
tags: [RevOps, Python, Docker, Pricing]
order: 1
---

## Overview

Most agencies price services off a rate card that never changes — the same hourly rate whether the team is slammed or sitting idle. This engine replaces that with a pricing model that moves with actual capacity: when utilization is high, quoted rates rise; when there's open capacity, rates flex down to win the next deal instead of leaving a team bench idle.

## The problem

Agencies leave money on the table in both directions. They underprice when they're at full capacity and should be charging a premium for the next slot, and they overprice when they have idle capacity and lose winnable deals to competitors. Both failures come from the same root cause: pricing decisions are disconnected from real-time capacity data.

## What it does

- Pulls live utilization data from project management and time-tracking tools (capacity by role, by week)
- Calculates a capacity index per service line and feeds it into a pricing function alongside historicwin-rate data
- Outputs a recommended rate range for new quotes, refreshed daily
- Flags when a quote falls outside the recommended range before it goes out, so sales doesn't discount blind

## Stack

Python service for the pricing model and capacity calculations, containerized with Docker for consistent deployment. n8n handles the data pulls from PM/time-tracking tools and pushes the computed rate ranges into the CRM via webhook, so reps see the number where they already work instead of a separate dashboard.

## Why it matters

This turns pricing from a once-a-year rate-card exercise into a live input on every quote — the same logic airlines and hotels use for yield management, applied to service delivery capacity instead of seats or rooms.
