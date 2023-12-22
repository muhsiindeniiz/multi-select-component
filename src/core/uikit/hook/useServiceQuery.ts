import { useQuery } from 'react-query';

const fetchCharacters = async (query: string) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://rickandmortyapi.com/api';
    const response = await fetch(`${baseUrl}/character/?name=${query}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.results || [];
};

export const useCharactersQuery = (query: string) => {
    return useQuery(['rickAndMorty', query], () => fetchCharacters(query), {
        enabled: query.length > 0
    });
};