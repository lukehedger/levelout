---
title: "Minimal Copilot CLI Setup"
description: "Reuse your CLAUDE.md, keep MCP and skills sparse, default to autopilot with destructive actions locked down - and know where autopilot overreaches."
publishDate: "16 May 2026"
tags: ["ai"]
---

A minimal Copilot CLI setup for engineers coming from Claude Code. Same `CLAUDE.md`, sparse tooling, autopilot by default with `sudo` and `rm` denied.

## Keep using the same CLAUDE.md

Copilot CLI reads `CLAUDE.md` out of the box. Same project file, same repo root, same conventions. Do not rewrite it, do not fork it, do not maintain two.

## Keep MCP, plugins and skills to a minimum

Before you add anything, check what the session is already loading:

```
/env
```

That prints the active model, the MCP servers, the skills, the plugins and the tool surface for the current session. You will usually find Copilot has loaded more than you expected and less than you remembered configuring. Read it before you add anything.

The rule: **layer in tooling when a task demands it, not before**. If you have not opened a Linear ticket in two weeks, the Linear MCP server should not be loaded - it is sitting in the tool list burning context on every turn and giving the planner more shapes to consider. Every MCP server, every skill, every plugin is a tax on every turn whether you use it or not.

The good default is: built-in tools only, no MCP, no skills, no plugins. Add the first MCP server the day you actually need it. Remove it the week after the task is done.

## Default to autopilot, lock down the destructive commands

Copilot CLI's `autopilot` is its equivalent of Claude Code's auto mode - the agent runs without prompting on each action, with a classifier soft-denying the irreversible ones. It is the right default for the same reasons auto mode is the right default in Claude Code: most actions are reversible, the prompt-on-everything model wastes attention and the classifier is good enough to catch the things that matter.

But I want a hard human stop on the two commands that no classifier should be trusted with: anything that wants root and anything that recursively deletes. So I wrap the binary in a zsh alias that boots Copilot in autopilot with an explicit deny list:

```zsh
alias co="copilot --autopilot --allow-all --deny-tool 'shell(rm)' --deny-tool 'shell(sudo)'"
```

## Make assumptions work for you

Copilot's autopilot is *more eager* than Claude Code's auto mode. Where Claude Code will often pause and ask "I am about to make a design decision here - should this be unlimited or capped?", Copilot will pick one, tell you it picked one and keep going.

It surfaces these as "assumptions" in the final summary. Useful - except by the time you read the summary, the assumption is already in the diff. If you do not like it, you are reverting code rather than answering a question.

The fix is not to turn autopilot off. The fix is to **be explicit about your stop points up front**. At the start of the task, in the same message that scopes the work, name the decisions you want the agent to bring back to you:

> Before you start: do not pick the database, do not decide the auth strategy, do not invent any rate limit numbers. Ask me on all three. Everything else is yours.

With those constraints in place, the eagerness becomes a feature. The agent rips through the unambiguous work, stops at the named decisions and the summary only contains assumptions on things you genuinely wanted to delegate.

Without those constraints, expect to read the assumptions list at the end and find at least one you would have answered differently.

## Summary

- Same `CLAUDE.md`, no fork.
- `/env` first, MCP and skills only when a task demands them.
- `co` alias: autopilot on, `sudo` and `rm` denied.
- Name your stop points up front - autopilot will not guess them for you.
