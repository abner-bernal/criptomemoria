import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-height: 70px;
  max-width: 140px;
  justify-self: center;
  aspect-ratio: 2;
  transform-style: preserve-3d;
  transition: transform 400ms ease-in-out;
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
  backface-visibility: hidden;
  cursor: pointer;

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

export const CardFaceFront = styled(CardFace)`
  background-image: linear-gradient(to bottom right, ${props => props.theme.colors.blue50}, ${props => props.theme.colors.purple50});
  justify-content: center;
`;

export const CardFaceBack = styled(CardFace)`
  border-width: 1px;
  border-style: solid;
  transform: rotateY(180deg);
  border-color: ${props => props.theme.colors.gray50};
  background-color: ${props => props.theme.colors.darker};
`;

export const Separator = styled.div`
  width: 1px;
  height: 60%;
  background-color: ${props => props.theme.colors.highlight};
`;

export const CardContent = styled.span`
  flex: 1;
  text-align: center;
  font-size: 2.6rem;
  text-transform: uppercase;

  @media(max-width: 768px) {
    font-size: 2.3rem;
  }
  
  @media(max-width: 540px) {
    font-size: 2rem;
  }

  @media(max-width: 300px) {
    font-size: 1.7rem;
  }
`;