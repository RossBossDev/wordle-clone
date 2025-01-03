declare module 'urban' {
    export function random(): {
        first(callback: (json: { definition: string; word: string }) => void): void;
    };
}
