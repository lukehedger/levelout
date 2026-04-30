---
title: "Agentic Engineering Workflows"
description: "The workflows I reach for every day when engineering with AI coding agents"
publishDate: "30 April 2026"
tags: ["ai"]
---

Agentic engineering is no longer experimental for me. It has changed how I plan, review, ship and learn. But using an agent well is a craft. Pointing it at "a feature" and taking what comes back is how you end up with slop - code that compiles, looks plausible and silently drifts from the patterns your team has spent years building.

The difference between frustration and flow comes down to workflows. The prompt is the smallest, least interesting part. What matters is the loop around it: what context the agent starts with, what it can execute, how you catch its mistakes and how you compose its output with other agents and with your own judgement.

These are the workflows I reach for every day, grouped by the kind of work they do. Start with the prerequisites at the bottom - nothing above them works without the foundation below.

## Development

**Teams and worktrees.** Multi-agent work breaks down the moment two agents fight over the same working tree. Git worktrees are the fix: each agent gets its own checkout on its own branch, and they can run in parallel without stepping on each other. "Teams" is the next layer up - one agent implements, another reviews, another writes tests. I reach for this whenever a task fans out naturally: a refactor across thirty call sites, a feature that spans three services, a migration that needs per-file attention. The orchestration overhead is real, so don't reach for it on anything a single agent can handle in one pass.

**GitHub reviews.** The agent is the reviewer who always shows up. I pipe `gh pr view` and the diff into a review-focused prompt and get back style drift, missed tests, shaky error handling and the occasional real bug. It doesn't replace human review - it clears the path for human reviewers to spend their attention on the judgement calls. The trap is accepting its comments uncritically; the agent will confidently flag things that are correct. Treat its output as a first pass, not a verdict.

**Local reviews.** Before I push, I diff against `main` and hand it to a harsh-reviewer prompt. This is much cheaper than finding issues in CI, and cheaper still than finding them in a human review cycle. Focus the review on missing tests, unclear naming, dead code and broken invariants. The best local review is the one you actually run, so lower the friction until running it is automatic.

**Tool runner and debug loop.** The classic agentic loop: run the command, parse the failure, make the fix, re-run. This is where agents genuinely shine - the boring, iterative, mechanical part of debugging is exactly the work they are best at. The three essential ingredients: a command that exits non-zero on failure, output the agent can interpret and the permissions pre-granted so it doesn't stall asking. When all three line up, you can hand over a red test suite and come back to it green.

**Task files instead of prompts.** Stop typing long ad-hoc prompts into the chat. Write a task file - a markdown doc with what needs to be done, the constraints, acceptance criteria, links to the relevant code and the test strategy - then point the agent at it. Task files are reproducible, reviewable, shareable and they survive the end of a session. They are also easier to edit than a prompt, which means you iterate on the specification rather than the conversation. This is the single highest-leverage habit I have picked up since starting to work with agents seriously.

**Staying focused.** Agent sessions surface divergent tasks constantly: a bug you spot in passing, a refactor that would help but isn't the point, a design question that deserves its own consideration. The worst move is to chase them - you end up with three half-finished threads and no clean diff. Capture them fast and keep going. For concrete follow-up work, fire the `/jira` skill and write a ticket in ten seconds. For design-shaped work, ask Claude to write a plan, commit the plan file and come back to it later. Either way, the current session stays coherent and the divergent thread does not get lost.

## Design

**Plans.** Before code, alignment. Plan mode is where I live when starting non-trivial work. The agent proposes an approach; I push back, narrow scope, challenge assumptions, surface the decisions I want to own. The sharper variant is to have the agent interview me first - ask clarifying questions about constraints, edge cases and priorities before proposing anything. This pulls requirements out of my head before the agent commits to a direction and avoids the failure mode where a plan looks reasonable but answers the wrong question. Once the plan is tight, implementation is mostly mechanical - the agent can execute it and I can review the diff. Skipping the plan is the most common way I see agent sessions go sideways.

**Ticket creation via the Jira skill.** Good tickets are surprisingly hard. A Jira skill turns rough context - "we need to handle the case where the webhook retries on a stale cursor" - into a ticket with a summary, acceptance criteria, test notes and the right labels. It does the 80% of the work that is mostly transcription so I can spend my attention on the 20% that needs judgement. The skill enforces the house style so every ticket reads the same way, which pays off most in the code review three months later when someone is trying to reconstruct why the change happened.

**ADRs via the ADR skill.** Architecture Decision Records are high-leverage artifacts nobody writes because they feel like homework. An ADR skill makes it painless: summarise the decision, the alternatives you considered, the tradeoffs, the outcome. Future-you, onboarding a new hire or the engineer trying to revisit the decision two years later, all thank you. This is one of the clearest wins from agentic workflows - work we all agree is valuable and all reliably skip, now costs nothing.

**Architecture review and consensus.** Spawn multiple agents with different personas against the same design: a security reviewer, a cost reviewer, a reliability reviewer, a maintainer. Each produces its critique independently. Then synthesise the consensus - where do they agree? Where do they disagree? The disagreements are where the interesting design conversations live. This is the workflow that has most changed how I approach system design; a single reviewer has a single blind spot, but a panel with divergent priorities flushes out tradeoffs I would have missed.

## Security

**Threat model agent.** A STRIDE-based threat modelling subagent, handed the design or the existing service, returns a categorised list of threats and proposed mitigations. It is dispiritingly effective. It finds things I miss - often because I have been staring at the system for too long and my threat imagination has collapsed into the threats I already know about. Run it early on new designs, run it again after any change to authentication, data flows or trust boundaries. Treat the output as a starting point for conversation, not a checklist to tick through.

## Experimental - use with caution, not on production workloads

**Screenshots and image pasting.** Paste a screenshot of a bug, a design mock, a dashboard, a whiteboard photo. It works better than I expected. Pasting a screenshot of an error is often faster than describing the error in words, and the agent can often read stack traces, UI state and log dashboards directly from the image. The pitfall is that vision is still inconsistent - verify anything the agent reads off an image before acting on it.

**Trace and log analysis and correlation.** Dump a distributed trace and the corresponding logs into the agent and ask it to correlate events. I have had agents identify the specific span that triggered a cascade, across multiple services, in minutes - work that would have taken me an afternoon of scrolling. This is early. Validate carefully, especially for timing-sensitive reasoning. But the direction is obvious, and as context windows grow this becomes one of the most compelling uses.

**Factory.** Fleets of agents doing parallel work under a coordinator. I am not running this on production workloads and I don't recommend anyone else does either, but experimenting with fleet patterns - swarms of reviewers, specialised subagents, coordinator-worker topologies - tells you where the workflows are heading. The coordination problems are genuinely hard, and the economics of running large fleets are still a moving target.

**Onboarding and interactive workshops.** Use an agent to walk you through building something you don't yet understand. "Teach me event sourcing by building a small engine with me, step by step, explaining each decision." The agent plays tutor; you end up with a working artifact and real understanding. This is the most surprisingly good use I have found. It works especially well for concepts where reading the theory doesn't stick until you build it - CRDTs, consensus algorithms, DAGs, LSM trees.

## Essential prerequisites for all workflows

None of the above works without the foundation underneath it.

**Documentation.** The agent is only as good as the context you hand it. Invest in a `CLAUDE.md`, a codebase overview, how-to guides, a test strategy document. The agent reads what a new hire would read - make sure that exists and is current. A codebase without documentation forces the agent to guess, and its guesses regress to whatever is most common in its training data rather than whatever is right for your system.

**Verification.** Tests, types, formatters - the loops the agent can close by itself. If your tests are flaky, the agent flails. If your type system is loose, mistakes slip through. Verification is how the agent knows it is done. Without it, you are the verification, which means you are the bottleneck on every task the agent touches.

**Established patterns.** The agent pattern-matches on what is already there. If every file in the repo structures errors differently, the agent will keep inventing new ways too. The more consistent your codebase, the less steering the agent needs.

**Agent configuration.** `CLAUDE.md`, skills, subagent definitions, hooks, rules. This is where you encode the expertise of your team so the agent doesn't have to guess. It is also where you enforce the boundaries - which commands are allowed to run, which directories are off-limits, which steps must always happen before a commit. Treat this configuration as code: review it, version it, evolve it.

**Lockdown permissions.** Never auto-allow git or AWS commands. Always read the command before explicitly approving it. A single `git push --force` or `aws s3 rm --recursive` agreed to absently is the kind of mistake you do not recover from. The small friction of reviewing each destructive command is a feature, not a bug - it is the human-in-the-loop that keeps the loop safe.

---

These workflows are not a menu to adopt all at once. Pick one - task files, or plans or the tool runner loop - and build the habit until it is automatic. Then add the next one. The compounding returns come from stacking workflows on top of solid prerequisites; neither half is useful without the other.
