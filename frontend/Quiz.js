// ===================== QUIZ =====================
// Self-assessment with 1-5 Likert scale ratings
import { questions } from "./questions.js";
import { currentQ, setState } from "./state.js";

export function renderQuestion() {
  const q = questions[currentQ];
  console.log("Rendering question:", currentQ + 1, q);

  document.getElementById("q-num-label").textContent = `Question ${currentQ + 1} of ${questions.length}`;
  document.getElementById("question-text").textContent = q;
  document.getElementById("progress-fill").style.width = `${(currentQ / questions.length) * 100}%`;

  // Hide category label for self-assessment (not applicable)
  if (document.getElementById("q-cat-label")) {
    document.getElementById("q-cat-label").style.display = "none";
  }

  const optsContainer = document.getElementById("options-container");
  optsContainer.innerHTML = "";
  console.log("Options container cleared");

  // Create Likert scale dropdown (1-5)
  const select = document.createElement("select");
  select.id = `q${currentQ}`;
  select.className = "rating-select";
  select.required = true;
  
  // Add inline styles to ensure visibility
  select.style.width = "100%";
  select.style.padding = "16px 20px";
  select.style.marginTop = "16px";
  select.style.marginBottom = "20px";
  select.style.border = "2px solid #2a2a3a";
  select.style.borderRadius = "12px";
  select.style.background = "#1c1c28";
  select.style.color = "#f0f0f0";
  select.style.fontFamily = "'Space Mono', monospace";
  select.style.fontSize = "0.9rem";
  select.style.cursor = "pointer";
  select.style.display = "block";
  select.style.minHeight = "52px";
  select.style.boxSizing = "border-box";

  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.textContent = "Select a rating...";
  select.appendChild(defaultOpt);

  const ratingLabels = [
    "1 - Strongly Disagree",
    "2 - Disagree",
    "3 - Neutral",
    "4 - Agree",
    "5 - Strongly Agree"
  ];

  ratingLabels.forEach((label, i) => {
    const opt = document.createElement("option");
    opt.value = String(i + 1);
    opt.textContent = label;
    opt.style.background = "#1c1c28";
    opt.style.color = "#f0f0f0";
    opt.style.padding = "8px";
    select.appendChild(opt);
  });

  select.addEventListener("change", () => {
    selectRating(select.value);
  });

  optsContainer.appendChild(select);
  console.log("Select element created and appended", select);

  // Hide feedback and next button initially
  const fb = document.getElementById("feedback-box");
  if (fb) {
    fb.style.display = "none";
  }
  document.getElementById("next-btn").style.display = "none";
}

export function selectRating(value) {
  if (value === "") return;

  // Store the rating
  const currentQ = parseInt(document.getElementById("q-num-label").textContent.split(" ")[1]) - 1;
  if (!window.ratings) window.ratings = {};
  window.ratings[currentQ] = parseInt(value);

  // Log storage for debugging
  console.log(`✅ Question ${currentQ + 1} rating stored: ${value} (1=Strongly Disagree, 5=Strongly Agree)`);
  console.log("Current ratings:", window.ratings);

  document.getElementById("next-btn").style.display = "inline-block";
}