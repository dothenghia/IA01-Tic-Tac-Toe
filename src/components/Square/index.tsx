interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinning: boolean;
  className?: string;
}

export function Square({ value, onSquareClick, isWinning, className }: SquareProps) {
  return (
    <button
      className={`flex-1 bg-backgroundColor border-4 border-boardColor hover:bg-hoverColor
                 text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${value === 'X' ? 'text-playerXColor' : 'text-playerOColor'}
                   ${isWinning ? '!bg-winColor' : ''}
                   ${className || ''}
                   `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
