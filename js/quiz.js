// Check if user is logged in
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (currentUser) {
    document.getElementById("username").textContent =
        currentUser.name;
}

// Logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";
    });

// Quiz Questions
const quizData = [
{
    question: "What does HTML stand for?",
    answers: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks Text Management Language",
        "Hyper Tool Multi Language"
    ],
    correct: 0
},
{
    question: "What does CSS stand for?",
    answers: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
    ],
    correct: 1
},
{
    question: "Which company developed JavaScript?",
    answers: [
        "Google",
        "Apple",
        "Microsoft",
        "Netscape"
    ],
    correct: 3
},
{
    question: "Which HTML tag creates a hyperlink?",
    answers: [
        "<link>",
        "<a>",
        "<href>",
        "<url>"
    ],
    correct: 1
},
{
    question: "Which CSS property changes text color?",
    answers: [
        "font-color",
        "text-color",
        "color",
        "foreground"
    ],
    correct: 2
},
{
    question: "Which symbol is used for an ID selector in CSS?",
    answers: [
        ".",
        "#",
        "*",
        "@"
    ],
    correct: 1
},
{
    question: "Which JavaScript method selects an element by ID?",
    answers: [
        "getElementById()",
        "queryAll()",
        "selectById()",
        "findElement()"
    ],
    correct: 0
},
{
    question: "Which keyword creates a variable?",
    answers: [
        "create",
        "var",
        "new",
        "make"
    ],
    correct: 1
},
{
    question: "Which HTML tag displays an image?",
    answers: [
        "<img>",
        "<image>",
        "<src>",
        "<picture>"
    ],
    correct: 0
},
{
    question: "Which operator means strict equality?",
    answers: [
        "=",
        "==",
        "===",
        "!="
    ],
    correct: 2
},
{
    question: "Which layout system is one-dimensional?",
    answers: [
        "Grid",
        "Flexbox",
        "Table",
        "Float"
    ],
    correct: 1
},
{
    question: "Which event occurs when a button is clicked?",
    answers: [
        "onhover",
        "onclick",
        "onsubmit",
        "onfocus"
    ],
    correct: 1
},
{
    question: "Which function prints to the browser console?",
    answers: [
        "print()",
        "console.write()",
        "console.log()",
        "show()"
    ],
    correct: 2
},
{
    question: "Which heading tag is the largest?",
    answers: [
        "<h6>",
        "<h4>",
        "<h2>",
        "<h1>"
    ],
    correct: 3
},
{
    question: "Which storage keeps data after closing the browser?",
    answers: [
        "sessionStorage",
        "localStorage",
        "tempStorage",
        "cacheStorage"
    ],
    correct: 1
}
];

// Variables
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 15;
let timerInterval;

// Elements
const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const nextBtn =
    document.getElementById("nextBtn");

// Timer
function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 15;

    document.getElementById("timer").textContent =
        timeLeft;

    timerInterval = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent =
            timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            currentQuestion++;

            if (currentQuestion < quizData.length) {

                loadQuestion();

            } else {

                showResults();
            }
        }

    }, 1000);
}

// Load Question
function loadQuestion() {

    selectedAnswer = null;

    const question =
        quizData[currentQuestion];

    currentQuestionElement.textContent =
        currentQuestion + 1;

    questionElement.textContent =
        question.question;

    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer;

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".answer-btn")
                .forEach(btn =>
                    btn.classList.remove("selected")
                );

            button.classList.add("selected");

            selectedAnswer = index;
        });

        answersElement.appendChild(button);
    });

    startTimer();
}

// Results
function showResults() {

    clearInterval(timerInterval);

    let leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
        name: currentUser ? currentUser.name : "Player",
        score: score
    });

    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );

    const percentage = Math.round(
        (score / quizData.length) * 100
    );

    document.querySelector(".quiz-container").innerHTML = `
        <div style="text-align:center;">

            <h1>🏆 Quiz Completed!</h1>

            <h2>Score: ${score}/${quizData.length}</h2>

            <h3>Percentage: ${percentage}%</h3>

            <br>

            <button onclick="window.location.href='dashboard.html'">
                🏠 Back to Dashboard
            </button>

            <br><br>

            <button onclick="window.location.href='leaderboard.html'">
                🏆 View Leaderboard
            </button>

            <br><br>

            <button onclick="location.reload()">
                🔄 Play Again
            </button>

            <br><br>

            <button onclick="
                localStorage.removeItem('currentUser');
                 window.location.href='login.html';
            ">
                🚪 Logout
            </button>

        </div>
    `;
}

// Next Question
nextBtn.addEventListener("click", () => {

    if (selectedAnswer === null) {

        alert("Please select an answer.");

        return;
    }

    clearInterval(timerInterval);

    if (
        selectedAnswer ===
        quizData[currentQuestion].correct
    ) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showResults();
    }
});

// Start Quiz
loadQuestion();