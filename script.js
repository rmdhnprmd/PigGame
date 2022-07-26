'use strict';

// Input untuk variabel tiap element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Kondisi yg akan terus dipakai
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Kondisi yg harus di reset
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Fungsi switch player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Fungsi kocokan dadu
btnRoll.onclick = () => {
  if (playing) {
    // 1. Generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dadu
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Cek kocokan dadu, jika keluar angka 1, switch playernya
    if (dice !== 1) {
      // jumlahin tiap angka dadu ke currentScore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
};

// Fungsi hold button
btnHold.onclick = () => {
  if (playing) {
    // 1. Jumlahin currentScore ke score pemain yg aktif
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Cek jika score player >= 100
    if (scores[activePlayer] >= 100) {
      // Game kelar
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
};

// Fungsi reset
btnNew.onclick = () => {
  init();
};
