const gameCells = document.querySelectorAll(".gameBoard > div");

function main() {
    player = "x";
    for (const gameCell of gameCells) {
        gameCell.addEventListener("click", (e) => {
            if (e.target.getAttribute("class") === "empty") {
                const marker = document.createElement("img");
                const markerSrc = getMarkerSrc(player);
                marker.setAttribute("src", markerSrc);
                gameCell.appendChild(marker);
                e.target.setAttribute("class", "filled");
                player = changePlayer(player);
            }
        })
    }
}

function changePlayer(player) {
    return (player === "x")? "o": "x";
}

function getMarkerSrc(player) {
    return (player === "x")? "images/x.png": "images/o.png";
}

main();
