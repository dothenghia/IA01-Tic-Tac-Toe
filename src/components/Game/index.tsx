import { useState } from 'react';
import { Board } from '../Board';
import { History } from '../History';
import { HistoryEntry } from '../History';

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

  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  return (
    <div className="w-full flex-1 flex flex-col md:flex-row justify-start items-center md:items-start md:gap-8">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      <div className="w-full px-6 mt-8">
        <History 
          history={history}
          currentMove={currentMove}
          isAscending={isAscending}
          onJumpTo={jumpTo}
          onToggleOrder={toggleOrder}
        />
      </div>
    </div>
  );
}
