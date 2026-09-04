'use strict';

// between 1 and 20
let secretNumber = Math.trunc(Math.random()*20) + 1;

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');
const highscoreEl = document.querySelector('.highscore');
const body = document.querySelector('body');

const STARTING_SCORE = 20;
let currScore = STARTING_SCORE;
let highscore = 0;
let roundEnded = false;

document.querySelector('.check').addEventListener('click', function () {
  if (roundEnded) return;

  const guessNum = Number(guessEl.value);

  if (guessEl.value === '') {
    messageEl.textContent = '🚫 No Number!';
  } 
  
  else if (guessNum === secretNumber) {
    messageEl.textContent = '🎉 Correct Number!';
    numberEl.textContent = secretNumber;
    numberEl.style.width = '30rem';
    body.style.backgroundColor = '#60b347';
    if (currScore > highscore) {
      highscore = currScore;
      highscoreEl.textContent = highscore;
    }
    roundEnded = true;
  } 

  else {
    if (currScore > 1) {
      messageEl.textContent =
        guessNum > secretNumber ? '📈 Too High' : '📉 Too Low';
      currScore--;
    } 
    else {
      messageEl.textContent = '💥 You Lost the Game!';
      currScore = 0;
      roundEnded = true;
    }
    scoreEl.textContent = currScore;
  }
});

document.querySelector('.again').addEventListener('click', function() {
  roundEnded = false;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  currScore = STARTING_SCORE;
  scoreEl.textContent = currScore;
  guessEl.value = '';
  body.style.backgroundColor = '#222';
  messageEl.textContent = 'Start guessing...';
  numberEl.textContent = '?';
  numberEl.style.width = '15rem';
}); 