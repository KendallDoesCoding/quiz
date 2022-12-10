/**
 * @dev Base class for every game, gets all the data that will use, and once the question is answered, everything is updated while poping out the question object from the array of quiestions, when it ends the resulting score is stored in local storage to keep tract of it while we change pages
 */
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
    // runs here becasue we want to load the first round of questions
    this._renderNewQuestion();
  }

  // if there's questions left, return the last one
  _newQuestion() {
    if (this.getQuestionsLen === 0) this._endGame();
    return this.dataQA.pop();
  }

  // takes care of managing the percentage green bar on top
  _renderPercentage() {
    const leftQA = this.dataQA.length;
    const percentage = (1 - leftQA / this.QUESTIONS_AMOUNT) * 100;

    document.getElementById("progressBarFull").style.width = `${percentage}%`;
  }

  // need to calculate it based on the total amount, and remaining amount
  _renderQuestionNumber() {
    const leftQA = this.dataQA.length;
    const currentQA = this.QUESTIONS_AMOUNT - leftQA;
    const paragraph = document.getElementById("progressText");

    paragraph.textContent = `Question ${currentQA} of ${this.QUESTIONS_AMOUNT}`;
  }

  // get's a new question from newQuestion & renders it to the page
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

    // render question && all options
    document.getElementById("question").textContent = currentQA["question"];

    pArray.forEach((p, i) => {
      p.textContent = currentQA[`choice${i + 1}`];
    });
  }

  // sends the user to the highscore.html and asks if they want to save their score
  _endGame() {
    // console.log("GAME ENDED");
    window.localStorage.setItem("mostRecentScore", this.score);
    window.location.assign("/pages/end.html");
  }

  checkAnswer(selected = 0, correct = 0) {
    const p = document.querySelector(`[data-number="${selected}"]`);

    if (!this.canClick) {
      // console.log("WAIT THERE BOI");
      return;
    }

    if (selected === correct) {
      p.parentElement.classList.add("correct");
      this.score += this.QUESTION_VALUE;
      // console.log("NOICE: ", this.score);
    } else {
      p.parentElement.classList.add("incorrect");
      this.score -= this.QUESTION_VALUE;
      // console.log("BAKA GA!: ", this.score);
    }

    // render updated score
    document.getElementById("score").textContent = this.score;

    // delay stuff
    this.canClick = false;

    setTimeout(() => {
      this._renderNewQuestion();
      this.canClick = true;
      p.parentElement.classList.remove("incorrect");
      p.parentElement.classList.remove("correct");
    }, 600);
  }
}
