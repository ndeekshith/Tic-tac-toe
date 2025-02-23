const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
let board = ["", "", "", "", "", "", "", "", ""]; // Represents the game board
let currentPlayer = "X";
let gameActive = true;
let winner = null;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (!gameActive || board[clickedCellIndex] !== "") {
        return; // Cell already clicked or game over
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class 'x' or 'o' for styling

    checkGameResult();
}

function checkGameResult() {
    winner = checkWin();
    if (winner) {
        gameActive = false;
        highlightWinningCells(winner.winningLine);
        messageDisplay.textContent = `Player ${winner.player} wins!`;
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        messageDisplay.textContent = "It's a draw!";
        return;
    }

    switchPlayer();
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { player: board[a], winningLine: winningConditions[i] }; // Return winner and winning line
        }
    }
    return null; // No win yet
}

function checkDraw() {
    return !board.includes("") && !winner;
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(winningLine) {
    winningLine.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    messageDisplay.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'winner'); // Remove classes for styling
    });
    winner = null;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Initialize game state (optional, but good practice to start with initial message)
resetGame();