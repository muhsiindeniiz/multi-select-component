interface Character {
    id: number;
    name: string;
    image: string;
    episode: string[];
}

export interface CharacterResponse {
  results: Character[];
}