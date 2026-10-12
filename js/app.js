// Display an empty tic-tac-toe board when the page is initially displayed.
// A player can click on the nine cells to make a move.
// Every click will alternate between marking an X and O.
// Display whose turn it is (X or O).
// The cell cannot be played again once occupied with an X or O.
// Provide win logic and display a winning message.
// Provide logic for a cat's game (tie), also displaying a message.
// Provide a Reset Game button that will clear the contents of the board.

/*-------------------------------- Constants --------------------------------*/
const winningCambo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

/*---------------------------- Variables (state) ----------------------------*/
// X and O, board, msg,

let board = ["", "", "", "", "", "", "", "", ""];
let emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winner = "going";

/*------------------------ Cached Element References ------------------------*/

// Message, board, sqr, and reset button

const messageElement = document.querySelector("#message");
const boardElement = document.querySelector(".board");
const sqrElement = document.querySelectorAll(".sqr");
const resetButtonElement = document.querySelector("#reset-btn");

/*-------------------------------- Functions --------------------------------*/
// play, fill cell, display message, computer choice,does any one won

const fillPlayerCell = (event) => {
  event.target.textContent = "X";
  board[event.target.id] = "X";
  emptyCells = emptyCells.filter((cell) => cell != event.target.id);
  event.target.classList.add("disable-cell");
  boardElement.classList.add("disable-game");

  checkForWinner();

  if (winner === "going") {
    setTimeout(() => {
      computerChoice();
    }, 2000);
  }
};

const computerChoice = () => {
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let indexValue = emptyCells[randomIndex];
  sqrElement[indexValue].textContent = "O";
  board[indexValue] = "O";
  emptyCells = emptyCells.filter((cell) => cell != indexValue);
  boardElement.classList.remove("disable-game");
  sqrElement[indexValue].classList.add("disable-cell");
  checkForWinner();
};

const displayMesssage = () => {
  boardElement.classList.add("disable-game");

  if (winner === "player") messageElement.textContent = "You Win";
  else if (winner === "computer") messageElement.textContent = "You Lose";
  else if (winner === "tie") messageElement.textContent = "Tie";
};

const checkForWinner = () => {
  for (let compo of winningCambo) {
    const [a, b, c] = compo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = board[a] === "X" ? "player" : "computer";
      displayMesssage();
      return;
    }
  }

  if (emptyCells.length === 0) {
    winner = "tie";
    displayMesssage();
    return;
  }
};

const resetGame = () => {
  messageElement.textContent = "";
  boardElement.classList.remove("disable-game");

  for (let i = 0; i < board.length; i++) {
    board[i] = "";
    winner = "going";
    emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    sqrElement[i].textContent = "";
    sqrElement[i].classList.remove("disable-cell");
  }
};

/*----------------------------- Event Listeners -----------------------------*/

//  cells, reset button
boardElement.addEventListener("click", checkForWinner);
resetButtonElement.addEventListener("click", resetGame);

for (let cell of sqrElement) {
  cell.addEventListener("click", fillPlayerCell);
}
