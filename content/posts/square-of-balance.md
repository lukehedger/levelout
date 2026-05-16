---
title: "Square of Balance"
description: "Balancing delivery speed and application stability for maximum reliability"
publishDate: "29 April 2026"
tags: ["delivery", "observability", "testing", "serverless", "reliability", "quality"]
---

The **Square of Balance** is a framework for building reliable software at scale. It helps teams balance rapid delivery speed with application stability.

There are four quadrants: Deliver, Test, Observe and Recover. Balance your engineering effort across each. If you can't catch a bug before release, catch it after. If you can't catch it at all, recover from it.

I developed the framework in 2021. The team I was leading at the time was struggling - delivery times were escalating, our end-to-end tests were flaky and we shipped disastrous big-bang deployments every three weeks. We were building a managed distributed system, but we weren't using the properties of a distributed system to our advantage. Everything needed to change.

![The four quadrants of the Square of Balance: Test, Observe, Recover, Deliver](/images/square-of-balance.png)

Bugs are inevitable. Once you accept this, you can approach software delivery and stability in a fresh way.

> Testing can be used very effectively to show the presence of bugs but never to show their absence.
>
> ~ [E.W. Dijkstra](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD303.html)

Even if we're not all willing to admit that bugs are inevitable, most of us agree that testing distributed systems - managed or otherwise - is difficult. So why do it?

Testing integrations between two or more components in a distributed system typically relies on deployed resources, synthetic traffic and complex assertions and test harnesses. These tests are expensive and maintaining a healthy return on investment over time is very difficult.

You are aiming for confidence to ship. Swap test coverage for delivery speed. Cover async paths with recovery and critical sync paths with observation.

Instead of an expensive, complex and flaky integration test, optimise the integration for recovery and observability.

---

The comprehensive guide to the Square of Balance can be found in Chapter 7 of [Serverless Development on AWS](https://level-out.com/book/) (O'Reilly, 2024).
