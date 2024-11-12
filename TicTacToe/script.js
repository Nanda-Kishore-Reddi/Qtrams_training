(function() {
    var cells = document.querySelectorAll('.cell');
    var statusText = document.getElementById('status');
    var chooseX = document.getElementById('chooseX');
    var chooseO = document.getElementById('chooseO');
    var twoPlayerMode = document.getElementById('twoPlayerMode');
    
    var board = Array(9).fill(null);
    var currentPlayer = 'X';
    var userSymbol = 'X';
    var gameActive = false;
    var isTwoPlayerMode = false;

    chooseX.addEventListener('click', function() { startGame('X'); });
    chooseO.addEventListener('click', function() { startGame('O'); });
    twoPlayerMode.addEventListener('change', function() { isTwoPlayerMode = twoPlayerMode.checked; });

    function startGame(symbol) {
        userSymbol = symbol;
        currentPlayer = 'X';
        board = Array(9).fill(null);
        gameActive = true;
        statusText.textContent = 'Turn: ' + currentPlayer;
        
        Array.prototype.forEach.call(cells, function(cell) {
            cell.textContent = '';
            cell.classList.remove('disabled');
        });
        
        if (userSymbol === 'O' && !isTwoPlayerMode) {
            computerMove();
        }
    }

    Array.prototype.forEach.call(cells, function(cell) {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(event) {
        var cell = event.target;
        var index = cell.getAttribute('data-index');
        
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = 'Winner: ' + currentPlayer;
            gameActive = false;
            disableBoard();
            return;
        }

        if (board.indexOf(null) === -1) {
            statusText.textContent = 'Draw!';
            gameActive = false;
            disableBoard();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isTwoPlayerMode) {
            statusText.textContent = 'Turn: ' + currentPlayer;
        } else {
            if (currentPlayer !== userSymbol) {
                setTimeout(computerMove, 1000);
            } else {
                statusText.textContent = 'Turn: ' + currentPlayer;
            }
        }
    }

    function disableBoard() {
        Array.prototype.forEach.call(cells, function(cell) {
            cell.classList.add('disabled');
        });
    }

    function checkWinner() {
        var winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (var i = 0; i < winningCombinations.length; i++) {
            var a = winningCombinations[i][0];
            var b = winningCombinations[i][1];
            var c = winningCombinations[i][2];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function computerMove() {
        var emptyCells = [];
        for (var i = 0; i < board.length; i++) {
            if (board[i] === null) emptyCells.push(i);
        }
        var randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomMove] = currentPlayer;
        cells[randomMove].textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = 'Winner: ' + currentPlayer;
            gameActive = false;
            disableBoard();
            return;
        }

        if (board.indexOf(null) === -1) {
            statusText.textContent = 'Draw!';
            gameActive = false;
            disableBoard();
            return;
        }

        currentPlayer = userSymbol;
        statusText.textContent = 'Turn: ' + currentPlayer;
    }
})();
