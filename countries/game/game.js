const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "In which country are the world’s 10 coldest cities located?",
    choice1: "Sweden",
    choice2: "Canada",
    choice3: "Australia",
    choice4: "Russia",
    answer: 4,
  },
  {
    question: "Which country has three capital cities?",
    choice1: "South Africa",
    choice2: "Nigeria",
    choice3: "Chilie",
    choice4: "China",
    answer: 1,
  },
  {
    question:
      "Thanks to its overseas territories, which country technically spans 12 time zones?",
    choice1: "Russia",
    choice2: "United States",
    choice3: "Franch",
    choice4: "New Zealand",
    answer: 3,
  },
  {
    question: "Which continent is home to the most countries?",
    choice1: "Europe",
    choice2: "Africa",
    choice3: "Asia",
    choice4: "South America",
    answer: 2,
  },
  {
    question:
      "Which of these is NOT one of the 13 countries crossed by the Equator?",
    choice1: "Ecuador",
    choice2: "Indonesia",
    choice3: "Kenya",
    choice4: "Egypt",
    answer: 4,
  },
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/countries/end");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
