import styled from "styled-components";

import { Card } from "../Card";
import { Letter } from "../Letter";

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  padding: 48px 48px 32px;
  gap: 48px;

  @media(max-width: 540px) {
    padding: 32px 24px;
  }
`;

export const PageContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 32px;
`;

export const Title = styled.span`
  font-size: 1.8rem;
  text-transform: uppercase;
  color: ${props => props.theme.colors.highlight};

  @media(max-width: 540px) {
    font-size: 1.7rem;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Text = styled.span`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.highlight};

  @media(max-width: 540px) {
    font-size: 1.7rem;
  }
`;

export const TextTimer = styled.span`
  font-weight: 500;
  font-size: 3.2rem;
  color: ${props => props.theme.colors.highlight};

  @media(max-width: 540px) {
    font-size: 2.8rem;
  }
`;

export const Word = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 1280px;
  flex-wrap: wrap;
  gap: 0.8rem;
  flex-direction: row;
`;

export const TextAndPieceContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const Piece = styled(Letter)`
  @media(min-width: 414px) {
    width: 49px;
    height: 49px;
    border-radius: 6px;
    font-size: 2rem;
  }
`;

export const CardView = styled(Card)`
  max-height: 49px;
  max-width: 98px;

  & > div {
    border-radius: 6px;
    cursor: auto;
  }

  span {
    @media(min-width: 540px) {
      font-size: 2rem;
    }
  }
`;

export const CardsContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 0.8rem;
  
  @media(max-width: 540px) {
    gap: 0.2rem;
  }
`;

export const ButtonStart = styled.span`
  padding: 8px 18px;
  font-size: 2rem;
  font-weight: 500;
  line-height: 24px;
  color: ${props => props.theme.colors.highlight};
  background-color: ${props => props.theme.colors.purple50};
  border-radius: 20px;

  @media(max-width: 540px) {
    font-size: 1.8rem;
    line-height: 22px;
    border-radius: 19px;
  }
`;

export const PageIndexContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const PageIndex = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  font-size: 1.7rem;
  font-weight: 500;
  cursor: pointer;
  color: ${props => props.theme.colors.highlight};
  background-color: ${props => props.theme.colors.gray80};
`;