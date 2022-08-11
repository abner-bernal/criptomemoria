import Link from "next/link";
import { MouseEvent, SetStateAction, useContext } from "react";
import { ThemeContext } from "styled-components";
import CloseButton from "../CloseButton";
import { Container, MedalContainer, NextGameModeButton, Overlay, Subtitle, Title } from "./styles";

interface GameOverModalProps {
  gameOver?: boolean;
  finalTry?: number;
  isOpen: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  gameMode: 'classic' | 'frenetic';
} 

const overlayVariants = {
  open: { opacity: 1, display: 'flex' },
  closed: { 
    opacity: 0,
    transitionEnd: { display: "none" }
  },
}

const ModalVariants = {
  open: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    }
  },
  closed: { 
    scale: 0 
  },
}

function GameOverModal({ finalTry = 5, gameMode, isOpen, setOpen }: GameOverModalProps) {

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickable = e.target as HTMLDivElement;
    if(clickable.id === 'overlay') handleCloseModal();
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  let path: string;
  let linkText: string;
  switch (gameMode) {
    case 'classic':
      path = '/frenetic';
      linkText = 'Jogar Modo Frenético';
      break;
    case 'frenetic':
      path = '/';
      linkText = 'Jogar Modo Clássico';
      break;
  }

  let title: string;
  let subtitle: string;
  switch (finalTry) {
    case 0:
      title = 'Incrível!'
      subtitle = 'Você é um gênio, venceu de primeira. Jogue outra modalidade.'
      break;
    case 1:
      title = 'Impressionante!'
      subtitle = 'Você venceu o desafio do dia. Tente outra modalidade.'
      break;
    case 2:
      title = 'Uau! Parabéns'
      subtitle = 'Você venceu o desafio do dia. Tente outra modalidade.'
      break;
    case 3:
      title = 'Ufa! Na jogada final'
      subtitle = 'Você venceu o desafio do dia. Tente outra modalidade.'
      break;
    default:
      title = 'Poxa, que pena!'
      subtitle = 'Você perdeu. Tente em outra modalidade.'
      break;
  }

  return(
    <Overlay 
      id='overlay' 
      onClick={handleOutsideClick} 
      animate={isOpen ? "open" : "closed"}
      variants={overlayVariants}
      transition={{ duration: 0.25 }}
    >
      <Container
        animate={isOpen ? "open" : "closed"}
        variants={ModalVariants}
      >
        <CloseButton onClick={handleCloseModal} />
        {finalTry < 4 && <MedalIcon />}
        <Title>{title} {finalTry > 3 && <span role="img" aria-label="crying face">😢</span>}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Link href={path} passHref >
          <NextGameModeButton>
            {linkText}
            <ChevronIcon />
          </NextGameModeButton>
        </Link>
      </Container>
    </Overlay>
  ) 
}

const ChevronIcon = () => {
  const { colors } = useContext(ThemeContext);
  
  const strokeWidth = 2;
  const width = 8;
  const height = 14;
  const padding = strokeWidth / 2;

  return(
    <svg
      width={width}
      height={height}
      fill='none'
    >
      <polyline 
        points={`
          ${padding},
          ${padding} ${width - padding},
          ${height / 2} ${padding},
          ${height - padding}
        `}
        stroke={colors.highlight}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
}

const MedalIcon = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <MedalContainer
      width='70.809'
      height='90'
      viewBox='0 0 70.809 90'
    >
      <path
        fill={colors.gray80}
        d='M30.434 30.38l18.608 10.747-21.494 37.216L22.85 65 8.94 67.6z'
        transform='translate(-8.94 11.657)'
      ></path>
      <path
        fill={colors.gray85}
        d='M25.943 30.38L17.33 45.288c1.75 3.424 6.141 4.36 9.473 4.222a12.052 12.052 0 013.3.322c2.272.921 4.406 3.224 7.078 4.053l7.37-12.758z'
        transform='translate(-4.449 11.657)'
      ></path>
      <path
        fill={colors.gray80}
        d='M47.548 30.38L28.94 41.127l21.494 37.216L55.132 65l13.91 2.6z'
        transform='translate(1.766 11.657)'
      ></path>
      <path
        fill={colors.gray85}
        d='M47.548 30.38L28.94 41.127l7.37 12.758c2.671-.829 4.806-3.071 7.078-4.053a12.114 12.114 0 013.3-.322c3.316.138 7.677-.814 9.473-4.222z'
        transform='translate(1.766 11.657)'
      ></path>
      <path
        fill={colors.blue30}
        d='M40.932 36.971L22.094 69.642l-2.011-5.711-5.973 1.12L32.979 32.38z'
        transform='translate(-6.172 12.727)'
      ></path>
      <path
        fill={colors.purple30}
        d='M59.257 65.051l-5.987-1.12-2.011 5.727L32.42 36.971l7.953-4.591z'
        transform='translate(3.629 12.727)'
      ></path>
      <path
        fill={colors.purple50}
        d='M40.373 32.38l-7.953 4.606 7.354 12.743c2.733-2.134 6.325-.752 9.6-1.75z'
        transform='translate(3.629 12.727)'
      ></path>
      <path
        fill={colors.blue50}
        d='M29.537 32.38l-9 15.583c3.27 1 6.863-.384 9.6 1.75l7.353-12.742z'
        transform='translate(-2.73 12.727)'
      ></path>
      <path
        fill='#fff'
        d='M71.021 34.474c0-3.24 2.41-6.817 1.535-9.734s-5.143-4.483-6.986-7-2-6.878-4.606-8.736-6.679-.645-9.7-1.535S45.781 3 42.541 3s-5.88 3.439-8.8 4.391-7.185-.215-9.7 1.535-2.687 6.141-4.606 8.736-5.911 3.976-6.894 7S14 31.158 14 34.4s-2.41 6.817-1.459 9.734 5.128 4.56 6.97 7.078 2 6.878 4.606 8.736 6.679.645 9.7 1.535 5.481 4.468 8.721 4.468 5.88-3.439 8.8-4.391 7.185.215 9.7-1.535 2.687-6.141 4.606-8.736 5.911-3.976 6.894-7-1.517-6.576-1.517-9.815z'
        transform='translate(-7.308 -3)'
      ></path>
      <circle
        cx='22.262'
        cy='22.262'
        r='22.262'
        fill={colors.gray30}
        transform='translate(13 9)'
      ></circle>
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M4384.367 4797.492l2.273 5.4a1.056 1.056 0 00.9.656l5.842.49a1.078 1.078 0 01.614 1.889l-4.437 3.825a1.053 1.053 0 00-.345 1.063l1.338 5.7a1.077 1.077 0 01-1.606 1.167l-5.018-3.035a1.054 1.054 0 00-1.114 0l-5.018 3.035a1.077 1.077 0 01-1.606-1.167l1.338-5.7a1.054 1.054 0 00-.345-1.062l-4.437-3.825a1.077 1.077 0 01.613-1.889l5.842-.49a1.054 1.054 0 00.9-.656l2.273-5.4a1.077 1.077 0 011.985 0z'
        transform='translate(-4348.375 -4775.833)'
      ></path>
    </MedalContainer>
  );
}

export default GameOverModal;