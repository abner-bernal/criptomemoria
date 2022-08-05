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

interface HeaderProps {
  subtitle?: string;
}

export function Header({ subtitle }: HeaderProps) {
  const { colors } = useContext(ThemeContext);

  const [
    isInstructionsModalVisible, 
    setIsInstructionsModalVisible
  ] = useState(false);

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const focusButtonStyle = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.darker,
  }), [colors.darker]);

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
          <Button onClick={handleOpenInstructions}>?</Button>
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
            <GameInstructions />
          </Modal>
      }
    </>
  );
}