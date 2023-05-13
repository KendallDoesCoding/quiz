const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const noScore = document.querySelector("#noScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const noOfCorrect = localStorage.getItem("noofanswerscorrect");
const totalQuestions = localStorage.getItem("noofquestions");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
noScore.innerText = `${noOfCorrect}/${totalQuestions}`;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};

function goBack(n) {
  history.go(n);
}
