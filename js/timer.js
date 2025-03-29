// Timer module

export class Timer {
    constructor(timeLimit, timerElementId, callback) {
      this.timeLimit = timeLimit; // Time in seconds
      this.timeLeft = timeLimit; // Time left in seconds
      this.timerElement = document.getElementById(timerElementId); // The DOM element to display the timer
      this.callback = callback; // Function to call when time is up
      this.timerInterval = null; // To store the interval ID
    }
  
    // Start the timer
    start() {
      this.timeLeft = this.timeLimit;
      this.updateDisplay();
  
      this.timerInterval = setInterval(() => {
        this.timeLeft--;
        this.updateDisplay();
  
        if (this.timeLeft <= 0) {
          this.stop();
          if (this.callback) {
            this.callback(); // Call the callback function when time runs out
          }
        }
      }, 1000);
    }
  
    // Stop the timer
    stop() {
      clearInterval(this.timerInterval);
    }
  
    // Update the timer display on the page
    updateDisplay() {
      if (this.timerElement) {
        this.timerElement.textContent = `${this.timeLeft}s`;
      }
    }
  }
  