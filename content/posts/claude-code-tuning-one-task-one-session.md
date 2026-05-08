---
title: "Claude Code Tuning - One Task, One Session"
description: "Long Claude Code sessions cost more than you think. Start a fresh one per task."
publishDate: "8 May 2026"
tags: ["ai"]
---

My Claude Code sessions used to run for hours. A ticket would start the session; by the time I was done I had handled the implementation, the failing CI, the review comments and half a dozen tangential fixes - all in the same conversation. It felt efficient. It was not.

## The cost model

Every turn feeds the full prior transcript back to the model. Prompt caching takes the sting out of that - most of it is a cache read rather than a fresh input - but cache reads are not free. On a long session, cache-read cost dwarfs everything else. You are paying to rehydrate context you stopped needing a hundred turns ago.

Session length is a cost multiplier, and the multiplier compounds.

## Worktrees don't save you

It is tempting to reach for git worktrees as isolation. One worktree per ticket, one per feature, one per experiment. Worktrees are great for the filesystem - they are not doing anything for conversation cost. If you enter a worktree from inside a long-running parent session, every worktree operation still rides on top of the same giant transcript. The filesystem is isolated; the context is not.

## The rule

One task, one session.

When you finish a task - a ticket, a PR, a bug fix - `/clear` before you start the next one. Or exit and start a fresh `claude`. Treat a session as the unit of work it was scoped for, not as a shared workspace you live in all day.

## When you want to stay in a session

Sometimes you genuinely need a long-running parent - an orchestrator, a research dive, a multi-step design. That is what subagents are for. Spawn an `Agent` for the work; it runs with its own context budget and only the summary comes back. The parent stays small, the child does the work and exits.

The pattern: the parent coordinates, the subagents execute. The parent's transcript stays tight because it never sees the child's internal steps.

## Summary

- One task, one session
- `/clear` between tasks
- Use subagents for work inside a long-running parent
- Worktrees isolate the filesystem, not the conversation

The cheapest turn is the one that does not have to re-read a long backlog.
