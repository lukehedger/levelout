---
title: "Working with Agents"
description: "Durable engineering skills for getting the best out of AI coding agents"
publishDate: "2 May 2026"
tags: ["ai"]
---

The rules will change next week. Then they'll change again. Working with coding agents is a moving target - harnesses improve, models get smarter, new primitives land and workflows that felt brilliant a month ago feel clumsy today.

So rather than chase the weekly novelty, focus on what's durable: the software engineering skills that prove invaluable when working alongside agents, and the one AI-specific discipline that isn't going anywhere - context.

## Context is the constant

The harness, the skills, the slash commands, the memory files - everything orbits a single question: what does the agent know when you ask it to do something? Models change. Tooling changes. Context management is the discipline that persists.

> If you do nothing else, start here. Create a `CLAUDE.md` and write down the five things a new engineer gets wrong in their first week. Import conventions. Naming patterns. Testing expectations. Architectural boundaries. One page is enough. That file alone will change what your agent produces.

— [Stack72](https://stack72.dev/agent-trust-is-a-system-design-problem/)

Everything beyond the `CLAUDE.md` - custom skills, subagent definitions, permission allowlists, project memory - is the same problem at higher resolution: making the right context available at the right moment, without drowning the agent in noise.

## Essential software engineering skills

The engineers getting the most out of agents aren't the ones writing the cleverest prompts. They're the ones who were already good at:

- **Breaking down systems** into components with clear interfaces
- **Breaking down work** into coherent, bounded tasks
- **Describing problems** precisely enough to be acted on
- **Setting direction and constraints** so solutions land in the right space

None of these are new. All of them matter more now. An agent is a very fast, very literal collaborator - so vague intent produces fast, literal slop. Sharpen the framing and you sharpen the output.

## Stay near your comprehension boundary

It's fine to let an agent push you slightly past what you already know. You might not be fluent in TypeScript generics, but if the agent proposes them as the right tool for the job, great - learn on the job.

Don't let it drag you far past your boundary. Once you can't critique what you're seeing, you can't verify it and you'll lose track of the implementation. Small extensions compound into systems you can't reason about.

A good heuristic: if you can't describe in one sentence why the solution is correct, you've gone too far.

## Know when you know what you're asking for

There are two very different conversations:

1. "I know exactly what I want - build this."
2. "I don't know what I want yet - help me figure it out."

Each needs a different posture, and they don't mix well. Start each conversation with a clear answer to which one it is. Exploration can feed into execution, but do them as distinct steps, not in a single jumbled prompt.

## Write, simplify, review

Slop is fine as a first draft. The trick is iterating toward the best solution rather than shipping the first plausible one.

A useful loop:

1. **Write** - let the agent produce a first pass.
2. **Simplify** - run a [simplify](https://claude.com/plugins/code-simplifier) pass to cut unnecessary abstraction, dead branches and over-engineered types.
3. **Review** - run a [review](https://claude.com/plugins/code-review) pass for correctness, quality and fit with the surrounding code.

Separating these roles gives you three independent critiques instead of one self-confirming draft.

## Use tickets to protect your flow

An underrated move: liberal use of tickets. "Work on this ticket." "Create a ticket to do this later." "Create a ticket and assign it to a subagent."

When you uncover a related-but-separate task mid-flow, don't derail - capture it as a ticket and keep going. A solid Jira (or equivalent) skill is indispensable here, because the friction of writing a good ticket is what normally stops people doing this.

## Custom agents earn their keep

Generic agents are a fine default. But for recurring specialised work, custom agents pay back their setup cost quickly:

- Threat modelling (STRIDE walkthroughs on a design)
- BDD scenario authoring for new features
- Tool and framework migrations
- AWS debugging (CloudWatch log diving, metric interpretation)

These are tasks where you want a fixed posture, a known toolbelt and a specific reporting style - exactly what a subagent definition gives you.

## Security

Agents accelerate the production of code, which also accelerates the production of vulnerabilities if you let them. Bake security expectations into your context - conventions for handling secrets, input validation, authz boundaries - and use a dedicated review pass for anything touching a trust boundary.

## Coordinate the isolated work

When several agents work on separate pieces in parallel, their outputs expose gaps in the design you didn't notice yourself. Two subagents building adjacent components will surface interface mismatches, unclear ownership and assumptions that aren't actually shared.

Use this. Treat the coordination step as a design audit, not a chore. The gaps the agents expose are the gaps your humans would have hit later, more expensively.

## Tuning

A few things that aren't optional once you're serious:

- **Max effort, always.** Use the most capable model you have access to. Cheaper models often burn more tokens getting to a worse answer.
- **`caffeinate`** your machine so long sessions don't stall while the agent is working through something chunky.
- **Permission allowlists** sensibly scoped. The right set removes most of the prompt friction without giving up oversight on the risky actions.

## Track context usage

Always keep track of the session's context usage. Context management is your most powerful tool for tuning the accuracy and quality of the agent.

Use a [custom status line](https://gist.github.com/lukehedger/506b5f95f417dc9920063b548e28e449) to clearly display the context consumed in the current session.

![Custom status line showing Opus 4.7 model, 7% context used and bypass permissions mode](/images/claude-code-status-line.png)

For a detailed breakdown, run the `/context` command - it shows exactly what's consuming the window (system prompt, tools, memory, messages) so you know what to trim when it matters.

## Practical exercises

To put this into practice, pick one of these:

- **Blue-sky backlog spike.** Pick something you'd never normally have time for - a prototype for an idea you've been sitting on, a refactor of that module nobody wants to touch, a spike on a tool or library you've been curious about - and hand it to an agent with clear constraints.
- **A kata.** Pick a small, well-defined problem and do it three ways: solo, with an agent, with an agent plus simplify/review. Compare the diffs.
- **Production metrics analysis.** Give the agent a CloudWatch dump and ask for Lambda right-sizing recommendations. The quality of its suggestions is a good read on how well you scoped the context.

## Challenges

A few open questions worth sitting with:

- **What does the agent keep getting wrong?** Notice the pattern and work out how to solve it. Usually it's a context gap, a convention gap or a skill gap - all three are fixable.
- **How can you support context management by making context more visible?** If you can't see what the agent is working from, you can't tune it.
- **What Claude Code usage metrics would be interesting?** Which commands run most? Which fail? Which sessions stall? The shape of your usage tells you where to invest next.

---

## Glossary

Common terms you may encounter when working with AI coding assistants and reading more about the topics raised in these guidelines:

- **Agent** - An LLM paired with a harness that orchestrates tool use, observation and iteration to accomplish a task autonomously.
- **Context** - The information (conversation history, files, instructions) available to an LLM when generating a response, bounded by its context window.
- **Context window** - The maximum number of tokens an LLM can process in a single conversation, covering both input and output.
- **LLM (Large Language Model)** - A neural network trained on large amounts of text that predicts the next token, enabling it to generate human-like text responses.
- **Prompt** - The full set of instructions, context and user input sent to an LLM that shapes its response.
- **Reasoning** - The internal chain-of-thought process an LLM uses to work through a problem before producing its final output.
- **Token** - The smallest unit of text an LLM processes, roughly 3/4 of a word in English (e.g. "unhappiness" might be split into "un", "happi", "ness").
