// hapus classlist winner
export function removeWinnerClass(element) {
  // player0El.classList.remove('player--winner');
  element.classList.remove('player--winner');
}

// tambah classlist active
export function addActiveClass(element) {
  // player0El.classList.add('player--active');
  element.classList.add('player--active');
}

// hapus classlist active
export function removeActiveClass(element) {
  // player1El.classList.remove('player--active');
  element.classList.remove('player--active');
}

// reset textcontent
export function resetTextContent(element) {
  // score0El.textContent = 0;
  element.textContent = 0;
}
