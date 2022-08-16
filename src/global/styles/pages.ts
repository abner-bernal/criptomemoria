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
  min-height: 100vh;
  flex: 1;
  max-width: 860px;
  padding: 70px 16px 0;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-evenly;

  @media(max-width: 540px) {
    padding: 64px 8px 0;
  }
`;