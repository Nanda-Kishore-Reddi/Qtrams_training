function knightMoves(start, target) {
    const moves = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
  
    const isWithinBounds = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;
  
    const queue = [[start, [start]]];
    const visited = new Set();
    visited.add(start.toString());
  
    while (queue.length > 0) {
      const [current, path] = queue.shift();
  
      if (current[0] === target[0] && current[1] === target[1]) {
        return path;
      }
  
      for (const [dx, dy] of moves) {
        const next = [current[0] + dx, current[1] + dy];
  
        if (isWithinBounds(next) && !visited.has(next.toString())) {
          visited.add(next.toString());
          queue.push([next, [...path, next]]);
        }
      }
    }
  
    return [];
  }
  
  const board = document.getElementById('board');
  const resultDiv = document.getElementById('result');
  const yAxis = document.getElementById('y-axis');
  const xAxis = document.getElementById('x-axis');
  
  function createBoard() {
    board.innerHTML = '';
    yAxis.innerHTML = '';
    xAxis.innerHTML = '';
  
    for (let i = 0; i < 8; i++) {
      const yLabel = document.createElement('div');
      yLabel.textContent = 7 - i;
      yAxis.appendChild(yLabel);
  
      const xLabel = document.createElement('div');
      xLabel.textContent = i;
      xAxis.appendChild(xLabel);
    }
  
    for (let i = 7; i >= 0; i--) {
      for (let j = 0; j < 8; j++) {
        const cell = document.createElement('div');
        const isWhite = (i + j) % 2 === 0;
        cell.className = 'cell';
        cell.dataset.color = isWhite ? 'white' : 'black';
        cell.dataset.position = `${i},${j}`;
        board.appendChild(cell);
      }
    }
  }
  
  function highlightPath(path) {
    createBoard();
    path.forEach(([x, y], index) => {
      const cell = board.querySelector(`[data-position="${x},${y}"]`);
      if (cell) {
        if (index === 0) {
          cell.classList.add('start'); 
        } else if (index === path.length - 1) {
          cell.classList.add('target'); 
        } else {
          cell.classList.add('highlight'); 
        }
        cell.textContent = `[${x},${y}]`;
      }
    });
  }
  
  document.getElementById('knightForm').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const startX = parseInt(document.getElementById('startX').value, 10);
    const startY = parseInt(document.getElementById('startY').value, 10);
    const targetX = parseInt(document.getElementById('targetX').value, 10);
    const targetY = parseInt(document.getElementById('targetY').value, 10);
  
    const path = knightMoves([startY, startX], [targetY, targetX]); 
  
    if (path.length > 0) {
      resultDiv.innerHTML = `<p>You made it in ${path.length - 1} moves! Here's your path:</p>`;
      resultDiv.innerHTML += path.map(pos => `[${pos[1]}, ${pos[0]}]`).join(' → ');
      highlightPath(path);
    } else {
      resultDiv.innerHTML = `<p>No valid path found!</p>`;
    }
  });
  
  createBoard();
  
  
   
  