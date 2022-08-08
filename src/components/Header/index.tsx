import Link from "next/link";
import { CSSProperties, useCallback, useContext, useMemo, useState } from "react";
import { ThemeContext } from "styled-components";
import { Ellipsis } from "../Ellipsis";
import GameInstructions from "../GameInstructions";
import Modal from "../Modal";
import { 
  Button, 
  Container, 
  Content, 
  Dropdown, 
  DropdownItem, 
  ModalContainer, 
  Overlay, 
  Subtitle, 
  Title, 
  TitleContainer 
} from "./styles";

export type PageName = 'classic' | 'frenetic' | 'about';

interface HeaderProps {
  page: PageName;
}

export function Header({ page }: HeaderProps) {
  const { colors } = useContext(ThemeContext);

  const [
    isInstructionsModalVisible, 
    setIsInstructionsModalVisible
  ] = useState(false);

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const focusButtonStyle = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.darker,
  }), [colors.darker]);

  let subtitle;
  switch (page){
    case 'classic':
      subtitle = "Modo Clássico";
      break;
    case 'frenetic':
      subtitle = "Modo Frenético";
      break;
  }

  const handleOutsideClick = (event: any) => {
    if(event.target?.id === 'overlay') {
      setDropdownMenuOpen(false);
    }
  }

  const MenuContent = () => {
    return(
      <>
        <Link href='/' passHref>
          <DropdownItem onClick={() => setDropdownMenuOpen(false)}>
            Modo Clássico
          </DropdownItem>
        </Link>
        <Link href='/frenetic' passHref >
          <DropdownItem onClick={() => setDropdownMenuOpen(false)}>
            Modo Frenético
          </DropdownItem>
        </Link>
        {/*
        <Link href='/' passHref >
          <DropdownItem onClick={() => setDropdownMenuOpen(false)}>
            Créditos
          </DropdownItem>
        </Link>*/}
      </>
    )
  }

  const handleOpenInstructions = () => {
    setDropdownMenuOpen(false);
    setIsInstructionsModalVisible(true);
  }

  const RightButton = useCallback(() => {
    return(
      <>
        {
          dropdownMenuOpen && 
            <Overlay id='overlay' onClick={handleOutsideClick}>
              <ModalContainer>
                <MenuContent />
              </ModalContainer>
            </Overlay>
        }
        <div style={{position: 'relative'}}>
          <Button 
            onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}
            style={dropdownMenuOpen ? focusButtonStyle : undefined}
          >
            <Ellipsis />
          </Button>
          {
            dropdownMenuOpen && 
              <Dropdown>
                <MenuContent />
              </Dropdown>
          }
        </div>
      </>
    );
  }, [dropdownMenuOpen, focusButtonStyle]);

  return(
    <>
      <Container>
        <Content>
          {(page !== 'about') && <Button onClick={handleOpenInstructions}>?</Button>}
          <TitleContainer>
            <Title>Cripto-memória</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </TitleContainer>
          <RightButton />
        </Content>
      </Container>
      {
        isInstructionsModalVisible && 
          <Modal onClose={() => setIsInstructionsModalVisible(false)}>
            <GameInstructions initialPage={page}/>
          </Modal>
      }
    </>
  );
}