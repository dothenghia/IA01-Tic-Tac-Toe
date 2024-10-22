import React from 'react';

export interface HistoryEntry {
  squares: (string | null)[];
  location: { row: number; col: number } | null;
}

interface HistoryProps {
  history: HistoryEntry[];
  currentMove: number;
  isAscending: boolean;
  onJumpTo: (move: number) => void;
  onToggleOrder: () => void;
}

export function History({ history, currentMove, isAscending, onJumpTo, onToggleOrder }: HistoryProps) {
  const moves = history.map((step, move) => {
    let description: string;
    if (move > 0) {
      description = `Go to move #${move} (${step.location!.row}, ${step.location!.col})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <React.Fragment key={move}>
        {move === currentMove ? (
          <p className='p-3 mb-3 rounded-2xl w-full border-boardColor border-4 bg-boardColor text-center'>
            You are at move #{move} {step.location ? `(${step.location.row}, ${step.location.col})` : ''}
          </p>
        ) : (
          <button
            className='p-3 mb-3 rounded-2xl w-full border-boardColor border-4 bg-backgroundColor hover:bg-hoverColor'
            onClick={() => onJumpTo(move)}
          >
            {description}
          </button>
        )}
      </React.Fragment>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className='mx-auto lg:mx-0 w-full max-w-96 md:max-w-none md:w-full lg:w-96 flex flex-col justify-start items-end'>
      <button
        className='px-5 py-3 hover:bg-slate-200/60 rounded-2xl mb-2 flex items-center justify-between gap-2'
        onClick={onToggleOrder}>
        {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4" />
        </svg>
      </button>
      <div className='w-full'>{moves}</div>
    </div>
  );
}
