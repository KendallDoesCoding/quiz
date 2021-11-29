const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which popular Christmas beverage is also called “milk punch?',
        choice1: 'Eggnog',
        choice2: 'Hot Toddy',
        choice3: 'Cranberry-Apple Cider Punch',
        choice4: 'Wassail',
        answer: 1
    },
    {
        question: 'What does "perro" mean in English?',
        choice1: 'Cat',
        choice2: 'Cheese',
        choice3: 'Dog',
        choice4: 'Rat',
        answer: 3
    },
    {
        question: 'Which of these is the best home-remedy to reduce the appearance of acne scars?',
        choice1: 'Yogurt',
        choice2: 'Turmeric',
        choice3: 'Baking Soda',
        choice4: 'Vinegar',
        answer: 1
    },
    {
        question: 'Which country invented tea?',
        choice1: 'United States of America',
        choice2: 'Italy',
        choice3: 'Denmark',
        choice4: 'China',
        answer: 4
    },
    {
        question: 'About how many taste buds does the average human tongue have?',
        choice1: '2,000',
        choice2: '5,000',
        choice3: '10,000',
        choice4: '20,000',
        answer: 3
    },
    {
        question: 'What is the symbol for potassium?',
        choice1: 'U',
        choice2: 'Kr',
        choice3: 'P',
        choice4: 'K',
        answer: 4
    },
    {
        question: 'What year was the very first model of the iPhone released?',
        choice1: '2003',
        choice2: '2007',
        choice3: '2006',
        choice4: '2010',
        answer: 2
    },
    {
        question: 'How long have snakes been roaming Earth?',
        choice1: '128 million years',
        choice2: '3 million years',
        choice3: '50 million years',
        choice4: '100 million years',
        answer: 1
    },
    {
        question: 'What color do about 75 percent of national flags contain?',
        choice1: 'Blue',
        choice2: 'Yellow',
        choice3: 'Green',
        choice4: 'Red',
        answer: 4
    },
    {
        question: 'What is the population of Switzerland?',
        choice1: '3.5 million',
        choice2: '10 million',
        choice3: '8.6 million',
        choice4: '5 million',
        answer: 3
    },
    {
        question: 'In what state did the first official American baseball game take place?',
        choice1: 'Florida',
        choice2: 'North Carolina',
        choice3: 'New York',
        choice4: 'New Jersey',
        answer: 4
    },
    {
        question: 'What is the largest country in the World?',
        choice1: 'United States of America',
        choice2: 'Russia',
        choice3: 'Belgium',
        choice4: 'Italy',
        answer: 2
    },
    {
        question: 'What was the most streamed show on Netflix in 2020?',
        choice1: 'Schitts Creek',
        choice2: 'Supernatural',
        choice3: 'The Blacklist',
        choice4: 'The Vampire Diaries',
        answer: 1
    },
    {
        question: 'How many bones does a shark have?',
        choice1: '2',
        choice2: '5',
        choice3: '4',
        choice4: '0',
        answer: 4
    },
    {
        question: 'Which planet is closest to the sun?',
        choice1: 'Mars',
        choice2: 'Earth',
        choice3: 'Mercury',
        choice4: 'Venus',
        answer: 3
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
