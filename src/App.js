import { useState } from "react";

function Square({ value, squareClick }) {

  return <button className='square' onClick={squareClick}>{value}</button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [history, setHistory] = useState(Array(0));

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setHistory(Array(0));
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = player;

    const nextHistory = history.slice();
    nextHistory.push(nextSquares.concat());

    for (let k = 0; k < nextHistory.length; k++) {

      for (let l = 0; l < nextHistory[k].length; l++) {
        if (!nextHistory[k][l])
          nextHistory[k][l] = ' ';
      }

    }

    
      setSquares(nextSquares);
      setHistory(nextHistory);
      console.log(nextHistory);

      if (player == 'X')
        setPlayer('O');

      else
        setPlayer('X');
    
  }


  const winner = calculateWinner(squares);
  let status;
  if (winner)
    status = 'Winner: ' + winner;
  else
    status = 'Next up: ' + player;

  return <div>


    <div className="status">{status}</div>
    <div><button onClick={resetBoard}>Reset</button></div>
    <div className='board-row'>
      <Square squareClick={() => handleClick(0)} value={squares[0]} />
      <Square squareClick={() => handleClick(1)} value={squares[1]} />
      <Square squareClick={() => handleClick(2)} value={squares[2]} />
    </div>

    <div className='board-row'>
      <Square squareClick={() => handleClick(3)} value={squares[3]} />
      <Square squareClick={() => handleClick(4)} value={squares[4]} />
      <Square squareClick={() => handleClick(5)} value={squares[5]} />
    </div>

    <div className='board-row'>
      <Square squareClick={() => handleClick(6)} value={squares[6]} />
      <Square squareClick={() => handleClick(7)} value={squares[7]} />
      <Square squareClick={() => handleClick(8)} value={squares[8]} />
    </div>

    <div>
      History:
      {history.map((arr, index) => (
        <div className="history-group">
        <div key={index} className="three-rows-container">
          
          {arr.map((value, subIndex) => (
            <span key={subIndex} className="history-cell">{value}</span>
          ))}
          </div>
        </div>
      ))}
    </div>

  </div>
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}