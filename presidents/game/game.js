const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: 'Who was the first American-born president?',
		choice1: 'George Washington',
		choice2: 'Martin Van Buren',
		choice3: 'John Quincy Adams',
		choice4: 'Thomas Jefferson',
		answer: 2,
	},
	{
		question: 'Which president made Christmas a national holiday?',
		choice1: 'James K. Polk',
		choice2: 'Zachary Taylo',
		choice3: 'Ulysses S. Grant',
		choice4: 'Abraham Lincoln',
		answer: 3,
	},
	{
		question:
			'Which president was a classically trained pianist and played 4 other instruments?',
		choice1: 'Richard Nixon',
		choice2: 'William H. Taft',
		choice3: 'Woodrow Wilson',
		choice4: 'Chester A. Arthur',
		answer: 1,
	},
	{
		question:
			'Which president put up the first Christmas tree in the White House?',
		choice1: 'Herbert C. Hoover',
		choice2: 'Warren G. Harding',
		choice3: 'Calvin Coolidge',
		choice4: 'Benjamin Harrison',
		answer: 4,
	},
	{
		question:
			'Who was the first president to ride in a car to his inauguration?',
		choice1: 'John Adams',
		choice2: 'George W. Bush',
		choice3: 'Warren G. Harding',
		choice4: 'Barack H. Obama',
		answer: 3,
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
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('/presidents/end');
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionsIndex = Math.floor(
		Math.random() * availableQuestions.length
	);
	currentQuestion = availableQuestions[questionsIndex];
	question.innerText = currentQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionsIndex, 1);

	acceptingAnswers = true;
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if (classToApply === 'correct') {
			incrementScore(SCORE_POINTS);
		}

		if (classToApply === 'incorrect') {
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
