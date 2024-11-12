(function() {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const chooseX = document.getElementById('chooseX');
    const chooseO = document.getElementById('chooseO');
    const twoPlayerMode = document.getElementById('twoPlayerMode');
    
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let userSymbol = 'X';
    let gameActive = false;
    let isTwoPlayerMode = false;

    // Initialize event listeners for game setup
    chooseX.addEventListener('click', () => startGame('X'));
    chooseO.addEventListener('click', () => startGame('O'));
    twoPlayerMode.addEventListener('change', () => isTwoPlayerMode = twoPlayerMode.checked);

    // Start the game with the chosen symbol
    function startGame(symbol) {
        userSymbol = symbol;
        currentPlayer = 'X';
        board = Array(9).fill(null);
        gameActive = true;
        statusText.textContent = `Turn: ${currentPlayer}`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled');
        });
    }

    // Handle cell click events
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');
        
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `Winner: ${currentPlayer}`;
            gameActive = false;
            disableBoard();
            return;
        }

        if (!board.includes(null)) {
            statusText.textContent = 'Draw!';
            gameActive = false;
            disableBoard();
            return;
        }

        // Switch player or, in single-player, switch to computer's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isTwoPlayerMode) {
            statusText.textContent = `Turn: ${currentPlayer}`;
        } else {
            if (currentPlayer !== userSymbol) {
                setTimeout(computerMove, 500); // Delay for computer move
            } else {
                statusText.textContent = `Turn: ${currentPlayer}`;
            }
        }
    }

    // Disable board after game ends
    function disableBoard() {
        cells.forEach(cell => cell.classList.add('disabled'));
    }

    // Check if there is a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    // Simple AI move for single-player mode
    function computerMove() {
        const emptyCells = board.map((cell, idx) => cell === null ? idx : null).filter(idx => idx !== null);
        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomMove] = currentPlayer;
        cells[randomMove].textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `Winner: ${currentPlayer}`;
            gameActive = false;
            disableBoard();
            return;
        }

        if (!board.includes(null)) {
            statusText.textContent = 'Draw!';
            gameActive = false;
            disableBoard();
            return;
        }

        currentPlayer = userSymbol;
        statusText.textContent = `Turn: ${currentPlayer}`;
    }
})();
