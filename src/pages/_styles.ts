import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  width: 100%;
  flex: 1;
  padding-top: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media(max-width: 540px) {
    padding-top: 64px;
  }
`;