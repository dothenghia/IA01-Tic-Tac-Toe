import { useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinning: boolean;
  className?: string;
}

function Square({ value, onSquareClick, isWinning, className }: SquareProps) {
  return (
    <button
      className={`flex-1 bg-backgroundColor border-4 border-boardColor hover:bg-hoverColor
                  text-2xl ${value === 'X'? 'text-playerXColor' : 'text-playerOColor'}
                   ${isWinning ? '!bg-winColor' : ''}
                   ${className || ''}
                   `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[], i: number) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winInfo = calculateWinner(squares);
  const winner = winInfo.winner;
  const winLine = winInfo.line;

  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const i = row * 3 + col;
      let cornerClass = '';
      if (i === 0) cornerClass = 'rounded-tl-3xl';
      if (i === 2) cornerClass = 'rounded-tr-3xl';
      if (i === 6) cornerClass = 'rounded-bl-3xl';
      if (i === 8) cornerClass = 'rounded-br-3xl';

      squaresInRow.push(
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={winLine ? winLine.includes(i) : false}
          className={cornerClass}
        />
      );
    }
    boardRows.push(<div key={row} className="w-full h-1/3 flex">{squaresInRow}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className='w-80 h-80 bg-boardColor border-4 border-boardColor rounded-3xl overflow-hidden flex flex-col justify-center items-center'>
        {boardRows}
      </div>
    </>
  );
}

interface HistoryEntry {
  squares: (string | null)[];
  location: { row: number; col: number } | null;
}

export default function Game() {
  const [history, setHistory] = useState<HistoryEntry[]>([{ squares: Array(9).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares: (string | null)[], i: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), {
      squares: nextSquares,
      location: {
        row: Math.floor(i / 3) + 1,
        col: (i % 3) + 1
      }
    }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    let description: string;
    if (move > 0) {
      description = `Go to move #${move} (${step.location!.row}, ${step.location!.col})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

interface WinInfo {
  winner: string | null;
  line: number[] | null;
}

function calculateWinner(squares: (string | null)[]): WinInfo {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}
