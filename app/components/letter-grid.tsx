import { cn } from '@/lib/utils';
import React from 'react';

interface LetterGridProps {
    size: number;
    cellSize?: number;
    guesses: string[];
    maxGuesses: number;
    secretWord: string;
}

interface Cell {
    letter: string;
    status: 'correct' | 'incorrect' | 'present' | 'absent';
}

export function LetterGrid({ size, cellSize = 50, guesses, maxGuesses, secretWord }: LetterGridProps) {
    const grid: Cell[] = React.useMemo(() => {
        // Create an array of empty strings to fill remaining guesses
        const emptyGuesses = Array(maxGuesses - guesses.length).fill('');

        // Combine actual guesses with empty guesses to fill the grid
        const paddedGuesses = [...guesses, ...emptyGuesses];

        return paddedGuesses.map((guess) => {
            // Process each guess into an array of Cell objects

            // 1. First, ensure the guess isn't longer than the grid size
            const truncatedGuess = guess.slice(0, size);

            // 2. Pad shorter guesses with spaces to match grid size
            const paddedGuess = truncatedGuess.padEnd(size, ' ');

            // 3. Convert the string into an array of characters
            const letters = paddedGuess.split('');

            // 4. Transform each letter into a Cell object
            return letters.map((letter: string, index: number) => {
                const isLetterInSecretWord = secretWord.includes(letter);
                const isLetterInCorrectPosition = secretWord[index] === letter;

                let status = 'absent';

                if (isLetterInCorrectPosition) {
                    status = 'correct';
                } else if (isLetterInSecretWord) {
                    status = 'present';
                } else if (letter.trim()) {
                    status = 'incorrect';
                }

                return {
                    letter,
                    status,
                };
            });
        });
    }, [guesses, size, maxGuesses, secretWord]);

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
                        cell.status === 'incorrect' && 'bg-slate-500',
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
