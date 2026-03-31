---
title: "Why every PM needs to think like a data analyst"
description: "Product decisions made on intuition alone have a shelf life. Here's how a background in data analysis changes the way I approach product problems — and why I think it's an underrated edge."
publishedAt: 2026-03-15
tags: ["Product", "Data", "Career"]
featured: true
draft: false
---

There's a version of the "data-driven PM" conversation that goes like this: install a dashboard, look at numbers before making decisions, done. That version is missing the point.

The real advantage isn't access to data. Almost every product team has dashboards. The advantage is *knowing what to measure*, *knowing when a metric is lying to you*, and *knowing how to turn a messy dataset into a clear question*.

That's what spending time as a data analyst teaches you that reading about analytics never will.

## The metric trap

Early in my time at ING, I was building a report on student attendance trends. The headline number looked fine — overall attendance was up 4% year-on-year. Management was pleased.

Then I segmented it. Attendance for students in their final year was up significantly. Attendance for first-year students — the cohort that would define retention three years out — was down 9%.

The aggregate metric was technically correct. It was also completely misleading about what was actually happening.

PMs fall into this trap constantly. A user onboarding funnel with good overall completion rates can be hiding a segment that churns at 80%. A feature with positive NPS responses can be dragging down power-user satisfaction. The number you put on the dashboard is a choice, and that choice shapes what gets attention.

Analysts develop a reflex for this. Before trusting a number, you ask: *what would this look like if I broke it down by segment? By time period? By cohort?* The instinct to disaggregate data before presenting it is one of the most transferable skills from analysis to product.

## Instrumentation is a product decision

Most PMs treat analytics as something that happens after you ship — you build the feature, then you ask the data team to add tracking. This backwards workflow creates months of blind spots.

When you've had to build the tracking yourself (or work closely with someone who did), you understand that instrumentation is a design decision made at the same time as the feature. What events do you log? What properties do you attach? How do you distinguish a meaningful signal from noise?

Getting this right at the start is much cheaper than retrofitting it. And the discipline of thinking through your instrumentation before shipping forces you to be precise about what success looks like. If you can't define what event you'd look for in the logs to confirm your hypothesis, your hypothesis isn't specific enough.

## The PRD that nobody questions

I've noticed that the quality of questions a PRD attracts is often a function of how clearly it handles data. A doc that says "we expect increased engagement" gets nodded through. A doc that says "we expect to see a 15% increase in the share of weekly active users completing at least three core actions, measured against the same cohort after 30 days" invites productive pushback.

The specificity isn't pedantry. It's a forcing function that surfaces disagreements early — about what "engagement" means, about whether 15% is realistic, about what we'd do if it came in at 8%.

Being precise about metrics in PRDs is a habit that comes naturally if you've spent time building dashboards and having your numbers challenged. It's less natural if your background is entirely in strategy or design.

## When to ignore the data

The other thing that time in analysis teaches you: data is a record of what has already happened. It can tell you that users are dropping off at a particular screen. It cannot tell you why, and it cannot tell you what they'd do differently if you changed it.

Knowing when to lean on qualitative research — user interviews, support tickets, session recordings — instead of (or alongside) quantitative data is a genuine skill. And knowing when the data is simply too thin to draw conclusions from, and you need to run an experiment or make a judgment call, is equally important.

I've seen teams paralysed because the numbers were ambiguous. The analyst instinct to "get more data" is sometimes the right call. In product, sometimes the right call is to ship, learn, and iterate.

The difference between those two situations is something you develop a feel for over time. Getting that feel earlier is the real reason I think every PM benefits from spending time in data.
