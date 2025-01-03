import { LetterGrid } from '@/components/letter-grid';
import { useState } from 'react';
import urban from 'urban';
import GuessForm from '~/components/guess-form';
import type { Route } from './+types/home';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}) {
    return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

const getSecretWord = async () => {
    return await new Promise<string>((resolve) => {
        urban.random().first((json) => {
            const word = json.word.toUpperCase();
            resolve(word);
        });
    });
};

export async function loader({ params }: Route.LoaderArgs) {
    let secretWord = await getSecretWord();

    while (!/^[a-zA-Z]+$/.test(secretWord)) {
        secretWord = await getSecretWord();
    }

    return { secretWord };
}

export default function Index({ loaderData }: Route.LoaderArgs) {
    const [guesses, setGuesses] = useState<string[]>([]);

    const handleSubmit = (data: { guess: string }) => {
        setGuesses((prev) => [...prev, data.guess]);
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center w-full max-w-screen-sm mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-slate-900">Ross' Dirty Wordle</h1>
            <LetterGrid
                size={loaderData.secretWord.length}
                maxGuesses={6}
                guesses={guesses}
                secretWord={loaderData.secretWord}
            />
            <GuessForm size={loaderData.secretWord.length} onSubmit={handleSubmit} />
        </div>
    );
}
