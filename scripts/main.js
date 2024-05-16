const gameBoard = document.querySelector(".gameBoard");
const gameTable = [];
const result = document.querySelector(".result");

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

function main() {
    player = "x";
    for (const gameRow of gameTable) {
        for (const gameCell of gameRow) {
            gameCell.addEventListener("click", (e) => {
                if (e.target.getAttribute("class") === "empty") {
                    // make player move
                    const marker = document.createElement("img");
                    const markerSrc = getMarkerSrc(player);
                    marker.setAttribute("src", markerSrc);
                    gameCell.appendChild(marker);
                    e.target.setAttribute("class", player);
                    if (isWin(player)) {
                        result.textContent = `${player} wins the game!`;
                        return;
                    }
                    player = changePlayer(player);

                    // make a random move by the computer
                    makeRandomMove(player);
                    player = changePlayer(player);
                }
            });
        }
    }
}

function makeRandomMove (player) {
    // make an array of empty cells
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameTable[i][j].getAttribute("class") === "empty") {
                emptyCells.push(gameTable[i][j]);
            }
        }
    }
    console.log(emptyCells);
    // choose a random cell from empty cells
    const rndNum = Math.floor(Math.random() * emptyCells.length);
    console.log(rndNum);
    const gameCell = emptyCells[rndNum];
    const marker = document.createElement("img");
    const markerSrc = getMarkerSrc(player);
    marker.setAttribute("src", markerSrc);
    gameCell.appendChild(marker);
    gameCell.setAttribute("class", player);
    if (isWin(player)) {
        result.textContent = `${player} wins the game!`;
    }
} 

function isWin(player) {
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

function changePlayer(player) {
    return (player === "x")? "o": "x";
}

function getMarkerSrc(player) {
    return (player === "x")? "images/x.png": "images/o.png";
}

main();
