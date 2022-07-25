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
		question:
			'Which popular Christmas beverage is also called “milk punch?',
		choice1: 'Eggnog',
		choice2: 'Hot Toddy',
		choice3: 'Cranberry-Apple Cider Punch',
		choice4: 'Wassail',
		answer: 1,
	},
	{
		question:
			'In Home Alone, where are the McCallisters going on vacation when they leave Kevin behind?',
		choice1: 'United States of America',
		choice2: 'Japan',
		choice3: 'Dubai',
		choice4: 'Paris',
		answer: 4,
	},
	{
		question: 'Which country did eggnog come from?',
		choice1: 'India',
		choice2: 'England',
		choice3: 'United States of America',
		choice4: 'France',
		answer: 2,
	},
	{
		question: 'How do you say “Merry Christmas” in Spanish?',
		choice1: 'Feliz Navidad',
		choice2: 'Felices Fiestas',
		choice3: 'Que pases lindo esta navidad',
		choice4: 'Mis mejores deseos para esta navidad',
		answer: 1,
	},
	{
		question:
			'Which country started the tradition of putting up a Christmas tree?',
		choice1: 'Belgium',
		choice2: 'France',
		choice3: 'Germany',
		choice4: 'Brazil',
		answer: 3,
	},
	{
		question:
			'What popular Christmas song was actually written for Thanksgiving?',
		choice1: 'Silent Night by Franz Xaver Gruber',
		choice2: 'Jingle Bells by James Lord Pierpont',
		choice3: 'We Wish You A Merry Christmas by Arthur Sydney Warrell',
		choice4:
			'The Little Drummer Boy by Harry Simeone and Katherine Kennicott Davis',
		answer: 2,
	},
	{
		question:
			'Name the first US president who decorated the Christmas tree at the White House',
		choice1: 'James Madison',
		choice2: 'Franklin Pierce',
		choice3: 'Rutherford B Hayes',
		choice4: 'John Adams',
		answer: 2,
	},
	{
		question: 'What does the red color of Christmas symbolize?',
		choice1: 'Blood of Jesus',
		choice2: 'Santa Claus',
		choice3: 'Holly Berries',
		choice4: 'Strawberries',
		answer: 1,
	},
	{
		question:
			'Which country sends a huge Christmas tree to London, every year?',
		choice1: 'Denmark',
		choice2: 'Spain',
		choice3: 'Norway',
		choice4: 'Netherlands',
		answer: 3,
	},
	{
		question: 'When is Christmas celebrated in Russia?',
		choice1: '15th December',
		choice2: '15th Feburary',
		choice3: '25th December',
		choice4: '7th January',
		answer: 4,
	},
	{
		question: 'In which year was Christmas banned in Boston?',
		choice1: '1630',
		choice2: '1659',
		choice3: '1840',
		choice4: '1910',
		answer: 2,
	},
	{
		question:
			'Which country celebrates its Independence day on Christmas Eve every year?',
		choice1: 'Libya',
		choice2: 'Syria',
		choice3: 'Lebanon',
		choice4: 'Algeria',
		answer: 1,
	},
	{
		question: 'How many packages are shipped every year?',
		choice1: '50 million',
		choice2: '210 million',
		choice3: '625 million',
		choice4: '850 million',
		answer: 4,
	},
	{
		question: 'Which country did St. Nicholas belong to?',
		choice1: 'Spain',
		choice2: 'Italy',
		choice3: 'Greece',
		choice4: 'Turkey',
		answer: 3,
	},
	{
		question: 'Which Country celebrates Christmas on 24 December?',
		choice1: 'Portugal',
		choice2: 'Spain',
		choice3: 'United Kingdom',
		choice4: 'Australia',
		answer: 1,
	},
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('/christmas/end');
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
