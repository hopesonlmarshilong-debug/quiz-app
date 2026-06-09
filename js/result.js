const score =
    Number(localStorage.getItem("finalScore")) || 0;

const totalQuestions = 15;

const percentage =
    Math.round((score / totalQuestions) * 100);

document.getElementById("scoreText").textContent =
    `Score: ${score}/${totalQuestions}`;

document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;

document.getElementById("messageText").textContent =
    percentage >= 50
        ? "✅ Passed!"
        : "❌ Failed!";

document
    .getElementById("retryBtn")
    .addEventListener("click", () => {

        window.location.href = "quiz.html";
    });

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";
    });