let cells = [...document.querySelectorAll('[data-item]')];
let resultMessageContainer = document.querySelector('[data-result-message]');
let resultMessage = document.querySelector('[data-message]');
const humanPlayer = "X";
const AIPlayer = "O";
WinsCombinations = [
  ["1", "2", "3"],
  ["1", "4", "7"],
  ["1", "5", "9"],
  ["2", "5", "8"],
  ["3", "5", "7"],
  ["3", "6", "9"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

let currentPlayer = humanPlayer;


window.addEventListener("load", startGame());

function startGame() {
  console.log("Games started");
  document.addEventListener("click", handleClick);
};

function stopGame() {
  cells.forEach(cell => cell.classList.remove("stop-interaction"));
  resultMessageContainer.classList.add('hide');
  resultMessage.innerText = "";
  document.removeEventListener("click", handleClick);
};

function resetGame() {
  stopGame();
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove('wins-cell');
  });
  startGame();
};

function handleClick(e) {
  console.log("handle click");
  if (e.target.matches('[data-item]')) {
    e.target.innerText = currentPlayer;
    e.target.classList.add("stop-interaction");
    const gameinfos = checkGameState();
    if (gameinfos.state === "winner") {
      colorWinsCombination(gameinfos.winsCombo);
      showAlert(`${currentPlayer} Wins!`);
    };
    if (gameinfos.state === "draw") {
      showAlert(`Draw!`);
    };
    if (gameinfos.state === "play") {
      nextPlayer();
    };
  };

  if (e.target.matches('[data-reset]')) {
    resetGame();
    return;
  };
};

function nextPlayer() {
  (currentPlayer == humanPlayer) ? currentPlayer = AIPlayer : currentPlayer = humanPlayer;
};

function checkGameState() {
  const plays = cells.filter(cell => cell.innerText == currentPlayer).map(cell =>  cell.id);
  const winCells = WinsCombinations.find(c => c.every(item => plays.indexOf(item) > -1));

  if (winCells !== undefined) {
    return { state: "winner", winner: currentPlayer, winsCombo: winCells};
  } else if (cells.every(cell => cell.classList.contains("stop-interaction"))) {
    showAlert('Draw!');
    return { state: "draw" };
  } else {
    return { state: "play" };
  };
};

function colorWinsCombination(combination) {
  cells.map(cell => {
    if (combination.find(item => item === cell.id)) {
      cell.classList.add('wins-cell');
    };
  });
}


function showAlert(message) {
  resultMessageContainer.classList.remove('hide');
  resultMessage.innerText = message;
};