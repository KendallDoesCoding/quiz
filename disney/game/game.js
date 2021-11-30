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
        question: 'What year did Disneyland open?',
        choice1: '1940',
        choice2: '1999',
        choice3: '2000',
        choice4: '1955',
        answer: 4
    },
    {
        question: 'What is the name of the toy store in Toy Story 2?',
        choice1: 'Trinkets And Toys',
        choice2: 'Al`s Toy Barn',
        choice3: 'Pete`s Toy Barn',
        choice4: 'Toy Parade',
        answer: 2
    },
    {
        question: 'What is the name of Andy’s neighbor in Toy Story?',
        choice1: 'Sid',
        choice2: 'Slinky Dog',
        choice3: 'Rex',
        choice4: 'Mr. Potato Head',
        answer: 1
    },
    {
        question: 'Who is the fashion designer in The Incredibles?',
        choice1: 'Tony Rydinger',
        choice2: 'Edna Mode',
        choice3: 'Rick Dicker',
        choice4: 'Honey',
        answer: 2
    },
    {
        question: 'What was the first Pixar movie?',
        choice1: 'Monsters, Inc',
        choice2: 'A Bugs Life',
        choice3: 'Toy Story',
        choice4: 'Cars',
        answer: 3
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/christmas/end')
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
