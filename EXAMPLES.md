# PromptLint Examples

Worked examples of every mode. These show what the user sees, not internal steps.

---

## Default Mode

Visible but compact. One PromptLint line at the top of every reply, then the task runs.

**Grammar fix:**

```
User:  create me api login with jwt
Agent: PromptLint → Create a login API using JWT.
       [proceeds to build a login API using JWT]
```

**Non-English input (translated in the line):**

```
User:  tolong buatkan dashboard admin dengan dark mode dan chart
Agent: PromptLint → Create an admin dashboard with dark mode and charts.
       [proceeds to build the dashboard]
```

**Already clean:**

```
User:  Add pagination to the users endpoint.
Agent: PromptLint ✓ already clear
       [does it]
```

**Conversational filler:**

```
User:  thanks, that works
Agent: PromptLint ✓ already clear
       Glad it works. Anything else?
```

---

## Teacher Mode

Shows a lesson only when there is something worth teaching, then still does the task.

**Worth teaching:**

```
User:  i want make dashboard admin with chart and dark mode

Agent:
## English Review

**Original**
i want make dashboard admin with chart and dark mode

**Corrected**
I want to create an admin dashboard with charts and dark mode.

**Mistakes**
- Missing "to" after "want"
- "dashboard admin" word order should be "admin dashboard"
- "chart" should be plural "charts"

**Explanation**
"want" needs "to" before another verb. In English the describing word comes before the noun, so it is "admin dashboard", not "dashboard admin".

**Natural alternative**
Build an admin dashboard with charts and dark mode.

[then proceeds to build the dashboard]
```

**Nothing to teach (skips the block):**

```
User:  yes, continue
Agent: [continues, no review block]
```

**Explanations in the user's language (`/promptlint teacher id`):**

```
User:  help explain this because i not understand

Agent:
## English Review

**Original**
help explain this because i not understand

**Corrected**
Help explain this because I don't understand it.

**Mistakes**
- "i" harus huruf besar: "I"
- "i not understand" salah, seharusnya "I don't understand"
- tambahkan objek "it" di akhir

**Explanation**
Dalam bahasa Inggris, kata ganti "I" selalu huruf besar. Untuk kalimat negatif gunakan "don't" sebelum kata kerja.

**Natural alternative**
Could you explain this? I don't quite understand it.

[then explains the thing the user asked about]
```

---

## Strict Mode

Polishes your prompt and any prose it produces.

**Prompt rewrite:**

```
User:  create me brd with feature login and payment

Agent:
Rewritten request: Create a Business Requirements Document (BRD) that includes login and payment features.

[then writes the BRD in polished, professional English]
```

**Deliverable polish:** any email, issue, PRD, RFC, or commit message the agent generates in this mode comes out in native, professional English, even if the prompt was rough.

---

## Off

```
User:  /promptlint off
Agent: PromptLint is off. I will run your requests exactly as written.

User:  create me api login with jwt
Agent: [builds it, no correction shown]
```

---

## Status

```
User:  /promptlint status
Agent:
PromptLint Status

Enabled: Yes
Mode: Default
Explanation language: English
```
