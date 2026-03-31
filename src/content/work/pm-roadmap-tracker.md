---
title: PM Roadmap Tracker
description: Dark-themed SPA dashboard tracking a 6-month PM transition — live progress, tabbed navigation, backed by Google Sheets.
tags: [GAS, Tooling, Product]
order: 1
---

## Overview

A single-page dashboard I built to hold myself accountable through a structured 6-month transition from Industrial Engineering into Product Management.

The app sits in Google Apps Script and reads directly from a Google Sheets backend. Every learning milestone, resource completed, and project shipped is tracked in the spreadsheet — the dashboard just makes it visual.

## Why I built this

Most PM transition resources are generic. I wanted something that reflected my specific path: an IE background, a data analysis day job, and no PM internship to point to.

The tracker forced me to break "become a PM" into discrete, measurable milestones. Once it was in a spreadsheet, I could query it, chart it, and surface it in a dashboard — which is also a good signal that you understand data-backed product thinking.

## What it does

- Live progress bars per topic area (product strategy, user research, metrics, PRD writing, SQL)
- Tabbed navigation between monthly phases without page reloads
- Resource list with completion status — books, courses, case studies
- Auto-updating: editing the Google Sheet updates the dashboard in real time

## Stack

Built entirely inside Google Apps Script with vanilla HTML, CSS, and JavaScript served via `HtmlService`. The backend is a Google Sheet with named ranges that the GAS server reads on each request.

No external dependencies. No build step. Runs anywhere with a Google account.

## What I learned

Building this reinforced something I didn't expect: the product decisions — what to show, in what order, what to omit — were harder than the engineering. A tracker that shows everything is useless. Deciding what mattered, and what to cut, was the actual product work.
