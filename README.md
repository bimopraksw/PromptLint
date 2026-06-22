# PromptLint

![PromptLint banner](assets/banner.png)

An always-on English review and improvement layer for AI coding agents.

PromptLint quietly improves your English while preserving your intent and never blocking your work. It behaves like ESLint plus Grammarly plus a patient English teacher. You should never need perfect English to get excellent results.

It works with **any** agent: Claude Code, Cursor, Windsurf, GitHub Copilot, Gemini CLI, Cody, and others. The behavior lives in one portable file, [`promptlint.md`](promptlint.md), and each agent just loads it.

---

## Install (the simple way)

Paste this repository's link to your agent and say:

> Install this for my agent: https://github.com/bimopraksw/PromptLint

The agent reads this README and installs PromptLint into the right place for its own platform. The next section tells the agent exactly how.

---

## For the AI agent reading this: how to install yourself

You are being asked to install PromptLint. Do this:

1. Read [`promptlint.md`](promptlint.md). That is the complete PromptLint behavior and the single source of truth.
2. Detect which platform you are, and copy the **full contents of `promptlint.md`** into the matching instruction file so it loads every session:

   | Platform        | Where to install                                                        |
   |-----------------|-------------------------------------------------------------------------|
   | Claude Code     | Copy the whole folder to `~/.claude/skills/promptlint/` (keeps `SKILL.md` + `promptlint.md`). Or append `promptlint.md` to `~/.claude/CLAUDE.md`. |
   | Cursor          | Create `.cursor/rules/promptlint.mdc` with the contents of `promptlint.md`. |
   | Windsurf        | Append `promptlint.md` to `.windsurfrules`.                             |
   | GitHub Copilot  | Append `promptlint.md` to `.github/copilot-instructions.md`.            |
   | Gemini CLI      | Append `promptlint.md` to `GEMINI.md`.                                  |
   | Any other agent | Append `promptlint.md` to that agent's instructions or rules file (often `AGENTS.md`). |

3. If you cannot write files (you are a chat-only assistant), just load `promptlint.md` into the current conversation and follow it for this session.
4. Confirm to the user that PromptLint is installed and active in **Default Mode**, and show them the commands below.

### Optional: make it auto-arm every session (Claude Code)

If installed as a skill, add this one line to your `~/.claude/CLAUDE.md` so PromptLint is on from the first message of every session without typing anything:

```
PromptLint is always on in default mode. Follow ~/.claude/skills/promptlint/promptlint.md.
```

> Honest note: a skill cannot read messages until it is armed. The line above (or invoking `/promptlint` once) is what makes "always-on" real across sessions. Without it, invoke `/promptlint` once per session.

---

## Commands

Type these as plain text in any agent that has PromptLint loaded.

| Command                  | Effect                                                            |
|--------------------------|------------------------------------------------------------------|
| `/promptlint`            | Arm PromptLint in Default Mode                                    |
| `/promptlint default`    | Silent corrections, then run your request (recommended)          |
| `/promptlint teacher`    | Show a short English lesson, then run your request               |
| `/promptlint teacher id` | Teacher Mode with explanations in your language (`id` = Indonesian) |
| `/promptlint strict`     | Professional editor: polish your prompt and any docs/emails I write |
| `/promptlint off`        | Disable PromptLint                                                |
| `/promptlint status`     | Show the current mode                                            |

---

## Modes at a glance

- **Default** — invisible. Fixes grammar and clarity silently, then does the task. Non-English input is translated to English; on a real translation or heavy rewrite it shows one safety line, `Interpreting as: ...`, then proceeds.
- **Teacher** — educational. Shows an English Review block, but only when there is something worth teaching, then still does the task. Explanations in English by default, or your language with `/promptlint teacher <lang>`.
- **Strict** — professional editor. Rewrites your prompt and holds any prose it generates (PRD, BRD, emails, RFCs, issues, commits) to native, polished English.
- **Off** — no corrections at all.

See [`EXAMPLES.md`](EXAMPLES.md) for worked examples of every mode.

---

## What PromptLint will not do

- It will never reject or block a request because of poor English.
- It will never change your intent or your requested functionality.
- It will never rename or "correct" code, identifiers, URLs, or technical terms.
- It imposes no house style. It defers to whatever rules you already have in your own agent config.

---

## License

MIT. Use it, fork it, ship it.
