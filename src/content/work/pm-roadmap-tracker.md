---
title: "PM Roadmap Tracker"
description: "A dark-themed single-page progress dashboard built with Google Apps Script Web App. Tracks PM skill milestones, learning resources, and transition goals in one place."
stage: "Shipped"
tags: ["Tooling", "Productivity"]
order: 2
featured: false
---

## Overview

The PM Roadmap Tracker is a personal dashboard I built to manage my own transition from Data Analyst to Product Manager. It lives as a Google Apps Script Web App — zero hosting cost, always available, synced with Google Sheets as the data backend.

The core insight behind building it: most "PM roadmap" content online is either a generic checklist or a paid course funnel. I wanted something opinionated and personalised — tracking not just what I'd learned, but what I'd applied and what evidence I had for each skill.

## Why I built it

When I started mapping my PM transition seriously, I had tabs open across Notion, a Google Sheet, Obsidian notes, and three bookmark folders. The context-switching was the biggest overhead.

The tracker collapses everything into a single view:

- **Skills matrix** — each PM competency rated by current proficiency, target proficiency, and evidence link
- **Resource log** — books, courses, and articles with completion status and key takeaways
- **Milestone board** — the high-level career goals with progress indicators
- **Weekly log** — a rolling record of what I shipped, read, or practised each week

## Technical choices

**Google Apps Script** was the right call for this use case:

- No deployment pipeline to maintain
- Sheets as the database means easy editing without a UI
- Runs on a personal Google account — no dependency on external services
- Dohtml/CSS/JS with the `HtmlService` API gives full control over the frontend

The dark theme was intentional — this is a tool I have open constantly. High-contrast light themes cause fatigue over long sessions.

## What I learned

Building tooling for yourself is the fastest way to understand user pain. Every friction point I hit while using the tracker became a product decision I had to reason through:

- When does filtering help vs. adding cognitive load?
- What's the right granularity for progress tracking?
- How do you design for motivation, not just information?

These are questions I now bring into every product decision I make.

## Source

The tracker is deployed as a private web app (personal use). The pattern — Apps Script + Sheets + dark-themed SPA — is replicable for small internal tools at companies that live in Google Workspace.
