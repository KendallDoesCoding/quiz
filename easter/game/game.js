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
    question: "The first Easter eggs were dyed what color?",
    choice1: "Blue",
    choice2: "Green",
    choice3: "Purple",
    choice4: "Red",
    answer: 4,
  },
  {
    question: "Where is the most popular Easter parade held each year?",
    choice1: "New York",
    choice2: "Utah",
    choice3: "Canada",
    choice4: "Texas",
    answer: 1,
  },
  {
    question:
      "What was the circumference of the world’s largest chocolate Easter egg?",
    choice1: "20 feet, 1.20 inches",
    choice2: "100 feet, 1.90 inches",
    choice3: "64 feet, 3.65 inches",
    choice4: "10 feet, 5 inches",
    answer: 3,
  },
  {
    question: "In Switzerland, what animal delivers Easter eggs to kids?",
    choice1: "A rabbit",
    choice2: "A cuckoo",
    choice3: "A horse",
    choice4: "A bird",
    answer: 2,
  },
  {
    question: "Households each spend how much on average on Easter annually?",
    choice1: "$1,001",
    choice2: "201$",
    choice3: "820$",
    choice4: "131",
    answer: 4,
  },
  {
    question:
      "In what country did the tradition of the Easter bunny originate?",
    choice1: "United States",
    choice2: "Germany",
    choice3: "Russia",
    choice4: "Dubai",
    answer: 2,
  },
  {
    question: "When was the first White House Easter Egg Roll?",
    choice1: "1964",
    choice2: "1860",
    choice3: "1878",
    choice4: "1989",
    answer: 3,
  },
  {
    question: "Where is the largest Easter egg museum in the world?",
    choice1: "Rome",
    choice2: "Paris",
    choice3: "London",
    choice4: "Poland",
    answer: 4,
  },
  {
    question: "When Easter eggs were first dyed, it was to represent what?",
    choice1: "The colour of Jesus Christ's tombstone",
    choice2: "The blood of Jesus Christ",
    choice3: "The crucifix of Jesus Christ",
    choice4: "Mother Mary",
    answer: 2,
  },
  {
    question: "How many states consider Good Friday a holiday?",
    choice1: "102",
    choice2: "57",
    choice3: "12",
    choice4: "5",
    answer: 3,
  },
  {
    question:
      "Buying what for Easter is said to bring good luck for the rest of the year?",
    choice1: "A new car",
    choice2: "Easter Eggs",
    choice3: "A new house",
    choice4: "New clothes",
    answer: 4,
  },
  {
    question: "Dyeing Easter eggs is a tradition that began in which country?",
    choice1: "Russia",
    choice2: "Ukraine",
    choice3: "Germany",
    choice4: "Algeria",
    answer: 2,
  },
  {
    question: "What dried fruit is in hot cross buns?",
    choice1: "Raisins",
    choice2: "Walnuts",
    choice3: "Almonds",
    choice4: "Cashews",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 13;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/christmas/end");
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
