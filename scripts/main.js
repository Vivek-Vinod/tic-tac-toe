const gameBoard = document.querySelector(".gameBoard");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".header > button");
const radioBtns = document.querySelectorAll('.header input[type="radio"]');

let player = "x";
let level = "easy";
let computerMoveFunction = makeRandomMove;
let gameTable = [];

function initGame() {
    restartBtn.addEventListener("click", restartGame);
    for (const radioBtn of radioBtns) {
        radioBtn.addEventListener("change", (e) => {
            level = e.target.value;
            if (level === "easy") {
                computerMoveFunction = makeRandomMove;
            } else if (level === "medium") {
                computerMoveFunction = makeMediumMove;
            } else if (level === "hard") {
                computerMoveFunction = makeHardMove;
            } else {
                computerMoveFunction = makeRandomMove;
            }
            restartGame();
        });
    }
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 3; i++) {
        const gameRow = [];
        for (let j = 0; j < 3; j++) {
            const gameCell = document.createElement("div");
            gameCell.setAttribute("class", "empty");
            gameBoard.appendChild(gameCell);
            gameRow.push(gameCell);
        }
        gameTable.push(gameRow);
    }
    for (const gameRow of gameTable) {
        for (const gameCell of gameRow) {
            gameCell.addEventListener("click", makeMove);
        }
    }
}

function restartGame() {
    for (const gameRow of gameTable) {
        for (const gameCell of gameRow) {
            gameBoard.removeChild(gameCell);
        }
    }
    result.textContent = "Tic tac toe";
    player = "x";
    gameTable = [];
    createBoard();
}

async function makeMove(e) {
    if (e.target.getAttribute("class") === "empty") {
        // make player move
        const marker = document.createElement("img");
        const markerSrc = getMarkerSrc();
        marker.setAttribute("src", markerSrc);
        e.target.appendChild(marker);
        e.target.setAttribute("class", player);
        if (isWin()) {
            result.textContent = "You won the game!";
            setGameOver();
            return;
        }
        if (isDraw()) {
            result.textContent = `Draw!`;
            setGameOver();
            return;
        }
        changePlayer();

        // wait 300 ms
        await new Promise(r => setTimeout(r, 300));
        // make a move by the computer
        computerMoveFunction();
        if (isWin()) {
            result.textContent = "Computer wins the game!";
            setGameOver();
            return;
        }
        if (isDraw()) {
            result.textContent = `Draw!`;
            setGameOver();
            return;
        }
        changePlayer();
    }
}

function setGameOver() {
    for (const gameRow of gameTable) {
        for (const gameCell of gameRow) {
            gameCell.removeEventListener("click", makeMove);
        }
    }
}

function makeHardMove() {
    // implemented using minimax algorithm
    // let current player be the max player
    let bestMove = [-1, -1];
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameTable[i][j].getAttribute("class") === "empty") {
                // make move
                gameTable[i][j].setAttribute("class", player);

                // evaluate
                let score;
                if (isWin()) {
                    score = 1;
                } else if (isDraw()) {
                    score = 0
                } else {
                    // call minimax with the min player
                    changePlayer();
                    score = miniMax(false);
                    changePlayer();
                }
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }

                // undo move
                gameTable[i][j].setAttribute("class", "empty");
            }
        }
    }
    // make the best move
    const gameCell = gameTable[bestMove[0]][bestMove[1]];
    const marker = document.createElement("img");
    const markerSrc = getMarkerSrc();
    marker.setAttribute("src", markerSrc);
    gameCell.appendChild(marker);
    gameCell.setAttribute("class", player);
}

function miniMax(isMaxPlayer) {
    if (isMaxPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameTable[i][j].getAttribute("class") === "empty") {
                    // make move
                    gameTable[i][j].setAttribute("class", player);
    
                    // evaluate
                    let score;
                    if (isWin()) {
                        score = 1;
                    } else if (isDraw()) {
                        score = 0
                    } else {
                        // call minimax with the min player
                        changePlayer();
                        score = miniMax(false);
                        changePlayer();
                    }
                    if (score > bestScore) {
                        bestScore = score;
                    }
    
                    // undo move
                    gameTable[i][j].setAttribute("class", "empty");
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameTable[i][j].getAttribute("class") === "empty") {
                    // make move
                    gameTable[i][j].setAttribute("class", player);
    
                    // evaluate
                    let score;
                    if (isWin()) {
                        score = -1;
                    } else if (isDraw()) {
                        score = 0
                    } else {
                        // call minimax with the min player
                        changePlayer();
                        score = miniMax(true);
                        changePlayer();
                    }
                    if (score < bestScore) {
                        bestScore = score;
                    }
    
                    // undo move
                    gameTable[i][j].setAttribute("class", "empty");
                }
            }
        }
        return bestScore;
    }
}

function makeMediumMove() {
    if (Math.floor(Math.random() * 1000) < 500) {
        makeRandomMove();
    } else {
        makeHardMove();
    }
}

function makeRandomMove() {
    // make an array of empty cells
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameTable[i][j].getAttribute("class") === "empty") {
                emptyCells.push(gameTable[i][j]);
            }
        }
    }
    // choose a random cell from empty cells
    const rndNum = Math.floor(Math.random() * emptyCells.length);
    const gameCell = emptyCells[rndNum];
    const marker = document.createElement("img");
    const markerSrc = getMarkerSrc();
    marker.setAttribute("src", markerSrc);
    gameCell.appendChild(marker);
    gameCell.setAttribute("class", player);
} 

function isWin() {
    for (let i = 0; i < 3; i++) {
        // check for win in row
        if (gameTable[i][0].getAttribute("class") === player && gameTable[i][1].getAttribute("class") === player && gameTable[i][2].getAttribute("class") === player) {
            return true;
        }
        // check for win in column
        if (gameTable[0][i].getAttribute("class") === player && gameTable[1][i].getAttribute("class") === player && gameTable[2][i].getAttribute("class") === player) {
            return true;
        }
    }

    // check for win in diagonals
    if (gameTable[0][0].getAttribute("class") === player && gameTable[1][1].getAttribute("class") === player && gameTable[2][2].getAttribute("class") === player) {
        return true;
    }
    if (gameTable[0][2].getAttribute("class") === player && gameTable[1][1].getAttribute("class") === player && gameTable[2][0].getAttribute("class") === player) {
        return true;
    }

    return false;
}

function isDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameTable[i][j].getAttribute("class") === "empty") {
                return false;
            }
        }
    }

    return true;
}

function changePlayer() {
    if (player === "x") {
        player = "o";
    } else {
        player = "x";
    }
}

function getMarkerSrc() {
    return (player === "x")? "images/x.png": "images/o.png";
}

initGame();
