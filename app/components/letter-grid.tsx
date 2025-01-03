import { cn } from '@/lib/utils';
import React from 'react';

interface LetterGridProps {
    size: number;
    cellSize?: number;
    guesses: string[];
    maxGuesses: number;
}

interface Cell {
    letter: string;
    status: 'correct' | 'incorrect' | 'present' | 'absent';
}

export function LetterGrid({ size, cellSize = 50, guesses, maxGuesses }: LetterGridProps) {
    const grid: Cell[] = React.useMemo(() => {
        const paddedGuesses = [...guesses, ...Array(maxGuesses - guesses.length).fill('')];

        return paddedGuesses.map((guess) =>
            guess
                .slice(0, size)
                .padEnd(size, ' ')
                .split('')
                .map((letter: string) => ({ letter, status: !letter.trim() ? 'absent' : 'correct' })),
        );
    }, [guesses, size, maxGuesses]);

    return (
        <div
            className="grid gap-1 bg-slate-100 p-2 rounded-lg shadow-lg"
            style={{
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                width: `${size * (cellSize + 8)}px`,
                height: `${maxGuesses * (cellSize + 8)}px`,
            }}
        >
            {grid.flat().map((cell, index) => (
                <div
                    key={`grid-item-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                    }`}
                    className={cn(
                        'flex items-center justify-center bg-slate-200 rounded-md shadow',
                        'text-2xl font-bold text-slate-900',
                        cell.status === 'correct' && 'bg-green-500',
                        cell.status === 'incorrect' && 'bg-red-500',
                        cell.status === 'present' && 'bg-yellow-500',
                        cell.status === 'absent' && 'bg-slate-200',
                    )}
                    style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                    aria-label={`Letter ${cell.letter}`}
                >
                    {cell.letter}
                </div>
            ))}
        </div>
    );
}
