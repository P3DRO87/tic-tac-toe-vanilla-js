const gameBoard = document.getElementById("game-board");
const currentPlayerMs = document.getElementById("current-player-ms");

const gameHistory = [];

let currentPlayer = "O";

currentPlayerMs.innerHTML = "Current Player: X";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  for (let index = 0; index < 9; index++) {
    const cell = document.createElement("span");

    cell.addEventListener("click", () => {
      if (cell.innerHTML) return;

      cell.innerHTML =
        currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
      cell.setAttribute("class", currentPlayer);
      const cellElements = gameBoard.querySelectorAll("span");
      const winner = checkWinner(cellElements, currentPlayer);

      if (isDraw(cell.innerHTML) && !winner) {
        alert("the match was a draw");
        resetGame(cellElements);
      }

      if (winner) {
        alert(`winner: ${currentPlayer}`);
        resetGame(cellElements);
      }

      currentPlayerMs.innerHTML = `Current Player: ${
        currentPlayer === "X" ? "O" : "X"
      }`;
    });

    gameBoard.append(cell);
  }
};

startGame();

const checkWinner = (arr, currentClass) =>
  winningConditions.some((combi) =>
    combi.every((index) => arr[index].classList.contains(currentClass))
  );

const isDraw = (item) => {
  gameHistory.push(item);
  const isDraw = !gameHistory.includes("") && gameHistory.length > 8;

  if (isDraw) return true;
};

const resetGame = (arr) => {
  arr.forEach((item) => {
    item.innerHTML = "";
    item.classList.value = "";
    currentPlayer = "O";

    while (gameHistory.length) {
      gameHistory.pop();
    }
  });
};
