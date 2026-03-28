// ===================== QUIZ DATA =====================

/*
TD:

  DESCRIPTION: This section defines the quiz questions and the structure of the quiz data. 
  Each question is an object with properties for category, question text, answer options, correct answer index, and an explanation for the correct answer. 
  This data is used to render the quiz questions and provide feedback to the user based on their answers. 


NOTE: From lines 21-149: Each question will be set up the same in the following format:

- "cat": The category of the question (e.g., "Budgeting", "Investing").
- "q": The text of the quiz question.
- "opts": An array of answer options for the question.
- "ans": The index of the correct answer in the "opts" array.
- "explain": A detailed explanation of the correct answer, which is shown after the user selects an option.
*/

 //TD: Declaration of "Const questions[]" which is an array of objects, where each object represents a quiz question. 
const questions = [
  {

/*TD: 

Below is the first object in the "questions" array, representing a quiz question about budgeting. Each property of the object is explained in the comments above.

Each question object has the following structure:

*/
    // TD: Decoration of the object category 
    cat: "Budgeting",
    // TD: Decoration of the quiz question 
    q: "What is the 50/30/20 budget rule?",
    // TD:An array of answer options for the budgeting question, where only one is correct.
    opts: [
      "50% savings, 30% wants, 20% bills",
      "50% needs, 30% wants, 20% savings/debt",
      "50% investments, 30% rent, 20% food",
      "50% tax, 30% charity, 20% you",
    ],
    // TD: The index of the correct answer in the "opts" array.
    ans: 1,
    // TD: An explanation of the correct answer, which will be displayed to the user after they select an option.
    explain:
      "The 50/30/20 rule: 50% of after-tax income → needs (rent, food), 30% → wants (entertainment), 20% → savings or paying off debt.",
  },
  {
    cat: "Investing",
    q: "What does it mean to 'diversify' your investments?",
    opts: [
      "Put all your money in one hot stock",
      "Spread money across different asset types to reduce risk",
      "Only invest in crypto",
      "Change your investments every day",
    ],
    ans: 1,
    explain:
      "Diversification = don't put all eggs in one basket. Spreading across stocks, bonds, real estate, etc. reduces the risk that one bad investment wipes you out.",
  },
  {
    cat: "Credit",
    q: "What's a good credit score range in the US?",
    opts: ["300–500", "500–600", "670–850", "900–1000"],
    ans: 2,
    explain:
      "Credit scores range from 300–850. A score of 670+ is generally considered 'good'. Above 800 is exceptional and gets you the best loan rates.",
  },
  {
    cat: "Savings",
    q: "What is an 'emergency fund' and how many months of expenses should you ideally save?",
    opts: [
      "A fund for vacations — 1 month",
      "A fund for unexpected expenses — 3–6 months",
      "A retirement fund — 10 years",
      "A fund for stocks — 2 weeks",
    ],
    ans: 1,
    explain:
      "An emergency fund covers unexpected costs (job loss, medical bills). Financial experts recommend 3–6 months of living expenses in a liquid savings account.",
  },
  {
    cat: "Taxes",
    q: "What does 'gross income' mean?",
    opts: [
      "Income after all taxes and deductions",
      "Only your investment income",
      "Your total income before any taxes or deductions",
      "Income from a side hustle only",
    ],
    ans: 2,
    explain:
      "Gross income = total earnings before anything is taken out. Net income = what you actually take home after taxes. Know the difference!",
  },
  {
    cat: "Debt",
    q: "Which debt repayment strategy focuses on paying off the smallest balance first?",
    opts: [
      "Avalanche method",
      "Snowball method",
      "YOLO method",
      "Minimum payment method",
    ],
    ans: 1,
    explain:
      "The 'Snowball method' pays smallest debts first for psychological wins. The 'Avalanche' attacks highest-interest debts first — saving more money mathematically.",
  },
  {
    cat: "Investing",
    q: "What is compound interest often called?",
    opts: [
      "The 8th wonder of the world",
      "A scam by banks",
      "The tax trick",
      "The debt loop",
    ],
    ans: 0,
    explain:
      "Albert Einstein (allegedly) called compound interest 'the 8th wonder of the world.' Earning interest ON your interest over time creates exponential growth.",
  },
  {
    cat: "Retirement",
    q: "What is a 401(k)?",
    opts: [
      "A type of credit card",
      "A tax-advantaged employer-sponsored retirement savings account",
      "A government loan program",
      "A stock market index",
    ],
    ans: 1,
    explain:
      "A 401(k) lets you invest pre-tax dollars for retirement. Many employers MATCH contributions — that's free money. Always contribute enough to get the full match!",
  },
  {
    cat: "Banking",
    q: "What is the main difference between a checking and a savings account?",
    opts: [
      "Checking earns higher interest",
      "Savings accounts are for daily spending",
      "Checking is for everyday spending; savings earns interest and is for storing money",
      "They are identical",
    ],
    ans: 2,
    explain:
      "Checking accounts are for daily transactions (debit cards, bills). Savings accounts earn interest and are meant for money you don't need immediately.",
  },
  {
    cat: "Investing",
    q: "What does 'buying low and selling high' mean in investing?",
    opts: [
      "Buying cheap products and reselling them",
      "Purchasing assets when prices are down and selling when they rise for a profit",
      "Always buy the most expensive stocks",
      "A strategy that doesn't actually work",
    ],
    ans: 1,
    explain:
      "The core idea of investing: buy assets when they're undervalued, hold them, then sell when prices increase. Easier said than done — but the principle is sound.",
  },
];

// ===================== STATE =====================
let userName = "";
let userAge = 0;
let userExp = "";
let ageMode = "default"; // 'genz' | 'millennial' | 'elder'
let currentQ = 0;
let score = 0;
let answered = false;

// ===================== AGE LOGIC =====================
function getAgeMode(age) {
  if (age <= 24) return "genz";
  if (age <= 40) return "millennial";
  return "elder";
}

function applyAgeMode(mode) {
  document.body.classList.remove("mode-genz", "mode-millennial", "mode-elder");
  document.body.classList.add("mode-" + mode);
}

// ===================== INTRO =====================
document.querySelectorAll(".radio-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".radio-btn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    userExp = btn.dataset.val;
  });
});

document.getElementById("start-btn").addEventListener("click", () => {
  const name = document.getElementById("name-input").value.trim();
  const age = parseInt(document.getElementById("age-input").value);

  if (!name) { alert("Hey — drop your name first!"); return; }
  if (!age || age < 10 || age > 110) { alert("Please enter a valid age."); return; }
  if (!userExp) { alert("Pick your experience level!"); return; }

  userName = name;
  userAge = age;
  ageMode = getAgeMode(age);
  applyAgeMode(ageMode);

  currentQ = 0;
  score = 0;

  showScreen("quiz-screen");
  renderQuestion();
});

// ===================== QUIZ =====================
function renderQuestion() {
  const q = questions[currentQ];

  document.getElementById("q-num-label").textContent = `Question ${currentQ + 1} of ${questions.length}`;
  document.getElementById("q-cat-label").textContent = q.cat;
  document.getElementById("question-text").textContent = q.q;
  document.getElementById("progress-fill").style.width = `${(currentQ / questions.length) * 100}%`;

  const optsContainer = document.getElementById("options-container");
  optsContainer.innerHTML = "";
  q.opts.forEach((optText, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = optText;
    btn.addEventListener("click", () => selectAnswer(i));
    optsContainer.appendChild(btn);
  });

  const fb = document.getElementById("feedback-box");
  fb.className = "feedback-box";
  fb.style.display = "none";

  document.getElementById("next-btn").style.display = "none";
  answered = false;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = questions[currentQ];
  const opts = document.querySelectorAll(".option");
  const correct = idx === q.ans;

  if (correct) score++;

  opts.forEach((o) => o.classList.add("disabled"));
  opts[idx].classList.add(correct ? "correct" : "wrong");
  if (!correct) opts[q.ans].classList.add("correct");

  const fb = document.getElementById("feedback-box");
  fb.className = "feedback-box visible" + (correct ? "" : " wrong-fb");
  fb.innerHTML = getFeedback(correct, q.explain);
  fb.style.display = "block";

  document.getElementById("next-btn").style.display = "inline-block";
}

function getFeedback(correct, explain) {
  if (ageMode === "genz") {
    const correctLines = [
      "No cap, that's right! 🔥",
      "W answer fr fr 💅",
      "You ate that bestie 😮‍💨",
      "Main character energy ✨",
    ];
    const wrongLines = [
      "Bro said what 💀",
      "That's kinda sus ngl 😭",
      "Not you fumbling this one",
      "OK so we need to talk 💀",
    ];
    const pool = correct ? correctLines : wrongLines;
    const prefix = pool[Math.floor(Math.random() * pool.length)];
    return `<strong>${prefix}</strong><br><br>${explain}`;
  }

  if (ageMode === "elder") {
    const prefix = correct ? "✅ Excellent!" : "❌ Not quite.";
    return `<strong style="font-size:1.05rem">${prefix}</strong><br><br><strong>${explain}</strong>`;
  }

  // Millennial default
  const prefix = correct ? "✅ Nice work!" : "❌ Missed it.";
  return `${prefix} ${explain}`;
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQ++;
  if (currentQ >= questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

// ===================== RESULTS =====================
function showResults() {
  showScreen("results-screen");
  document.getElementById("progress-fill").style.width = "100%";

  const pct = Math.round((score / questions.length) * 100);
  const content = document.getElementById("results-content");

  if (ageMode === "genz") {
    content.innerHTML = buildGenZResults(pct);
  } else if (ageMode === "elder") {
    content.innerHTML = buildElderResults(pct);
  } else {
    content.innerHTML = buildMillennialResults(pct);
  }
}

function scoreRingHTML(pct) {
  const r = 50, cx = 60, cy = 60;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return `
    <div class="score-ring">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2a2a3a" stroke-width="10"/>
        <circle class="ring-circle" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="10"
          stroke-linecap="round"
          style="color: var(--accent); stroke-dasharray:${circ}; stroke-dashoffset:${offset}; transition: stroke-dashoffset 1s ease;"/>
      </svg>
      <div class="ring-text">${pct}%</div>
    </div>`;
}

function buildGenZResults(pct) {
  let badge, verdict, sub, emoji;

  if (pct >= 80) {
    badge = '<span class="genz-badge badge-aura">✨ MAIN CHARACTER AURA ✨</span>';
    verdict = `${userName}, you have AURA 💜`;
    sub = "No cap, you actually understood all of this. The finance girlies are shaking.";
    emoji = "🔥💅🏆";
  } else if (pct >= 50) {
    badge = '<span class="genz-badge badge-mid">😐 MID ERA</span>';
    verdict = `${userName}, you're giving... mid 😐`;
    sub = "Some of the moves were there, but so were the fumbles. We move.";
    emoji = "🫠📉😅";
  } else {
    badge = '<span class="genz-badge badge-sus">💀 KINDA SUS NGL</span>';
    verdict = `${userName} this is SUS behavior 💀`;
    sub = "Bro said they know finance and then did this. Not the arc we needed.";
    emoji = "💀🤡😭";
  }

  return `
    <div class="result-header">
      ${badge}
      ${scoreRingHTML(pct)}
      <div class="confetti-line">${emoji}</div>
      <div class="verdict" style="font-size:clamp(1.3rem,4vw,1.8rem)">${verdict}</div>
      <div class="verdict-sub">${sub}</div>
      <div class="verdict-sub" style="font-size:.8rem;margin-top:4px">${score} / ${questions.length} correct</div>
    </div>
    <div class="card tips-section">
      <h3>Level Up Your Finance Game 📚</h3>
      ${getTipsHTML(pct)}
    </div>`;
}

function buildElderResults(pct) {
  let verdict, sub;

  if (pct >= 80) {
    verdict = `Outstanding, ${userName}!`;
    sub = "Your financial knowledge is commendable. Keep it up and share this wisdom with others.";
  } else if (pct >= 50) {
    verdict = `Well done, ${userName}.`;
    sub = "You have a solid foundation. A little more learning will serve you very well.";
  } else {
    verdict = `No worries, ${userName}.`;
    sub = "Financial literacy is a journey, not a destination. It's never too late to learn.";
  }

  return `
    <div class="result-header">
      ${scoreRingHTML(pct)}
      <div class="verdict" style="font-size:clamp(1.6rem,5vw,2.2rem)">${verdict}</div>
      <div class="verdict-sub" style="font-size:1rem">${sub}</div>
      <div class="verdict-sub" style="font-size:.9rem;margin-top:4px">${score} of ${questions.length} correct</div>
    </div>
    <div class="elder-wisdom">${getElderWisdom(pct)}</div>
    <div class="card tips-section">
      <h3>Key Takeaways</h3>
      ${getTipsHTML(pct)}
    </div>`;
}

function buildMillennialResults(pct) {
  let verdict, sub, emoji;

  if (pct >= 80) {
    verdict = `${userName}, you're actually crushing it 💪`;
    sub = "Your financial IQ is legit. Now go make those moves.";
    emoji = "🚀";
  } else if (pct >= 50) {
    verdict = `${userName} — solid start, room to grow`;
    sub = "You've got the basics. Some gaps to fill but you're on the right track.";
    emoji = "📈";
  } else {
    verdict = `${userName}, we need to talk about money`;
    sub = "Real talk: the knowledge gaps here could cost you. Let's fix that.";
    emoji = "💬";
  }

  return `
    <div class="result-header">
      ${scoreRingHTML(pct)}
      <div class="confetti-line">${emoji}</div>
      <div class="verdict" style="font-size:clamp(1.2rem,3.5vw,1.7rem)">${verdict}</div>
      <div class="verdict-sub">${sub}</div>
      <div class="verdict-sub" style="font-size:.8rem;margin-top:4px">${score} / ${questions.length} correct</div>
    </div>
    <div class="card tips-section">
      <h3>Your Action Plan</h3>
      ${getTipsHTML(pct)}
    </div>`;
}

function getTipsHTML(pct) {
  const allTips = [
    { e: "💰", t: "Start your emergency fund today — even $500 is a meaningful start." },
    { e: "📊", t: "Try the 50/30/20 rule for one month and see how your spending shifts." },
    { e: "🏦", t: "If your employer offers a 401(k) match, contribute enough to get the full match — it's free money." },
    { e: "💳", t: "Pay your credit card in full every month to avoid interest charges completely." },
    { e: "📈", t: "Open a Roth IRA or brokerage account and start investing, even small amounts." },
    { e: "🧾", t: "Track your expenses for 30 days — you'll be surprised where the money actually goes." },
  ];

  const tips = pct < 50 ? allTips : allTips.slice(0, 3);
  return tips
    .map(
      (t) => `
    <div class="tip-item">
      <div class="tip-emoji">${t.e}</div>
      <div class="tip-text">${t.t}</div>
    </div>`
    )
    .join("");
}

function getElderWisdom(pct) {
  if (pct >= 80)
    return `"The secret of getting ahead is getting started." — Mark Twain. You clearly got started — and kept going. That is the mark of financial wisdom.`;
  if (pct >= 50)
    return `"An investment in knowledge pays the best interest." — Benjamin Franklin. You have a good foundation. A bit more study and you will be in an enviable position.`;
  return `"It's never too late to start." The most important financial decision you can make today is simply to begin learning and taking small, consistent steps.`;
}

// ===================== HELPERS =====================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const el = document.getElementById(id);
  el.classList.add("active");
  // Re-trigger animation
  el.style.animation = "none";
  el.offsetHeight; // force reflow
  el.style.animation = "";
}

document.getElementById("restart-btn").addEventListener("click", () => {
  document.body.classList.remove("mode-genz", "mode-millennial", "mode-elder");
  document.getElementById("name-input").value = "";
  document.getElementById("age-input").value = "";
  document.querySelectorAll(".radio-btn").forEach((b) => b.classList.remove("selected"));
  userExp = "";
  showScreen("intro-screen");
});
