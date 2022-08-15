import { CSSProperties, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "styled-components";
import DropdownMenu from "../DropdownMenu";
import { Ellipsis } from "../Ellipsis";

import { ButtonLevel, Container, ItemButton } from "./styles";

interface GameHeaderProps {
  leftContent?: ReactNode;
  level: GameLevel;
  GameMode: string;
  setLevel: (level: SetStateAction<GameLevel>) => void;
  setStart?: (start: SetStateAction<boolean>) => void;
}

export type GameLevel = 'easy' | 'medium' | 'hard';

type NameLevel = 'Fácil' | 'Médio' | 'Difícil';

type ItemsProps = {
  name: NameLevel;
  level: GameLevel;
}

function GameHeader({ leftContent, level, setLevel, GameMode, setStart }: GameHeaderProps) {
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [hideLevel, setHideLevel] = useState<boolean>(false);
  const { colors } = useContext(ThemeContext);

  const containerStyle = useMemo<CSSProperties>(() => ({
    justifyContent: leftContent ? "space-between" : "flex-end",
  }), [leftContent]);

  let nameLevel: NameLevel;
  switch (level){
    case 'easy':
      nameLevel = "Fácil";
      break;
    case 'medium':
      nameLevel = "Médio";
      break;
    case 'hard':
      nameLevel = "Difícil";
      break;
  }

  const items: ItemsProps[]  = [
    {
      name: 'Fácil',
      level: 'easy'
    },
    {
      name: 'Médio',
      level: 'medium'
    },
    {
      name: 'Difícil',
      level: 'hard'
    },
  ];

  const focusButtonStyle = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.darker,
  }), [colors.darker]);

  const handleItemClick = (level: GameLevel) => {
    setDropdownMenuOpen(false);
    setLevel(level);
    setStart && setStart(false);
    localStorage.setItem(GameMode, JSON.stringify(level));
  }

  const handleButtonClick = () => {
    setDropdownMenuOpen(!isDropdownMenuOpen);
    setHideLevel(true);
  }

  useEffect(() => {
    if(!isDropdownMenuOpen){
      setTimeout(() => {
        setHideLevel(false)
      }, 500)
    }
  }, [isDropdownMenuOpen])

  const menuItems = () => {
    const rows = items.map((item, index) => (
      <ItemButton key={index} onClick={() => handleItemClick(item.level)}>
        {item.name}
      </ItemButton>
    ));

    return rows;
  }

  return(
    <Container style={containerStyle}>
      {leftContent}
      <DropdownMenu
        menuItems={menuItems()}
        navWidth={170}
        isOpen={isDropdownMenuOpen}
        setOpen={setDropdownMenuOpen}
      >
        <ButtonLevel 
          onClick={handleButtonClick} 
          style={hideLevel ? focusButtonStyle : undefined}
        >
          {hideLevel ? <Ellipsis /> : nameLevel }
        </ButtonLevel>
      </DropdownMenu>
    </Container>
  );
}

export default GameHeader;