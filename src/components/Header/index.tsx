import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, useCallback, useContext, useEffect, useMemo, useState } from "react";
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

export function Header() {
  const { colors } = useContext(ThemeContext);
  
  const [focused, setFocused] = useState<boolean>(false);

  const { pathname } = useRouter();

  const [
    isInstructionModalOpen, 
    setIsInstructionModalOpen
  ] = useState(false);

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
    <>
      <Container>
        <Content>
          {(pathname !== 'about') && <Button onClick={handleOpenInstructions}>?</Button>}
          <TitleContainer>
            <Title>Cripto-memória</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </TitleContainer>
          <DropdownMenu
            menuItems={menuItems()}
            isOpen={isDropdownMenuOpen}
            setOpen={setDropdownMenuOpen}
          >
            <Button 
              onClick={handleButtonClick}
              style={focused ? focusButtonStyle : undefined}
            >
              <Ellipsis />
            </Button>
          </DropdownMenu>
        </Content>
      </Container>
      <GameInstructions 
        initialPage={pathname} 
        isOpen={isInstructionModalOpen} 
        setOpen={setIsInstructionModalOpen}
      />
    </>
  );
}