
/*----- constants -----*/
const wordList = ['Terminator', 'Skynet', 'Kyle', 'Cyberdyne', 'Sarah', 'Connor', 'Judgment'];

/*----- state variables -----*/
let gameWord = '';
let correctGuesses = [];
let wrongGuesses = [];
let guessesLeft = 6; 
let remainingGuesses = 6;

/*----- cacheded elements  -----*/
const guessesLeftEl = document.getElementById("guesses-left");
const highScoreEl = document.getElementById("high-score");
const wordDisplayEl = document.getElementById("word-display");
const letterBankContainer = document.getElementById("letter-bank");
const resetButton = document.getElementById("reset-btn");
const remainingGuessesEl = document.getElementById('remaining-guesses');

  /*----- event listeners -----*/
resetButton.addEventListener("click", initialize);
const letterButtons = document.querySelectorAll('.letter-button');
letterButtons.forEach(button => {
  button.addEventListener("click", handleLetterGuess);
});


  /*----- functions -----*/
function initialize() {
  correctGuesses = [];
  wrongGuesses = [];
  guessesLeft = 6;
  remainingGuesses = 6;
  
  gameWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

  console.log("Game Word:", gameWord);

  render(); 
}

  function render() {
  remainingGuessesEl.textContent = `Remaining Guesses: ${guessesLeft}`;
  guessesLeftEl.textContent = `Guesses Left: ${guessesLeft}`;
  wordDisplayEl.textContent = createDashes();
}

function createDashes() {
  let wordDisplay = gameWord.split('').map(letter => correctGuesses.includes(letter) ? letter : '_').join(' ');
  
  return wordDisplay;
}

function checkGameStatus() {
  if (gameWord.split('').every(letter => correctGuesses.includes(letter))) {
    alert('You Win!');
    initialize();  
  } else if (guessesLeft === 0) {
    alert('Game Over!');
    initialize();  
  }
}