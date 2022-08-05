import styled from "styled-components";

export const ModalView = styled.div`
  width: 100%;
  min-height: 100vh;
  position: absolute;
  padding: 24px 0;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: ${props => props.theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;

  @media(max-width: 820px) {
    padding-top: 60px;
    padding-bottom: 0;
    align-items: flex-end;
  }
`;

export const Container = styled.div`
  background-color: ${props => props.theme.colors.gray85};
  border-radius: 30px;
  max-width: 860px;

  @media(max-width: 820px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;