const $gameBoard = document.getElementById("game-board");
const $currentPlayerMs = document.getElementById("current-player-ms");

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

let currentPlayer = "O";

document.addEventListener("DOMContentLoaded", () => main());

const main = () => {
   for (let index = 0; index < 9; index++) {
      const cell = document.createElement("span");

      cell.addEventListener("click", () => {
         if (cell.innerHTML) return;

         currentPlayer = currentPlayer === "O" ? "X" : "O";

         cell.innerHTML = currentPlayer;

         const cellElements = $gameBoard.querySelectorAll("span");
         const winner = isWinner(cellElements, currentPlayer);

         if (isDraw(Array.from(cellElements)) && !winner) {
            alert("the match was a draw");
            resetGame(cellElements);
         }

         if (winner) {
            alert(`winner: ${currentPlayer}`);
            resetGame(cellElements);
         }

         $currentPlayerMs.textContent = `Current Player ${
            currentPlayer === "X" ? "O" : "X"
         }`;
      });

      $gameBoard.append(cell);
   }
};

const isWinner = (arr, currentPlayer) =>
   winningConditions.some((combi) =>
      combi.every((index) => arr[index].textContent === currentPlayer)
   );

const isDraw = (cellElements) => cellElements.every(($cell) => $cell.textContent);

const resetGame = (arr) => {
   arr.forEach((item) => (item.textContent = ""));
   currentPlayer = "O";
};
