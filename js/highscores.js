const highScoresList = document.querySelector("#highScoresList");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores

  .map((score) => {
    if(score.score > 0){
       return `<li class="high-score">
       <span class="player-name">${score.name}</span>
       <span class="player-score">+${score.score}</span>
    </li>`

    } else {
      return `<li class="high-score">
      <span class="player-name">${score.name}</span>
      <span class="player-score">${score.score}</span>
   </li>`
    }
   
  })
  .join("");
  function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff']; // Add more colors if needed
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Random duration between 2 and 5 seconds
    confetti.style.animationDelay = -Math.random() * 5 + 's'; // Random delay up to 5 seconds
    document.querySelector('.confetti-container').appendChild(confetti);
  
    // Remove confetti after animation ends
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
  
  // Generate confetti every 0.5 seconds
  setInterval(createConfetti, 1000);
