/*----- constants -----*/
const wordList = ['Terminator', 'Skynet', 'Kyle', 'Cyberdyne', 'Sarah', 'Connor', 'Judgment'];

/*----- state variables -----*/
let gameWord;
let correctGuesses;
let wrongGuesses;
let guessesLeft;
let highScore;

/*----- cached elements  -----*/
const guessesLeftEl = document.getElementById("guesses-left");
const highScoreEl = document.getElementById("high-score");
const wordDisplayEl = document.getElementById("word-display");
const letterBankContainer = document.getElementById("letter-bank");
const resetButton = document.getElementById("reset-btn");
const remainingGuessesEl = document.getElementById("remaining-guesses");
const endGameDisplayEl = document.getElementById("game-end-display");
const JohnConnorImg = document.getElementById('john-connor');
const winAudio = new Audio('/assets/-hasta-la-vista,-baby-.mp3');


/*----- event listeners -----*/
resetButton.addEventListener("click", initialize);
const letterButtons = letterBankContainer.getElementsByTagName("button");
for (let button of letterButtons) {
  button.addEventListener("click", handleLetterGuess);
}

/*----- functions -----*/
/**
 * Initializes a new game.
 *
 * Sets the `correctGuesses`, `wrongGuesses`, and `guessesLeft` state variables.
 * Selects a random game word from the word list and logs it to the console.
 * Resets the end game display element and enables all letter buttons.
 */
function initialize() {
  correctGuesses = [];
  wrongGuesses = [];
  guessesLeft = 6;
  highScore = parseInt(localStorage.getItem('highScore')) || 0;

  

  gameWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
  // console.log("Game Word:", gameWord);

  endGameDisplayEl.textContent = '';
  for (let button of letterButtons) {
    button.disabled = false;
  }

  render();
  resetImageOpacity();
}

/**
 * Updates the game board with the current state of the game.
 *
 * Sets the following elements:
 * - `remaining-guesses` to the number of wrong guesses left
 * - `guesses-left` to the number of wrong guesses left
 * - `word-display` to the current state of the game word with correct guesses
 *   revealed and remaining letters as underscores.
 */
function render() {
  remainingGuessesEl.textContent = `Remaining Wrong Guesses: ${guessesLeft}`;
  guessesLeftEl.textContent = `Wrong Guesses Left: ${guessesLeft}`;
  wordDisplayEl.textContent = createDashes();
  highScoreEl.textContent = `High Score: ${highScore}`;
}

/**
 * Creates a string representation of the game word with unguessed letters
 * replaced by underscores.
 *
 * returns string The game word with correct guesses revealed and remaining
 * letters as underscores.
 */
function createDashes() {
  return gameWord.split('').map(letter => (correctGuesses.includes(letter) ? letter : '_')).join(' ');
}

  /**
   * Checks if the game is over and displays a message accordingly.
   * If the user has guessed the word, displays a win message and resets the game after 2 seconds.
   * If the user has run out of guesses, displays a lose message and resets the game after 2 seconds.
   */
function checkGameStatus() {
  if (gameWord.split('').every(letter => correctGuesses.includes(letter))) {
    endGameDisplayEl.textContent = 'You Stopped SKYNET!';
    winAudio.play();
    updateHighScore();
    setTimeout(initialize, 2000);
  } else if (guessesLeft === 0) {
    endGameDisplayEl.textContent = 'Game Over! SKYNET has won!';
    setTimeout(initialize, 2000);
  }
}

  /**
   * Handle a letter guess.
   *
   * If the letter has already been guessed, do nothing.
   * Disable the button for the guessed letter.
   * If the letter is in the game word, add it to correctGuesses.
   * If not, add it to wrongGuesses and decrement guessesLeft.
   * Update game board and check if the game is over.
   */
function handleLetterGuess(evt) {
  const letter = this.textContent.toUpperCase();

  if (correctGuesses.includes(letter) || wrongGuesses.includes(letter)) {
    return;
  }

  this.disabled = true;

  if (gameWord.includes(letter)) {
    correctGuesses.push(letter);
  } else {
    wrongGuesses.push(letter);
    guessesLeft--;
    reduceImageOpacity();
  }

  render();
  checkGameStatus();
}

  /**
   * Reduce the opacity of the John Connor image.
   *
   * Decreases the opacity by 1/6 of its current value, but not below 0.
   * This is called when the user makes an incorrect guess to make the image fade.
   */
function reduceImageOpacity() {
  const opacityReduction = 1 / 6; 
  const newOpacity = Math.max(0, JohnConnorImg.style.opacity - opacityReduction); 
  JohnConnorImg.style.opacity = newOpacity;
}

/**
 * Reset the opacity of the John Connor image when the game starts or is reset.
 */
function resetImageOpacity() {
  JohnConnorImg.style.opacity = 1; 
}

  /**
   * Update the high score in local storage and the high score element in the
   * DOM if the current score is higher than the high score.
   *
   * This is called when the game is won.
   */
function updateHighScore() {
  if (guessesLeft > highScore) {
    highScore = guessesLeft;
    localStorage.setItem('highScore', highScore); 
    highScoreEl.textContent = `High Score: ${highScore}`; 
  }
}
