import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "styled-components";
import DropdownMenu from "../DropdownMenu";
import { Ellipsis } from "../Ellipsis";
import GameInstructions from "../GameInstructions";

import { 
  Button, 
  Container, 
  Content,
  Subtitle, 
  Title, 
  TitleContainer 
} from "./styles";

interface HeaderProps {
  setIsInstructionModalOpen: (value: SetStateAction<boolean>) => void;
}

export function Header({ setIsInstructionModalOpen }: HeaderProps) {
  const { colors } = useContext(ThemeContext);
  
  const [focused, setFocused] = useState<boolean>(false);

  const { pathname } = useRouter();

  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const focusButtonStyle = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.darker,
  }), [colors.darker]);

  let subtitle;
  switch (pathname){
    case '/':
      subtitle = "Modo Clássico";
      break;
    case '/frenetic':
      subtitle = "Modo Frenético";
      break;
  }

  const pages = [
    {
      href: '/',
      name: 'Modo Clássico'
    },
    {
      href: '/frenetic',
      name: 'Modo Frenético'
    },
    {
      href: '/about',
      name: 'Créditos'
    },
  ];

  const menuItems = () => {
    const rows = pages.map((item, index) => (
      <Link href={item.href} passHref key={index}>
        <a onClick={() => setDropdownMenuOpen(false)}>
          {item.name}
        </a>
      </Link>
    ));

    return rows;
  }

  const handleButtonClick = () => {
    setDropdownMenuOpen(!isDropdownMenuOpen);
    setFocused(true);
  }

  const handleOpenInstructions = () => {
    setDropdownMenuOpen(false);
    setIsInstructionModalOpen(true);
  }

  useEffect(() => {
    if(!isDropdownMenuOpen){
      setTimeout(() => {
        setFocused(false)
      }, 500)
    }
  }, [isDropdownMenuOpen])

  return(
    <Container>
      <Content>
        {(pathname !== '/about') && 
        <Button 
          name="Instruções" 
          onClick={handleOpenInstructions}
        >?</Button>}
        <TitleContainer>
          <Link href='/' passHref>
            <Title>Cripto-memória</Title>
          </Link>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleContainer>
        <DropdownMenu
          menuItems={menuItems()}
          isOpen={isDropdownMenuOpen}
          setOpen={setDropdownMenuOpen}
        >
          <Button 
            onClick={handleButtonClick}
            name="Mais conteúdo"
            style={focused ? focusButtonStyle : undefined}
          >
            <Ellipsis />
          </Button>
        </DropdownMenu>
      </Content>
    </Container>
  );
}