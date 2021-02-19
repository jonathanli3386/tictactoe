// HTML ELEMENTS
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// GAME VARIABLES
let gameIsLive = true; // true when someone hasn't won/tied yet
let xIsNext = true; // is false, then it's O's turn next
let winner = null;

// FUNCTIONS
const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMid = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const midLeft = cellDivs[3].classList[2];
    const midMid = cellDivs[4].classList[2];
    const midRight = cellDivs[5].classList[2];
    const botLeft = cellDivs[6].classList[2];
    const botMid = cellDivs[7].classList[2];
    const botRight = cellDivs[8].classList[2];

    let winner = null;

    // check if winner exists 
    if (topLeft && topLeft == topMid && topLeft == topRight) {
        // top row
        winner = topLeft;
    } else if (midLeft && midLeft == midMid && midLeft == midRight) {
        // mid row
        winner = midLeft;
    } else if (botLeft && botLeft == botMid && botLeft == botRight) {
        // bot row
        winner = botLeft;
    } else if (topLeft && topLeft == midLeft && topLeft == botLeft) {
        // left col
        winner = topLeft;
    } else if (topMid && topMid == midMid && topMid == botMid) {
        // mid col
        winner = topMid;
    } else if (topRight && topRight == midRight && topRight == botRight) {
        // right col
        winner = topRight;
    } else if (topLeft && topLeft == midMid && topLeft == botRight) {
        // downwards diagonal
        winner = topLeft;
    } else if (botLeft && botLeft == midMid && botLeft == topRight) {
        // upwards diagonal
        winner = botLeft;
    } else if (topLeft && topMid && topRight && midLeft && midMid && midRight && botLeft && botMid && botRight) {
        winner = 'tie';
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = 'x is next';
        } else {
            statusDiv.innerHTML = 'o is next';
        }

    }

    if (winner == 'tie') {
        // check if it's a tie 
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    }
    else if (winner != null) {
        // check for a winner
        gameIsLive = false;
        statusDiv.innerHTML = `${winner} has won!`;
    } else {
        // game continues
        return
    }
};

// EVENT HANDLERS
const handleReset = (e) => {
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = 'x is next';
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
    }
    winner = null;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    if (gameIsLive) {
        if (classList[2] == 'x' || classList[2] == 'o') {
            // invalid click since a player has already played in this square.
            return
        }
    
        if (xIsNext) {
            // x is about to play
            classList.add('x');
            // o has played
    
        } else {
            // o is about to play
            classList.add('o');
            // o has played
        }
        // next player plays
        checkGameStatus();
    }
}

// EVENT LISTENERS
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick);
}