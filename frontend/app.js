import { questions } from "./questions.js";
import { infoParagraphs } from "./paragraphs.js";

const form = document.getElementById("quizForm");
const resultsDiv = document.getElementById("results");

// Build form dynamically
questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
        <label>${index + 1}. ${q}</label><br><br>
        <select id="q${index}" required>
            <option value="">Select</option>
            <option value="1">1 - Strongly Disagree</option>
            <option value="2">2 - Disagree</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Agree</option>
            <option value="5">5 - Strongly Agree</option>
        </select>
    `;

    form.appendChild(div);
});

// Evaluate results
document.getElementById("submitBtn").addEventListener("click", () => {
    let output = "";

    questions.forEach((q, index) => {
        const value = document.getElementById(`q${index}`).value;
        if (value && Number(value) < 3) {
            output += `
                <h3>${index + 1}. ${q}</h3>
                <p>${infoParagraphs[index]}</p>
            `;
        }
    });

    if (output === "") {
        resultsDiv.innerHTML = "<h2>Great job! No areas scored below 3.</h2>";
    } else {
        resultsDiv.innerHTML = "<h2>Recommended Learning Areas</h2>" + output;
    }

    resultsDiv.style.display = "block";
});
