import styled from "styled-components";

import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  opacity: 0;
  min-height: 100vh;
  display: none;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.overlay};
`;

export const Container = styled(motion.div)`
  background-color: ${props => props.theme.colors.gray85};
  border-radius: 30px;
  width: 100%;
  max-width: 684px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin: 12px;

  @media(max-width: 820px) {

  }
`;

const Text = styled.span`
  font-size: 2.1rem;
  text-align: center;
  color: ${props => props.theme.colors.highlight};

  @media(max-width: 540px) {
    font-size: 1.7rem;
  }
`;

export const Title = styled(Text)`
  text-transform: uppercase;
  margin-top: 32px;
`;

export const Subtitle = styled(Text)`
  margin-top: 16px;
`;

export const NextGameModeButton = styled.a`
  gap: 10px;
  display: flex;
  cursor: pointer;
  font-size: 1.8rem;
  margin-top: 48px;
  padding: 8px 16px;
  border-radius: 20px;
  align-self: flex-end;
  align-items: center;
  color: ${props => props.theme.colors.highlight};
  background-color: ${props => props.theme.colors.green60};
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.15);
  }

  @media(max-width: 540px) {
    font-size: 1.7rem;
  }
`;

export const MedalContainer = styled.svg`
  margin-top: 32px;
  align-self: center;
`;