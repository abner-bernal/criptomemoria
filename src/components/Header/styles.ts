import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  min-height: 70px;
  z-index: 1;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.gray90};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: ${props => props.theme.colors.gray85};

  @media(max-width: 540px) {
    min-height: 64px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 860px;
  padding: 0 16px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  color: ${props => props.theme.colors.highlight};
  background-color: ${props => props.theme.colors.gray85};
  transition: filter 300ms;

  &:hover {
    //background-color: ${props => props.theme.colors.darker};
    filter: brightness(1.5);
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: center;

  @media(max-width: 540px) {
    gap: 4px;
  }
`;

export const Title = styled.strong`
  font-weight: 400;
  text-transform: uppercase;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.highlight};
  
  @media(max-width: 540px) {
    font-size: 1.7rem;
  }
  
  @media(max-width: 300px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.span`
  font-size: 1.7rem;
  color: ${props => props.theme.colors.gray50};

  @media(max-width: 540px) {
    font-size: 1.5rem;
  }
`;

const MenuContainer = styled.div`
  background-color: ${props => props.theme.colors.gray85};
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 12px;
`;

export const Dropdown = styled(MenuContainer)`
  position: absolute;
  margin-top: 5px;
  border-radius: 14px;
  width: 280px;
  right: 0;
  box-shadow: 0 0 12px ${props => props.theme.colors.gray95};

  @media (max-width: 540px) {
    display: none;
  }
`;

export const DropdownItem = styled.a`
  display: flex;
  height: 50px;
  align-items: center;
  padding-left: 34px;
  border-radius: 25px;
  background-color: ${props => props.theme.colors.gray85};
  transition: filter 300ms;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.highlight};

  &:hover {
    filter: brightness(1.5);
  }

  @media (max-width: 540px) {
    filter: brightness(1.5);
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 540px) {
    background-color: ${props => props.theme.colors.overlay};
    padding: 0 16px;
    z-index: 10;
  }
`;

export const ModalContainer = styled(MenuContainer)`
  border-radius: 30px;

  @media (min-width: 540px) {
    display: none;
  }
`;