const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
const GameStatus = document.getElementById("statusText");
let GameRunning = false;
let Options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

IntializeGame();
function IntializeGame() {


    cells.forEach(cell => cell.addEventListener("click", ClickCheck));
    GameStatus.style.fontSize = "90px"
    // GameStatus.style.border = "2px solid";
    GameStatus.style.width = "700px";
    GameStatus.textContent = `${currentPlayer}'s Turn`;
    restartBtn.addEventListener("click", restartGame);
    GameRunning = true;
    // currentPlayer = (currentPlayer == "X") ? "O" : "X";
}
function ClickCheck() {
    const cellIndex = this.getAttribute("cellIndex");
    if (Options[cellIndex] != "" || !GameRunning) {
        return;
    }
    UpdateCell(this, cellIndex);
    CheckWinner();

}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    GameStatus.textContent = `${currentPlayer}'s Turn`;
}
function UpdateCell(cell, index) {
    // ClickCheck();
    Options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    // changePlayer();


}

function CheckWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        let cellA = Options[condition[0]];
        let cellB = Options[condition[1]];
        let cellc = Options[condition[2]];
        // changePlayer();
        if (cellA == "" || cellB == "" || cellc == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellc) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        GameStatus.textContent = `${currentPlayer} wins!`
        GameRunning = false;
    }
    else if (!Options.includes("")) {
        GameStatus.textContent = "Draw!";
    }
    else {
        changePlayer();
    }

}
function restartGame() {
    Options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    GameStatus.textContent = `${currentPlayer}'s Turn`;
        cells.forEach(cell => cell.textContent ="");

    GameRunning = true;
    // IntializeGame();
}
