import { LetterGrid } from '@/components/letter-grid';
import { useState } from 'react';
import GuessForm from '~/components/guess-form';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}) {
    return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Index() {
    const [guesses, setGuesses] = useState<string[]>([]);

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 text-slate-900">Ross' Wordle</h1>
            <LetterGrid size={5} maxGuesses={6} guesses={['GOLF', 'CAT']} />
            <GuessForm />
        </div>
    );
}
