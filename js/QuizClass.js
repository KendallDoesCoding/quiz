export class Quiz {
  constructor(dataQA = []) {
    this.dataQA = dataQA;
    // initial game values
    this.QUESTION_VALUE = 100;
    this.QUESTIONS_AMOUNT = dataQA.length;
    this.barPercetage = 0;
    this.score = 0;
    this.answer = "";
    this.canClick = true;
    this.correctStreak = 0; // Tracks consecutive correct answers
    this.startTime = 0; // Stores the start time of each question
    // runs here because we want to load the first round of questions
    this._renderNewQuestion();
  }

  _newQuestion() {
    if (this.getQuestionsLen === 0) this._endGame();
    return this.dataQA.pop();
  }

  _renderPercentage() {
    const leftQA = this.dataQA.length;
    const percentage = (1 - leftQA / this.QUESTIONS_AMOUNT) * 100;

    document.getElementById("progressBarFull").style.width = `${percentage}%`;
  }

  _renderQuestionNumber() {
    const leftQA = this.dataQA.length;
    const currentQA = this.QUESTIONS_AMOUNT - leftQA;
    const paragraph = document.getElementById("progressText");

    paragraph.textContent = `Question ${currentQA} of ${this.QUESTIONS_AMOUNT}`;
  }

  _renderNewQuestion() {
    const currentQA = this._newQuestion();
    if (!currentQA) {
      this._endGame();
      return;
    }

    this._renderPercentage();

    this._renderQuestionNumber();

    const pArray = document.querySelectorAll(".choice-text");

    this.answer = currentQA["answer"];

    document.getElementById("question").textContent = currentQA["question"];

    pArray.forEach((p, i) => {
      p.textContent = currentQA[`choice${i + 1}`];
    });

    this.startTimer(); // Start the timer for the new question
  }

  _endGame() {
    window.localStorage.setItem("mostRecentScore", this.score);
    window.location.assign("/pages/end.html");
  }

  checkAnswer(selected = 0, correct = 0) {
    const p = document.querySelector(`[data-number="${selected}"]`);

    if (!this.canClick) {
      return;
    }

    if (selected === correct) {
      p.parentElement.classList.add("correct");
      this.score += this.QUESTION_VALUE;
      this.calculateTimeBonus();
      this.updateStreak();
    } else {
      p.parentElement.classList.add("incorrect");
    }

    document.getElementById("score").textContent = this.score;

    this.canClick = false;

    setTimeout(() => {
      this._renderNewQuestion();
      this.canClick = true;
      p.parentElement.classList.remove("incorrect");
      p.parentElement.classList.remove("correct");
    }, 600);
  }

  startTimer() {
    this.startTime = new Date().getTime();
  }

  calculateTimeBonus() {
    const elapsed = new Date().getTime() - this.startTime;

    if (elapsed <= 1000) {
      this.score += 1000;
    } else if (elapsed <= 5000) {
      this.score += 500;
    } else if (elapsed <= 10000) {
      this.score += 100;
    }
  }

  updateStreak() {
    this.correctStreak++;

    if (this.correctStreak === 2) {
      this.score += 200;
    } else if (this.correctStreak === 3) {
      this.score += 300;
    } else if (this.correctStreak === 5) {
      this.score += 800;
    } else if (this.correctStreak === 10) {
      this.score += 1200;
    } else if (this.correctStreak === 15) {
      this.score += 1500;
    } else if (this.correctStreak > 15) {
      this.score += 1500; // Add 1500 points for each additional correct answer beyond 15
    } else {
      this.correctStreak = 1; // Reset the streak if the answer is not consecutive
    }
  }
}
