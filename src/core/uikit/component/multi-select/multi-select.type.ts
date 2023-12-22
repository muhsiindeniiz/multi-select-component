import { PropsWithChildren } from 'react';

export interface Character {
    id: number;
    name: string;
    image: string;
    episode: string[];
}

export type MultiSelectProps = PropsWithChildren & {
    options: Character[];
    onChange: (selectedCharacters: Character[]) => void;
};
