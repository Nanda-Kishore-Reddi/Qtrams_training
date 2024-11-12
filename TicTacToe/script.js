var Gameboard = (function() {
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
            [0, 4, 8], [2, 4, 6]             
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

        if (board.every(function(spot) { return spot !== null; })) {
            return 'tie';
        }

        return null;
    }

    function reset() {
        board.fill(null);
    }

    return {
        board: board,
        updateSpot: updateSpot,
        checkWinner: checkWinner,
        reset: reset
    };
})();

function Player(name, marker) {
    return {
        name: name,
        marker: marker
    };
}

var GameController = (function() {
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
            (function(index) {
                cell.addEventListener('click', function() {
                    makeMove(index);
                });
            })(i);
            boardElement.appendChild(cell);
        }
    }

    function renderStatus(message) {
        document.getElementById('status').textContent = message;
    }

    function resetGame() {
        gameOver = false;
        startGame(player1.name, player2.name);
    }

    return {
        startGame: startGame,
        resetGame: resetGame
    };
})();

document.getElementById('startGameButton').addEventListener('click', function() {
    var player1Name = document.getElementById('player1Name').value || 'Player 1';
    var player2Name = document.getElementById('player2Name').value || 'Player 2';
    GameController.startGame(player1Name, player2Name);
});
