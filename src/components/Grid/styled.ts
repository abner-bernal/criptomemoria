import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  width: 100%;
  margin: 14px 0 0;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  
  @media(max-width: 912px) {
    gap: 1.8rem;
  }

  @media(max-width: 820px) {
    gap: 1.4rem;
  }

  @media(max-width: 768px) {
    gap: 0.8rem;
  }
  
  @media(max-width: 540px) {
    gap: 0.2rem;
    grid-template-columns: repeat(4, 1fr);
  }

  @media(max-width: 300px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SkeletonCard = styled.div`
  justify-content: center;
  justify-self: center;
  align-items: center;
  display: flex;
  width: 100%;
  max-width: 140px;
  max-height: 70px;
  aspect-ratio: 2;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.gray50};

  @media(max-width: 820px) {
    border-radius: 8px;
  }

  @media(max-width: 768px) {
    border-radius: 6px;
  }

  @media(max-width: 540px) {
    border-radius: 4px;
  }
`;