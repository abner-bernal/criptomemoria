import styled from "styled-components";
import { motion } from "framer-motion";

export const OutSide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  height: 100vh;
  display: none;
`;

export const Container = styled.div`
  position: relative;
`;

export const Overlay = styled(motion.div)`
  display: flex;
  opacity: 0;
  z-index: 10;
  @media (max-width: 540px) {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme.colors.overlay};
    padding: 0 16px;
  }
`;

export const Navigation = styled(motion.nav)`
  z-index: 6;
  @media (min-width: 540px) {
    position: absolute;
    margin-top: 5px;
    right: 0;
  }
`;

type MenuProps = {
  width?: number;
}

export const Menu = styled(motion.ul)<MenuProps>`
  background-color: ${props => props.theme.colors.gray85};
  border-radius: 30px;
  gap: 12px;
  display: flex;
  padding: 20px;
  flex-direction: column;

  @media (min-width: 540px) {
    border-radius: 14px;
    width: ${props => props.width ? props.width : 280}px;
    box-shadow: 0 0 12px ${props => props.theme.colors.gray95};
  }
`;

export const MenuItem = styled(motion.li)`
  list-style: none;

  button {
    justify-content: center;
    padding: 0 24px;
  }

  a {
    padding-left: 34px;
  }
  
  button, a {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    border-radius: 25px;
    transition: background-color 300ms;
    font-size: 1.8rem;
    color: ${props => props.theme.colors.highlight};
    
    &:hover {
      background-color: ${props => props.theme.colors.gray80};
    }
    
    @media (max-width: 540px) {
      background-color: ${props => props.theme.colors.gray80};
    }
  }
`;