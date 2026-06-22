// PromptLint Playground (Tier 1, static showcase).
// Demonstrates the bundled examples across all four modes. No AI call.

const MODE_HINTS = {
  default: "Visible but compact. One PromptLint line at the top of every reply, then the task runs.",
  teacher: "Educational. Shows an English Review block when there is something to teach, then does the task.",
  strict: "Professional editor. Rewrites your prompt and polishes any prose it generates.",
  off: "Disabled. Runs exactly what you wrote, no corrections."
};

// Each sample carries its output for every mode.
const SAMPLES = [
  {
    id: "api",
    label: "Login API",
    input: "create me api login with jwt",
    default: { kind: "fix", line: "Create a login API using JWT." },
    teacher: {
      corrected: "Create a login API using JWT.",
      mistakes: [
        '"create me" is unnatural, drop "me"',
        'word order: "login API", not "api login"',
        'missing article "a"; "JWT" stays uppercase'
      ],
      explanation: "After \"create\" you do not need \"me\". The describing word comes before the noun, so it is \"login API\". JWT is an acronym, keep it uppercase.",
      natural: "Build a login API with JWT auth."
    },
    strict: { rewrite: "Create a login API that authenticates users with JSON Web Tokens (JWT)." },
    off: "create me api login with jwt"
  },
  {
    id: "rough",
    label: "Rough English",
    input: "i want make dashboard admin with chart and dark mode",
    default: { kind: "fix", line: "I want to create an admin dashboard with charts and dark mode." },
    teacher: {
      corrected: "I want to create an admin dashboard with charts and dark mode.",
      mistakes: [
        'missing "to" after "want"',
        '"dashboard admin" should be "admin dashboard"',
        '"chart" should be plural "charts"'
      ],
      explanation: "\"want\" needs \"to\" before another verb. In English the describing word comes before the noun, so it is \"admin dashboard\".",
      natural: "Build an admin dashboard with charts and dark mode."
    },
    strict: { rewrite: "Create an admin dashboard featuring charts and a dark mode theme." },
    off: "i want make dashboard admin with chart and dark mode"
  },
  {
    id: "indonesian",
    label: "Indonesian",
    input: "tolong buatkan dashboard admin dengan dark mode dan chart",
    default: { kind: "fix", line: "Create an admin dashboard with dark mode and charts." },
    teacher: {
      corrected: "Please create an admin dashboard with dark mode and charts.",
      mistakes: [
        "input was Indonesian, translated to English",
        "intent preserved, technical terms untouched"
      ],
      explanation: "PromptLint translates non-English input to natural English while keeping your meaning. \"dark mode\" is a technical term, so it is left as is.",
      natural: "Build an admin dashboard with dark mode and charts."
    },
    strict: { rewrite: "Create an admin dashboard with a dark mode theme and data charts." },
    off: "tolong buatkan dashboard admin dengan dark mode dan chart"
  },
  {
    id: "brd",
    label: "BRD (best in Strict)",
    input: "create me brd with feature login and payment",
    default: { kind: "fix", line: "Create a BRD with login and payment features." },
    teacher: {
      corrected: "Create a BRD that includes login and payment features.",
      mistakes: [
        '"create me" is unnatural',
        '"with feature login and payment" is awkward phrasing',
        '"BRD" is a protected term, kept as is'
      ],
      explanation: "Reword \"with feature login and payment\" to \"that includes login and payment features\". BRD stays uppercase as a known acronym.",
      natural: "Draft a BRD covering login and payment."
    },
    strict: {
      rewrite: "Create a Business Requirements Document (BRD) that includes login and payment features.",
      note: "In Strict Mode the BRD itself is also written in polished, professional English."
    },
    off: "create me brd with feature login and payment"
  },
  {
    id: "clean",
    label: "Already clean",
    input: "Add pagination to the users endpoint.",
    default: { kind: "clear" },
    teacher: { clean: true },
    strict: { rewrite: "Add pagination to the users endpoint.", note: "Already clear, no change needed." },
    off: "Add pagination to the users endpoint."
  }
];

let activeMode = "default";
let activeSampleId = null;

const $ = (sel) => document.querySelector(sel);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderExamples() {
  const wrap = $("#examples");
  wrap.innerHTML = SAMPLES.map((s) => `
    <button class="example${s.id === activeSampleId ? " is-active" : ""}" data-id="${s.id}">
      <span class="ex-label">${esc(s.label)}</span>
      <span class="ex-text">${esc(s.input)}</span>
    </button>
  `).join("");
  wrap.querySelectorAll(".example").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeSampleId = btn.dataset.id;
      const sample = SAMPLES.find((s) => s.id === activeSampleId);
      $("#input").value = sample.input;
      renderExamples();
      renderOutput();
    });
  });
}

function renderModes() {
  document.querySelectorAll(".mode").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.mode === activeMode);
  });
  $("#modeHint").textContent = MODE_HINTS[activeMode];
}

function defaultOutput(sample) {
  const d = sample.default;
  if (d.kind === "clear") {
    return `<div class="pl-line pl-clear">PromptLint &check; already clear</div>
            <div class="pl-task">[then runs the task]</div>`;
  }
  return `<div class="pl-line">PromptLint &rarr; ${esc(d.line)}</div>
          <div class="pl-task">[then runs the task]</div>`;
}

function teacherOutput(sample) {
  const t = sample.teacher;
  if (t.clean) {
    return `<div class="pl-line pl-clear">PromptLint &check; already clear</div>
            <div class="pl-task">No review needed, the sentence is correct. It just runs the task.</div>`;
  }
  return `<div class="review">
    <h3>## English Review</h3>
    <div class="row"><div class="k">Original</div><div class="v mono">${esc(sample.input)}</div></div>
    <div class="row"><div class="k">Corrected</div><div class="v mono">${esc(t.corrected)}</div></div>
    <div class="row"><div class="k">Mistakes</div><div class="v miss">${t.mistakes.map((m) => "&bull; " + esc(m)).join("<br>")}</div></div>
    <div class="row"><div class="k">Explanation</div><div class="v">${esc(t.explanation)}</div></div>
    <div class="row"><div class="k">Natural alternative</div><div class="v mono">${esc(t.natural)}</div></div>
  </div>
  <div class="pl-task">[then runs the task]</div>`;
}

function strictOutput(sample) {
  const s = sample.strict;
  const note = s.note ? `<div class="pl-task">${esc(s.note)}</div>` : "";
  return `<div class="pl-line">Rewritten request &rarr; ${esc(s.rewrite)}</div>${note}
          <div class="pl-task">[then runs the task in polished, professional English]</div>`;
}

function offOutput(sample) {
  return `<div class="pl-line pl-clear">PromptLint is off</div>
          <div class="pl-task">Running exactly what you wrote:</div>
          <div class="mono">${esc(sample.off)}</div>`;
}

function renderOutput() {
  const out = $("#output");
  const sample = SAMPLES.find((s) => s.id === activeSampleId);

  if (!sample) {
    const typed = $("#input").value.trim();
    if (typed) {
      out.innerHTML = `<p class="placeholder">This is the static showcase, so it only renders the bundled examples on the left.
        To lint <em>your own</em> text live, install PromptLint into your agent and type it there.</p>`;
    } else {
      out.innerHTML = `<p class="placeholder">Choose a mode and an example, then press <strong>Lint it</strong>.</p>`;
    }
    return;
  }

  let body;
  if (activeMode === "default") body = defaultOutput(sample);
  else if (activeMode === "teacher") body = teacherOutput(sample);
  else if (activeMode === "strict") body = strictOutput(sample);
  else body = offOutput(sample);

  // re-trigger the fade animation
  out.classList.remove("output");
  void out.offsetWidth;
  out.classList.add("output");
  out.innerHTML = body;
}

document.querySelectorAll(".mode").forEach((b) => {
  b.addEventListener("click", () => {
    activeMode = b.dataset.mode;
    renderModes();
    renderOutput();
  });
});

$("#lintBtn").addEventListener("click", () => {
  const typed = $("#input").value.trim();
  const match = SAMPLES.find((s) => s.input.toLowerCase() === typed.toLowerCase());
  activeSampleId = match ? match.id : null;
  renderExamples();
  renderOutput();
});

// init
renderModes();
renderExamples();
renderOutput();
