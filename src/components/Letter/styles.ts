import styled from "styled-components";

export const Title = styled.span`
  width: 70px;
  height: 70px;
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
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
  
  @media(max-width: 768px) {
    font-size: 2.3rem;
  }

  @media(max-width: 540px) {
    width: 49px;
    height: 49px;
    border-radius: 6px;
    font-size: 2rem;
  }

  @media(max-width: 414px) {
    width: 44px;
    height: 44px;
  }

  @media(max-width: 300px) {
    font-size: 1.7rem;
  }
`;