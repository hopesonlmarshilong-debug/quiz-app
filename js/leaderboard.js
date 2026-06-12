let leaderboard =
    JSON.parse(localStorage.getItem("leaderboard")) || [];

// Add sample scores if leaderboard is empty
if (leaderboard.length === 0) {

    leaderboard = [
        { name: "Alex", score: 10 },
        { name: "Sarah", score: 14 },
        { name: "John", score: 13 },
        { name: "Emma", score: 12 },
        { name: "David", score: 11 }
    ];

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );
}

const leaderboardDiv =
    document.getElementById("leaderboard");

leaderboard.sort((a, b) => b.score - a.score);

leaderboard.forEach((player, index) => {

    const row =
        document.createElement("div");

    row.classList.add("leaderboard-row");

    row.innerHTML = `
        <span>#${index + 1}</span>
        <span>${player.name}</span>
        <span>${player.score}/15</span>
    `;

    leaderboardDiv.appendChild(row);
});