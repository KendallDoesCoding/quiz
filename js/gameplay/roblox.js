const questions = [
  {
    question: "What does the name Roblox actually mean?",
    choice1: "It was invented by a person called Rob Lox",
    choice2: "It's a random name got on a Game Name Generator",
    choice3: "It's a combination of the words 'robot' and 'blocks'",
    choice4: "It's short for 'roadblocks'",
    answer: 3,
  },
  {
    question: "Who invented Roblox?",
    choice1: "David Baszucki",
    choice2: "Matt Kaufman",
    choice3: "Mark Reinstra",
    choice4: "Daniel Sturman",
    answer: 1,
  },
  {
    question: "When was Roblox released?",
    choice1: "2008",
    choice2: "2005",
    choice3: "2009",
    choice4: "2006",
    answer: 4,
  },
  {
    question: "How many hats can a character wear at once in Roblox?",
    choice1: "5",
    choice2: "3",
    choice3: "10",
    choice4: "7",
    answer: 2,
  },
  {
    question: "How many people play Roblox every month as of 2021?",
    choice1: "25M+",
    choice2: "100M+",
    choice3: "250M+",
    choice4: "180M+",
    answer: 4,
  },
  {
    question: "What was the original name of Roblox?",
    choice1: "Ultra Blocks",
    choice2: "Dyna Blocks",
    choice3: "Jammed Blocks",
    choice4: "Xtra Blocks",
    answer: 2,
  },
  {
    question: "Which of these is a real thing in Roblox?",
    choice1: "Ludicrous Builders Club",
    choice2: "Preposterous Builders Club",
    choice3: "Outrageous Builders Club",
    choice4: "Terrible Builders Club",
    answer: 3,
  },
];

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

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

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
