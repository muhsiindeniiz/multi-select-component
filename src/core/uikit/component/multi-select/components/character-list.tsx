import React from "react";
import { Character } from "../multi-select.type";
import styles from "../../../asset/style/MultiSelect.module.css";

interface CharacterListProps {
  characters: Character[];
  onSelectionChange: (character: Character) => void;
  selectedCharacters: Character[];
  highlight: (text: string, query: string) => JSX.Element[];
  query: string;
  isFocused: number;
}

const CharacterListItem: React.FC<{
  character: Character;
  isSelected: boolean;
  onSelectionChange: () => void;
  highlight: (text: string, query: string) => JSX.Element[];
  query: string;
  isActive: boolean;
}> = ({
  character,
  isSelected,
  onSelectionChange,
  highlight,
  query,
  isActive,
}) => {
  return (
    <li
      className={`${styles.searchItem} ${
        isActive ? styles.searchItemActive : ""
      }`}
      onClick={onSelectionChange}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelectionChange}
      />
      <img src={character.image} alt={character.name} />
      <span className={styles.searchItemName}>
        {highlight(character.name, query)}
      </span>
    </li>
  );
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onSelectionChange,
  selectedCharacters,
  highlight,
  query,
  isFocused,
}) => {
  return (
    <ul className={styles.searchResults}>
      {characters.map((character, index) => (
        <CharacterListItem
          key={character.id}
          character={character}
          isSelected={selectedCharacters.some((c) => c.id === character.id)}
          onSelectionChange={() => onSelectionChange(character)}
          highlight={highlight}
          query={query}
          isActive={index === isFocused}
        />
      ))}
    </ul>
  );
};

export default CharacterList;
