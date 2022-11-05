class Quiz {
  constructor(arrayQA) {
    this.arrayQA = arrayQA;
    this.questionCounter = 0;
    this.score = 0;
    this.getNewQuestion();
  }

  getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      console.log("QUIZ HAS FINISHED");
      // localStorage.setItem("mostRecentScore", score);
      // return window.location.assign("/pages/end.html");
    }
  }
}
