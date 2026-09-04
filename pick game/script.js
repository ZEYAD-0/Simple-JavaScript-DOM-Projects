'use strict';
const player0El = document.querySelector('.player--0');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

const init = function() {
  // scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function() {
  if(activePlayer === 0) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
    activePlayer = 1;
  } 
  else {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    activePlayer = 0;
  }
};

const endRound = function() {
  const winnerPlayer = document.querySelector(`.player--${activePlayer}`);
  winnerPlayer.classList.add('player--winner');
  winnerPlayer.classList.remove('player--active');
  diceEl.classList.add('hidden');
  playing = false;
};

btnRoll.addEventListener('click', function() {
  if(!playing) return;
  const newDice = Math.trunc(Math.random() * 6 + 1);
  const newSrc = `dice-${newDice}.png`;

  diceEl.setAttribute('src', newSrc);
  diceEl.classList.remove('hidden');

  if(newDice === 1) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    switchPlayer();
  } 
  else {
    currentScore += newDice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
});

btnHold.addEventListener('click', function() {
  if(!playing) return;
  const scoreEl = document.getElementById(`score--${activePlayer}`);
  const score = Number(scoreEl.textContent);
  scoreEl.textContent = score + currentScore;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  if(Number(scoreEl.textContent) >= 100) endRound();
  else switchPlayer();
});

btnNew.addEventListener('click', init);