import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1280px;
  gap: 2rem;
  flex-direction: column;
  padding: 16px;

  @media(max-width: 820px) {
    gap: 1.6rem;
  }

  @media(max-width: 768px) {
    gap: 1rem;
  }

  @media(max-width: 540px) {
    gap: 0.4rem;
    padding: 16px 8px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  flex-direction: row;
  
  @media(max-width: 820px) {
    gap: 1.6rem;
  }

  @media(max-width: 768px) {
    gap: 1rem;
  }

  @media(max-width: 540px) {
    gap: 0.4rem;
  }
`;