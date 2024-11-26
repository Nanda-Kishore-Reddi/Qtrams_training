var Gameboard = (function () {
    var board = new Array(9).fill(null);

    function isSpotTaken(index) {
        return board[index] !== null;
    }

    function updateSpot(index, player) {
        if (!isSpotTaken(index)) {
            board[index] = player.marker;
            return true;
        }
        return false;
    }

    function checkWinner() {
        var winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (var i = 0; i < winningCombos.length; i++) {
            var combo = winningCombos[i];
            var a = combo[0];
            var b = combo[1];
            var c = combo[2];

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (board.every(function (spot) { return spot !== null; })) {
            return 'tie';
        }

        return null;
    }

    function reset() {
        board.fill(null);
    }

    function calculateProbabilities(board, currentPlayerMarker) {
        var winner = evaluateWinner(board);
        if (winner === 'X') return { xWin: 1, oWin: 0, draw: 0 };
        if (winner === 'O') return { xWin: 0, oWin: 1, draw: 0 };
        if (board.every(function (spot) { return spot !== null; })) return { xWin: 0, oWin: 0, draw: 1 };

        var availableMoves = board.reduce(function (acc, spot, index) {
            if (!spot) acc.push(index);
            return acc;
        }, []);

        var xWins = 0, oWins = 0, draws = 0;
        availableMoves.forEach(function (move) {
            var newBoard = board.slice();
            newBoard[move] = currentPlayerMarker;
            var nextPlayer = currentPlayerMarker === 'X' ? 'O' : 'X';
            var results = calculateProbabilities(newBoard, nextPlayer);
            xWins += results.xWin;
            oWins += results.oWin;
            draws += results.draw;
        });

        var totalOutcomes = availableMoves.length;
        return {
            xWin: xWins / totalOutcomes,
            oWin: oWins / totalOutcomes,
            draw: draws / totalOutcomes
        };
    }

    function evaluateWinner(board) {
        var winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (var i = 0; i < winningCombos.length; i++) {
            var [a, b, c] = winningCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    return {
        board: board,
        updateSpot: updateSpot,
        checkWinner: checkWinner,
        reset: reset,
        calculateProbabilities: calculateProbabilities
    };
})();

function Player(name, marker) {
    return {
        name: name,
        marker: marker
    };
}

var GameController = (function () {
    var currentPlayer;
    var player1;
    var player2;
    var gameOver = false;

    function startGame(p1Name, p2Name) {
        player1 = Player(p1Name, 'X');
        player2 = Player(p2Name, 'O');
        currentPlayer = player1;
        gameOver = false;
        Gameboard.reset();
        renderBoard();
        renderStatus("It's " + currentPlayer.name + "'s turn");
        // updateProbabilities();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function makeMove(index) {
        if (gameOver) return;

        if (Gameboard.updateSpot(index, currentPlayer)) {
            var winner = Gameboard.checkWinner();
            if (winner) {
                gameOver = true;
                if (winner === 'tie') {
                    renderStatus("It's a tie!");
                } else {
                    renderStatus(currentPlayer.name + " wins!");
                }
            } else {
                switchPlayer();
                renderStatus("It's " + currentPlayer.name + "'s turn");
                updateProbabilities();
            }
            renderBoard();
        }
    }

    function renderBoard() {
        var boardElement = document.getElementById('game');
        boardElement.innerHTML = '';
        for (var i = 0; i < Gameboard.board.length; i++) {
            var spot = Gameboard.board[i];
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = spot;
            if (spot) {
                cell.classList.add('disabled');
            }
            (function (index) {
                cell.addEventListener('click', function () {
                    makeMove(index);
                });
            })(i);
            boardElement.appendChild(cell);
        }
    }

    function renderStatus(message) {
        document.getElementById('status').textContent = message;
    }

    function updateProbabilities() {
        var probabilities = Gameboard.calculateProbabilities(Gameboard.board, currentPlayer.marker);
        var probabilitiesElement = document.getElementById('probabilities');
        probabilitiesElement.innerHTML = `
            <p>Player X Win %: ${(probabilities.xWin * 100).toFixed(2)}%</p>
            <p>Player O Win %: ${(probabilities.oWin * 100).toFixed(2)}%</p>
            <p>Draw %: ${(probabilities.draw * 100).toFixed(2)}%</p>
        `;
    }

    function resetProbabilities() {
        var probabilitiesElement = document.getElementById('probabilities');
        probabilitiesElement.innerHTML = `
            <p>Player X Win %: 0%</p>
            <p>Player O Win %: 0%</p>
            <p>Draw %: 0%</p>
        `;
    }

    function resetGame() {
        gameOver = false;
        startGame(player1.name, player2.name);
    }

    return {
        startGame: startGame,
        resetGame: resetGame,
        renderBoard: renderBoard,
        renderStatus: renderStatus,
        resetProbabilities: resetProbabilities
    };
})();

document.getElementById('startGameButton').addEventListener('click', function () {
    var player1Name = document.getElementById('player1Name').value || 'Player 1';
    var player2Name = document.getElementById('player2Name').value || 'Player 2';
    document.getElementById('gameContainer').style.height = "80%";
    document.getElementById('status').textContent = "";
    document.getElementById('game').style.display = "grid";
    document.getElementById('settings').style.display = "none";
    document.getElementById('controlButtons').style.display = "block";
    document.getElementById('probabilities').style.display = "block";
    GameController.resetProbabilities();
    GameController.startGame(player1Name, player2Name);
});

document.getElementById('resetButton').addEventListener('click', function () {
    GameController.resetProbabilities();
    GameController.resetGame();
});

document.getElementById('startNewGameButton').addEventListener('click', function () {
    document.getElementById('controlButtons').style.display = "none";
    document.getElementById('settings').style.display = "block";
    document.getElementById('status').textContent = "";
    document.getElementById('game').style.display = "none";
    document.getElementById('probabilities').style.display = "none";
});
