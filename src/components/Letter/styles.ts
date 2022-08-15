import styled from "styled-components";

export const Title = styled.span`
  max-width: 70px;
  max-height: 70px;
  min-height: 32px;
  width: 100%;
  height: 100%;
  min-width: 32px;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  place-items: center;
  font-size: 2.7rem;
  font-weight: 400;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  text-transform: uppercase;
  text-align: center;
  display: flex;  
  
  @media(max-width: 820px) {
    max-width: 60px;
    max-height: 60px;
    border-radius: 8px;
  }
  
  @media(max-width: 768px) {
    font-size: 2.3rem;
  }

  @media(max-width: 540px) {
    max-width: 49px;
    max-height: 49px;
    border-radius: 6px;
    font-size: 2rem;
  }

  @media(max-width: 414px) {
    max-width: 44px;
    max-height: 44px;
    font-size: 1.7rem;
  }

  @media(max-width: 300px) {
    font-size: 1.7rem;
  }
`;