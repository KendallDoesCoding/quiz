/**
 * @dev Base class for every game, gets all the data that will use, and once the question is answered, everything is updated while poping out the question object from the array of quiestions, when it ends the resulting score is stored in local storage to keep tract of it while we change pages
 */
export class Quiz {
  constructor(dataQA = []) {
    this.dataQA = dataQA;
    this.QUESTION_VALUE = 100;
    this.QUESTIONS_AMOUNT = dataQA.length;
    this.barPercetage = 0;
    this.score = 0;
    this.answer = "";
    this.canClick = true;
    this.noOfCorrect = 0;
    this.TOTAL_CORRECT = 0;

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
  }

  _endGame() {
    window.localStorage.setItem("mostRecentScore", this.score);
    window.localStorage.setItem("noofanswerscorrect", this.noOfCorrect);
    window.localStorage.setItem("noofquestions", this.QUESTIONS_AMOUNT);
  
    window.location.assign("/pages/end.html");
  }
  
  

  _updateCorrectCount() {
    this.TOTAL_CORRECT++;
    console.log("Total Correct:", this.TOTAL_CORRECT);
  }

  checkAnswer(selected = 0, correct = 0) {
    const p = document.querySelector(`[data-number="${selected}"]`);

    if (!this.canClick) {
      return;
    }

    if (selected === correct) {
      p.parentElement.classList.add("correct");
      this.score += this.QUESTION_VALUE;
      this.noOfCorrect++;
      this._updateCorrectCount();
    } else {
      p.parentElement.classList.add("incorrect");
      this.score -= this.QUESTION_VALUE;
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
}
