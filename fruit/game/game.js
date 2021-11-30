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
        question: 'Where was the kiwi fruit first grown?',
        choice1: 'New Zealand',
        choice2: 'China',
        choice3: 'Australia',
        choice4: 'Chile',
        answer: 2
    },
    {
        question: 'What percentage of the watermelon is water?',
        choice1: '64%',
        choice2: '39%',
        choice3: '92%',
        choice4: '80%',
        answer: 3
    },
    {
        question: 'What do apple pipes contain?',
        choice1: 'Cyanide',
        choice2: 'Juice',
        choice3: 'Sodium',
        choice4: 'Vitamin H',
        answer: 1
    },
    {
        question: 'What is the other name for Chinese Gooseberry?',
        choice1: 'Plum',
        choice2: 'Lime',
        choice3: 'Cherry',
        choice4: 'Kiwi',
        answer: 4
    },
    {
        question: 'There is a museum in Belgium dedicated to',
        choice1: 'Papya',
        choice2: 'Strawberries',
        choice3: 'Cherry',
        choice4: 'Pear',
        answer: 2
    },
    {
        question: 'The only fruit to have seeds on the outside is?',
        choice1: 'Strawberry',
        choice2: 'Lychee',
        choice3: 'Pineapple',
        choice4: 'Raspberry',
        answer: 1
    },
    {
        question: 'What was named as the state fruit of Ohio, in the year January 2009?',
        choice1: 'Apple',
        choice2: 'Banana',
        choice3: 'Cranberry',
        choice4: 'Blueberry',
        answer: 3
    },
    {
        question: 'What is the most-consumed fruit in the world?',
        choice1: 'Mangoes',
        choice2: 'Apples',
        choice3: 'Lychees',
        choice4: 'Strawberries',
        answer: 1
    },
    {
        question: 'Which fruit contains heart-healthy fats?',
        choice1: 'Coconut',
        choice2: 'Olives',
        choice3: 'Avocado',
        choice4: 'All of the above',
        answer: 4
    },
    {
        question: 'Which fruit has the highest oil content?',
        choice1: 'Peach',
        choice2: 'Avocado',
        choice3: 'Olive',
        choice4: 'Mango',
        answer: 2
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

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
