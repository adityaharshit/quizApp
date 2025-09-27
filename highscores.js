const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map(score =>{
    // const li = document.createElement('l1');
    // li.innerText = `${score.name}-${score.score}`;
    return `<li class = "high-score">${score.name} - ${score.score}</li>`;
}).join("");