const boxes = document.querySelectorAll("span");
const header = document.querySelector("h1");

let whosTurn = "player";
let winner = "";
const player = "O";
const computer = "X";

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
header.textContent = "Player's turn";

boxes.forEach((box, index) => {
  box.addEventListener("click", (e) => {
    const target = e.target;
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (winner !== "") return;

    if (target.textContent !== "" || whosTurn === "computer") return;
    if (whosTurn === "player") {
      target.textContent = player;
      board[row][col] = player;
      whosTurn = "computer";
      header.textContent = "Computer's turn...";
    }
    checkWinner();
    if (!isBoardFull() && winner === "") {
      setTimeout(computerTurn, 1000);
    }
  });
});

function computerTurn() {
  let emptyBoxFound = false;

  while (!emptyBoxFound) {
    const random = Math.floor(Math.random() * 9);

    if (boxes[random].textContent === "") {
      const row = Math.floor(random / 3);
      const col = random % 3;
      boxes[random].textContent = computer;
      board[row][col] = computer;
      whosTurn = "player";
      emptyBoxFound = true;
      header.textContent = "Player's turn...";
    }
    checkWinner();
  }
}

function isBoardFull() {
  return board.every((row) => row.every((cell) => cell !== ""));
}

function checkWinner() {
  // Check rows and columns for a winner
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      winner = "player";
    } else if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      winner = "player";
    } else if (
      board[i][0] === computer &&
      board[i][1] === computer &&
      board[i][2] === computer
    ) {
      winner = "computer";
    } else if (
      board[0][i] === computer &&
      board[1][i] === computer &&
      board[2][i] === computer
    ) {
      winner = "computer";
    }
  }

  // Check diagonals for a winner
  if (
    (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    winner = "player";
  } else if (
    (board[0][0] === computer &&
      board[1][1] === computer &&
      board[2][2] === computer) ||
    (board[0][2] === computer &&
      board[1][1] === computer &&
      board[2][0] === computer)
  ) {
    winner = "computer";
  }

  // Update header if there's a winner
  if (winner !== "") {
    header.textContent =
      winner === "player" ? "Player wins!" : "Computer wins!";
  }
}
