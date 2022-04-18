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
    question: "Who was the best football player of Europe in 1998?",
    choice1: "Marcel Desailly from Milan and Chelsea",
    choice2: "Lilian Thuram from Parma",
    choice3: "Zinedine Zidane from Juventus",
    choice4: "Michael Owen from Liverpool",
    answer: 3,
  },
  {
    question: "When was the first Premier League played?",
    choice1: "1891-92",
    choice2: "1952-53",
    choice3: "1985-86",
    choice4: "1992-93",
    answer: 4,
  },
  {
    question:
      "In 1990, this team failed to score even one goal in the World Cup final",
    choice1: "Argentina",
    choice2: "Brazil",
    choice3: "Paris Saint-Germain",
    choice4: "Portugal",
    answer: 1,
  },
  {
    question: "Whcih played scores the fastest hat-trick in Premier League",
    choice1: "Eric Cantona",
    choice2: "Sadio Mane",
    choice3: "Brian Deane",
    choice4: "Rod Wallace",
    answer: 2,
  },
  {
    question:
      "Which Barcalona player was jailed after it was found that his password was fake?",
    choice1: "Jordi Alba",
    choice2: "Martin Braithwaite",
    choice3: "Ronald Araujo",
    choice4: "Ronaldinho",
    answer: 4,
  },
  {
    question: "Who was the first Premier League manager who was fired?",
    choice1: "Ian Porterfield",
    choice2: "George Graham",
    choice3: "Stewart Houston",
    choice4: "Bruce Rioch",
    answer: 1,
  },
  {
    question: "When was the original FA Cup Trophy Stolen? ",
    choice1: "1900",
    choice2: "1885",
    choice3: "1895",
    choice4: "1845",
    answer: 3,
  },
  {
    question:
      "After how many games did Cristiano Ronaldo score his first Champions League goal?",
    choice1: "27",
    choice2: "17",
    choice3: "5",
    choice4: "36",
    answer: 1,
  },
  {
    question:
      "In which club did Nicky Byrne play before finding his calling in Music?",
    choice1: "Everton",
    choice2: "Leeds United",
    choice3: "Tottenham",
    choice4: "Manchester City",
    answer: 2,
  },
  {
    question: "Liverpool was founded in which year?",
    choice1: "1890",
    choice2: "1950",
    choice3: "1892",
    choice4: "1991",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/football/end");
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
