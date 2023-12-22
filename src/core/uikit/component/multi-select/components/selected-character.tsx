import React from "react";
import { Character } from "../multi-select.type";
import styles from "../../../asset/style/MultiSelect.module.css";
import { IoCloseSharp } from "react-icons/io5";

interface SelectedCharacterProps {
  character: Character;
  onDeselect: (id: number) => void;
}

const SelectedCharacter: React.FC<SelectedCharacterProps> = ({
  character,
  onDeselect,
}) => {
  return (
    <div className={styles.selectedItem}>
      {character.name}
      <IoCloseSharp onClick={() => onDeselect(character.id)} />
    </div>
  );
};

export default SelectedCharacter;
