---
title: "Claude Code Tuning - Auto Mode"
description: "Retiring bypass-permissions in favour of auto mode, a short allow list and a three-entry ask list"
publishDate: "7 May 2026"
tags: ["ai"]
---

Auto mode is the first Claude Code permission model that actually matches how I work.

For months I ran every session with `--dangerously-skip-permissions` behind a long `ask` list. The bypass flag kept the cheap path fast; the `ask` list was the fence that stopped the agent pushing to main or running `rm -rf` without a human in the loop. It worked, but it was clumsy - twenty-one ask entries and a permission model that made me think about destructive commands instead of trusting a classifier to think about them for me.

Auto mode changes the division of labour. A soft classifier evaluates each action in context - not just the command, but what the session has done up to that point - and soft-denies the irreversible ones. The allow list is still a fast path. The ask list shrinks to the handful of actions I want to reserve for a hard human stop.

Here is what changed in `~/.claude/settings.json`.

## Default to auto mode

```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

Every session starts in auto mode. No `--mode` flag, no toggle, no forgetting.

## Keep the allow list

```json
"allow": [
  "Read", "Edit", "Write", "Glob", "Grep", "Bash",
  "WebFetch", "WebSearch", "Agent", "NotebookEdit",
  "Bash(gh pr checks:*)",
  "Bash(gh pr list:*)",
  "Bash(gh pr view:*)",
  "Bash(gh pr status:*)",
  "Bash(gh run view:*)",
  "Bash(gh run watch:*)",
  "Bash(gh issue view:*)",
  "Bash(gh issue create:*)",
  "Bash(sleep:*)"
]
```

Left unchanged. The allow list is a deterministic fast-path: anything on it short-circuits the classifier entirely. That saves latency and tokens on the cheapest, most common operations. The classifier is smart, but it is not free - and you do not want it making a judgement call on `Read` twelve times a minute.

## Prune the ask list

Before: twenty-one entries covering force-pushes, resets, stashes, `rm -rf`, `aws`, PR creation, issue mutation, `gh api`, `gh repo`.

After:

```json
"ask": [
  "Bash(sudo:*)",
  "Bash(gh pr merge:*)",
  "Bash(gh pr close:*)"
]
```

Three entries. The auto-mode classifier already soft-denies `git push --force`, `git reset --hard`, `rm -rf`, direct pushes to `main`, production deploys and the rest of the obvious irreversibles. Listing them on the ask list was redundant - the classifier was going to stop the agent anyway.

What is left is the three actions where I want a hard human stop *regardless* of classifier judgement. `sudo` because anything that wants root deserves a prompt. `gh pr merge` and `gh pr close` because a merged or closed PR is a public state change I want to sign off on personally, even when the classifier thinks it is routine.

The mental model shifts. The ask list is no longer "things that might be dangerous in context". It is "things I always want to review."

## Suppress auto-mode entry prompt

```json
"skipAutoPermissionPrompt": true
```

This suppresses the one-time confirmation when a session enters auto mode. Since every session now enters auto mode, the prompt would fire every time.

## Summary

The classifier does the heavy lifting. The allow list short-circuits the cheap stuff. The ask list holds the three irreversibles I want to see with my own eyes.

The whole thing is shorter, sharper and requires less of my attention to operate.
