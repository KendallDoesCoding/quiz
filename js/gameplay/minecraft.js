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
    question: 'In which country is playing "Minecraft" in school allowed?',
    choice1: "Singapore",
    choice2: "Malaysia",
    choice3: "Thailand",
    choice4: "Sweden",
    answer: 4,
  },
  {
    question:
      "Which real life animal was recorded to produce the sound effects of the Ghasts?",
    choice1: "Cow",
    choice2: "Cat",
    choice3: "Dog",
    choice4: "Sheep",
    answer: 2,
  },
  {
    question: "When was Minecraft released?",
    choice1: "15th Jan 2009",
    choice2: "18th November 2011",
    choice3: "27th June 2004",
    choice4: "29th March 2010",
    answer: 2,
  },
  {
    question: "Which game inspired Notch to create Mincraft?",
    choice1: "Infiniminer",
    choice2: "Mines of Mars",
    choice3: "Adventure Miner",
    choice4: "Deep Miner",
    answer: 1,
  },
  {
    question: "Which of the following is NOT a Minecraft mod?",
    choice1: "Aether",
    choice2: "Aether II",
    choice3: "Aether II: Reloaded",
    choice4: "Aether II: The Silver City",
    answer: 3,
  },
  {
    question: 'How many people like to play "Minecraft" every month?',
    choice1: "100M+",
    choice2: "55M+",
    choice3: "200M+",
    choice4: "195M+",
    answer: 3,
  },
  {
    question: 'How many night creatures can you find in "Minecraft"?',
    choice1: "10",
    choice2: "3",
    choice3: "7",
    choice4: "5",
    answer: 1,
  },
  {
    question: "How far away can you be from a Ghast for it to see you?",
    choice1: "30 blocks",
    choice2: "25 blocks",
    choice3: "100 blocks",
    choice4: "50 blocks",
    answer: 3,
  },
  {
    question: "What is the best way to kill a Spider in Minecraft?",
    choice1: "With a sword",
    choice2: "With a stick",
    choice3: "With a stick and a spider eye",
    choice4: "With a pickaxe",
    answer: 1,
  },
  {
    question: "Which of these mobs does not drop a item?",
    choice1: "Horse",
    choice2: "Donkey",
    choice3: "Polar Beast",
    choice4: "Silverfish",
    answer: 4,
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

    const current = window.location.pathname.replace("game", "end");

    return window.location.assign(current);
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
