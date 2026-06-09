const leaderboard =
    JSON.parse(localStorage.getItem("leaderboard")) || [];

const leaderboardDiv =
    document.getElementById("leaderboard");

if (leaderboard.length === 0) {

    leaderboardDiv.innerHTML =
        "<h3>No scores available.</h3>";

} else {

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
}