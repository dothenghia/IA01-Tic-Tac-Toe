import { Square } from '../Square';
import { useCalculate } from '../../hooks/useCalculate';

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[], i: number) => void;
}

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (useCalculate(squares).winner || squares[i]) {
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

  const winInfo = useCalculate(squares);
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
    <div className='px-6 w-full mt-6 flex flex-col items-center lg:items-end'>
      <div className='w-full max-w-96 sm:max-w-none sm:w-96 md:w-96 lg:w-[420px] xl:w-[420px]'>
        <div className="text-center w-full text-2xl md:text-3xl font-semibold text-headerColor">{status}</div>
        <div className='mt-4 md:mt-6 w-full aspect-square
        bg-boardColor border-4 border-boardColor rounded-3xl overflow-hidden flex flex-col justify-center items-center'>
          {boardRows}
        </div>
      </div>
    </div>
  );
}
