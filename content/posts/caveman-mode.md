---
title: "Claude Code Tuning - Caveman Mode"
description: "A skill that strips filler from agent replies, cuts token usage ~75% and leaves the technical substance intact"
publishDate: "6 May 2026"
tags: ["ai"]
---

Every "Sure! I'd be happy to help you with that." is tokens you paid for and context you burned. Multiply by a session and the bill - in dollars and in context window - adds up fast. Caveman mode is a skill that fixes that.

## What it does

Caveman mode is a Claude Code skill that tells the agent to respond like a terse, smart caveman. Filler dies. Technical substance stays. Code blocks, error strings and exact names come through untouched.

Before:

> Sure! I'd be happy to take a look at that. The issue you're experiencing is likely caused by an off-by-one error in the token expiry check within the authentication middleware. Let me explain what's happening...

After:

> Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:

Same information. ~75% fewer tokens. Same diff at the end of the turn.

## How to trigger it

Grab the [SKILL.md](https://github.com/JuliusBrussee/caveman/blob/main/caveman/SKILL.md) from Julius Brussee's repo and drop it into `~/.claude/skills/caveman/`.

Once loaded, invoke it with any of these:

- `/caveman`
- "caveman mode"
- "talk like caveman"
- "be brief"
- "less tokens"

Turn off with "stop caveman" or "normal mode".

## What it actually strips

- Articles (a / an / the)
- Filler (just / really / basically / actually / simply)
- Pleasantries (sure / certainly / of course / happy to)
- Hedging ("it seems that", "you might want to consider")
- Long conjunctions replaced with arrows: `X -> Y`
- Common terms abbreviated: DB, auth, config, req, res, fn, impl

What it does *not* touch:

- Code blocks
- Error messages (quoted exact)
- Symbol names, file paths, flags
- Security warnings and destructive-action confirmations

That last exemption matters. When the agent is about to run `DROP TABLE users`, you want the full English warning, not a fragment. The skill drops caveman temporarily for irreversible actions, multi-step sequences where fragment order risks misread and when you ask it to clarify. Then resumes.

## When to reach for it

- Long sessions where context fills up faster than you'd like
- Debug loops with heavy back-and-forth
- Any task where the *output you care about* is a diff, a command or a fact - not the explanation around it

## When not to

- First pass on an unfamiliar codebase where the prose around the answer is doing teaching work
- Writing documentation, tickets, ADRs or PR descriptions - you want the full sentences there
- Pairing with a less experienced engineer who needs the framing

The skill's value is proportional to how much of the response you were already skimming past.

## Pair it with a context-aware status line

Caveman mode compresses output. A status line makes the compression visible. You can see context usage tick up slower, cost climb less steeply and the difference between a caveman turn and a normal one in real time.

Drop this into `~/.claude/statusline-command.sh`:

```bash
#!/bin/bash
input=$(cat)

model=$(echo "$input" | jq -r '.model.display_name | sub("^anthropic\\.claude-";"") | sub("-v[0-9]+$";"")')
effort=$(echo "$input" | jq -r '.effort.level // empty')
ctx=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
cost=$(echo "$input" | jq -r '.cost.total_cost_usd')
transcript=$(echo "$input" | jq -r '.transcript_path // empty')

cost_fmt=$(printf "%.2f" "$cost")

case "$effort" in
  low)    effort_color=$'\033[38;2;0;255;255m' ;;    # neon cyan
  medium) effort_color=$'\033[38;2;57;255;20m' ;;    # neon green
  high)   effort_color=$'\033[38;2;255;255;51m' ;;   # neon yellow
  xhigh)  effort_color=$'\033[38;2;255;102;0m' ;;    # neon orange
  max)    effort_color=$'\033[38;2;255;16;240m' ;;   # neon pink
  *)      effort_color=$'\033[35m' ;;                # fallback magenta
esac

caveman=""
if [ -n "$transcript" ] && [ -f "$transcript" ]; then
  act_line=$(grep -n -E '"(content|prompt)":"(<command-message>caveman|caveman on)' "$transcript" 2>/dev/null | tail -1 | cut -d: -f1)
  deact_line=$(grep -n -E '"(content|prompt)":"(stop caveman|normal mode|caveman off)"' "$transcript" 2>/dev/null | tail -1 | cut -d: -f1)
  if [ -n "$act_line" ] && { [ -z "$deact_line" ] || [ "$act_line" -gt "$deact_line" ]; }; then
    caveman="on"
  fi
fi

printf "\033[34m%s\033[0m" "$model"
if [ -n "$effort" ]; then
  printf " \033[2m|\033[0m %s%s\033[0m" "$effort_color" "$effort"
fi
printf " \033[2m|\033[0m \033[33m%s%%\033[0m \033[2m|\033[0m \033[32m\$%s\033[0m" "$ctx" "$cost_fmt"
if [ -n "$caveman" ]; then
  printf " \033[2m|\033[0m \033[38;2;255;102;0m\033[1mcaveman\033[0m"
fi
```

Make it executable:

```bash
chmod +x ~/.claude/statusline-command.sh
```

Then wire it up in `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash ~/.claude/statusline-command.sh"
  }
}
```

Restart Claude Code. You now have model, reasoning effort, context percentage, session cost and - when active - a caveman indicator at a glance:

```
Opus 4.7 (1M context) | max | 6% | $1.03 | caveman
```

The caveman segment watches the session transcript for activation (`/caveman`, "caveman on") and deactivation ("stop caveman", "normal mode", "caveman off") phrases, and only renders when the most recent one turned it on. No polling, no extra state file.

![Custom status line showing Opus 4.7, max effort, 6% context used, $1.03 session cost and the caveman indicator lit](/images/claude-code-status-line.png)

## Summary

Tokens are the currency of accuracy. The more of your window is spent on filler, the less is available for code, conventions and the actual problem. Caveman mode shrinks the per-turn cost. The status line turns context usage into something you feel in the moment, not a number you discover when `/context` starts warning.

Neither is a silver bullet. Together they shift your sessions from "hope the window holds" to "watch the window stay low while the work gets done". That shift compounds - more iterations per session, less auto-compaction, fewer lost threads.
