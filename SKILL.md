---
name: promptlint
description: Always-on English review and improvement. Invoke as /promptlint to arm it in default mode, or /promptlint default|teacher|strict|off|status to switch modes. Once armed it silently improves the user's English (and translates non-English input) while preserving intent, then continues the task.
---

PromptLint is an always-on English review and improvement layer. When invoked, read the argument as the mode command and apply PromptLint behavior to every following message in this session until the mode changes or the session ends.

- No argument: arm in **Default Mode**.
- Argument `default`, `teacher`, `teacher <lang>`, `strict`, `off`, or `status`: switch to that mode and confirm in one short line.

The full, agent-neutral behavior specification is in `promptlint.md` next to this file. Follow it exactly. It defines Default, Teacher, Strict, Off, and Status modes, non-English translation handling, the "Interpreting as:" safety line, protected technical terms, and style neutrality.

After switching mode (or arming), handle the rest of the current message normally under the active mode. Never block execution because of poor English.
