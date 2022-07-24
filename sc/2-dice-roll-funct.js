import {
  diceEl,
  btnRoll,
  btnHold,
  btnNew,
  player0El,
  player1El,
  score0El,
  score1El,
  current0El,
  current1El,
} from './1-var-el-input.js';
import {
  removeWinnerClass,
  addActiveClass,
  removeActiveClass,
  resetTextContent,
} from './3-init-funct.js';

// Kondisi yg harus di reset
export let scores, currentScore, activePlayer, playing;

//Fungsi init untuk new button
export const init = function () {
  // Kondisi yg akan terus dipakai
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Kondisi yg harus di reset
  resetTextContent(score0El);
  resetTextContent(score1El);
  resetTextContent(current0El);
  resetTextContent(current1El);

  diceEl.classList.add('hidden');
  removeWinnerClass(player0El);
  removeWinnerClass(player1El);
  addActiveClass(player0El);
  removeActiveClass(player1El);
};
init();

// Fungsi switch player
export const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Fungsi kocokan dadu
export const rollButton = (btnRoll.onclick = () => {
  if (playing) {
    // 1. Generating angka random
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dadu
    diceEl.classList.remove('hidden');
    diceEl.src = `../dice-${dice}.png`;

    // 3. Cek kocokan dadu, jika keluar angka 1, switch playernya
    if (dice !== 1) {
      // jumlahin tiap angka dadu ke currentScore
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Fungsi hold button
export const holdButton = (btnHold.onclick = () => {
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
});

// Fungsi reset
export const buttonNew = (btnNew.onclick = () => {
  init();
});
