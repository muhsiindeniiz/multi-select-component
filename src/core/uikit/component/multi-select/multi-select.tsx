import React, { useState, useRef, useEffect } from "react";
import { Character, MultiSelectProps } from "./multi-select.type";
import styles from "../../asset/style/MultiSelect.module.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import SelectedCharacter from "./components/selected-character";
import CharacterList from "./components/character-list";

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedFocusedIndex, setSelectedFocusedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.keyCode) {
        case 40:
          setFocusedIndex((prevIndex) =>
            Math.min(prevIndex + 1, options.length - 1)
          );
          break;
        case 38:
          setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case 39:
          setSelectedFocusedIndex((prevIndex) =>
            Math.min(prevIndex + 1, selectedCharacters.length - 1)
          );
          break;
        case 37:
          setSelectedFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case 13:
          if (isOpen && focusedIndex !== -1) {
            handleSelect(options[focusedIndex]);
          }
          break;
        case 46:
          if (selectedFocusedIndex !== -1) {
            handleDeselect(selectedCharacters[selectedFocusedIndex].id);
          }
          break;
      }

      if (
        event.keyCode === 46 &&
        isInputFocused &&
        selectedCharacters.length > 0
      ) {
        const lastSelectedCharacter =
          selectedCharacters[selectedCharacters.length - 1];
        handleDeselect(lastSelectedCharacter.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, selectedFocusedIndex, options, selectedCharacters]);

  useEffect(() => {
    onChange(selectedCharacters);
  }, [selectedCharacters, onChange]);

  const handleSelect = (character: Character) => {
    setSelectedCharacters((prevSelected) => {
      const newSelectedCharacters = prevSelected.some(
        (c) => c.id === character.id
      )
        ? prevSelected.filter((c) => c.id !== character.id)
        : [...prevSelected, character];

      onChange(newSelectedCharacters);
      return newSelectedCharacters;
    });
  };

  const handleDeselect = (id: number) => {
    setSelectedCharacters((prevSelected) => {
      const newSelectedCharacters = prevSelected.filter(
        (character) => character.id !== id
      );

      onChange(newSelectedCharacters);
      return newSelectedCharacters;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const highlight = (text: string, query: string): JSX.Element[] => {
    if (!query) return [<span key="text">{text}</span>];
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={index} className={styles.highlight}>
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className={styles.multiSelectContainer} ref={wrapperRef}>
      <div className={styles.selectBox} onClick={toggleDropdown}>
        {selectedCharacters.map((character) => (
          <SelectedCharacter
            key={character.id}
            character={character}
            onDeselect={handleDeselect}
          />
        ))}
        <input
          className={styles.multiSelectInput}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className={styles.dropdownIcon}>
          {isOpen ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        </div>
      </div>
      {isOpen &&
        (options.length > 0 ? (
          <CharacterList
            characters={options}
            onSelectionChange={handleSelect}
            selectedCharacters={selectedCharacters}
            highlight={highlight}
            query={query}
            isFocused={focusedIndex}
          />
        ) : (
          <div className={styles.noResults}>No characters found</div>
        ))}
    </div>
  );
};

export default MultiSelect;
