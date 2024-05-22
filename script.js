document.addEventListener('DOMContentLoaded', () => {
    drawChessBoard();

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            clearHighlights();
            getHorseSteps(square);
        });
    });
});

function drawChessBoard() {
    const chessboard = document.getElementById('chessboard');
    const letters = 'ABCDEFGH';
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = i;
            square.dataset.col = j;
            square.dataset.position = letters[j] + (8 - i);
            chessboard.appendChild(square);
        }
    }
}

function getHorseSteps(square) {
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    
    knightMoves.forEach(step => {
        const newRow = row + step[0];
        const newCol = col + step[1];
        if (isValidMove(newRow, newCol)) {
            const targetSquare = document.querySelector(`.square[data-row="${newRow}"][data-col="${newCol}"]`);
            if (targetSquare) {
                targetSquare.classList.add('clicked');
            }
        }
    });
}

function isValidMove(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function clearHighlights() {
    const highlightedSquares = document.querySelectorAll('.square.clicked');
    highlightedSquares.forEach(square => {
        square.classList.remove('clicked');
    });
}
