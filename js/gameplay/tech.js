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
    question: "How many computer languages are in use?",
    choice1: "10,000",
    choice2: "50",
    choice3: "2,000",
    choice4: "5,000",
    answer: 3,
  },
  {
    question:
      "What device, released in 1993, gave rise to the term personal digital assistant?",
    choice1: "Newton MessagePad",
    choice2: "Clippy by Microsoft",
    choice3: "Palm Pilot",
    choice4: "Cortana",
    answer: 1,
  },
  {
    question: 'Who coined the term "artificial intelligence"?',
    choice1: "Herbert A. Simon",
    choice2: "Charles BachmanEngland",
    choice3: "Donald Ervin Knuth",
    choice4: "John McCarthy",
    answer: 4,
  },
  {
    question: "What does CPU stand for?",
    choice1: "Computer Protection Unit",
    choice2: "Central Processing Unit",
    choice3: "Computer Parts of USA",
    choice4: "Computer Processing Unit",
    answer: 2,
  },
  {
    question: "Who invented C++",
    choice1: "Dennis Ritchie",
    choice2: "Guido van Rossum",
    choice3: "James Gosling",
    choice4: "Bjarne Stroustrup",
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

    return window.location.assign("/pages/end.html");
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

    if (classToApply === "incorrect") {
      decrementScore(SCORE_POINTS);
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

// function to deduct 100 points for wrong answer
decrementScore = (num) => {
  score -= num;
  scoreText.innerText = score;
};

startGame();
