const boxes = document.querySelectorAll("span");

let whosTurn = "player";

const player = "O";
const computer = "X";

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

boxes.forEach((box, index) => {
  console.log(whosTurn);
  console.log(board);
  box.addEventListener("click", (e) => {
    const target = e.target;
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (target.textContent !== "" || whosTurn === "computer") return;

    if (whosTurn === "player") {
      target.textContent = player;
      board[row][col] = player;
      whosTurn = "computer";
    }

    if (!isBoardFull()) {
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
    }
  }
}

function isBoardFull() {
  return board.every((row) => row.every((cell) => cell !== ""));
}

function checkWinner() {
  console.log("board", board);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      console.log(board[row][col]);
      if (
        board[row][0] === "O" &&
        board[row][1] === "O" &&
        board[row][2] === "O"
      ) {
        console.log("matched");
      }
    }
  }
}
