import React, { useEffect, useState } from "react";
import MultiSelect from "../../../core/uikit/component/multi-select";
import { Character } from "../../../core/uikit/component/multi-select/multi-select.type";
import Loading from "../../../package/component/loading";
import { CharacterResponse } from "../type";
import style from '../../../module/landing-page/asset/Landing.module.css'

const LandingPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && data.results) {
        const transformedCharacters = transformCharacterData(data);
        setCharacters(transformedCharacters);
      } else {
        setError("No characters data found");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const transformCharacterData = (data: CharacterResponse) => {
    return data.results.map((char: Character) => ({
      id: char.id,
      name: char.name,
      image: char.image,
      episode: char.episode,
    }));
  };

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCharacterSelect = (characters: Character[]) => {
    console.log("Selected characters:", characters);
  };

  return (
    <div className={style.container}>
      <h3>Multi Select</h3>
      {loading && <Loading message="Loading Landing Page .." />}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <MultiSelect onChange={handleCharacterSelect} options={characters} />
      )}
    </div>
  );
};

export default LandingPage;
