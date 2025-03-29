const sudokuGrid = document.getElementById('sudoku-grid');
const message = document.getElementById('message');


const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];


function createGrid() {
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = 1;
            cell.classList.add('cell');

            if (puzzle[i][j] !== 0) {
                cell.value = puzzle[i][j];
                cell.disabled = true; 
                cell.classList.add('grid-line');
            }

            
            if (j % 3 === 0 && j !== 0) {
                cell.style.borderLeft = '2px solid #000';
            }
            if (i % 3 === 0 && i !== 0) {
                cell.style.borderTop = '2px solid #000';
            }

            sudokuGrid.appendChild(cell);
        }
    }
}


function checkSolution() {
    const cells = document.querySelectorAll('.cell');
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        grid[row][col] = parseInt(cell.value) || 0;
    });

    if (isValidSudoku(grid)) {
        message.textContent = '✅ Congratulations! Sudoku Solved!';
    } else {
        message.textContent = '❌ Incorrect solution. Try again!';
    }
}


function isValidSudoku(board) {
    for (let i = 0; i < 9; i++) {
        if (!isValidRow(board, i) || !isValidColumn(board, i) || !isValidBox(board, i)) {
            return false;
        }
    }
    return true;
}

function isValidRow(board, row) {
    const seen = new Set();
    for (let num of board[row]) {
        if (num !== 0 && seen.has(num)) return false;
        seen.add(num);
    }
    return true;
}

function isValidColumn(board, col) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
        const num = board[row][col];
        if (num !== 0 && seen.has(num)) return false;
        seen.add(num);
    }
    return true;
}

function isValidBox(board, box) {
    const seen = new Set();
    const startRow = Math.floor(box / 3) * 3;
    const startCol = (box % 3) * 3;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const num = board[startRow + r][startCol + c];
            if (num !== 0 && seen.has(num)) return false;
            seen.add(num);
        }
    }
    return true;
}

createGrid();
