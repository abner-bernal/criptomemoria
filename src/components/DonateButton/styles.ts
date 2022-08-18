import styled, { keyframes } from "styled-components";
import PayPalIcon from "../PayPalIcon";

const showText = keyframes`
  0% {
    max-width: 0%;
    opacity: 0;
    overflow: hidden;
  }
  100% {
      max-width: 100%;
      opacity: 1;
  }
`;

export const Container = styled.button`
  height: 45px;
  border-radius: 4px;
  background: ${props => props.theme.colors.highlight};
  color: ${props => props.theme.colors.gray80};
  min-width: 75px;
  max-width: 500px;
  width: 100%;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    filter: brightness(0.90);
  }
`;

export const Content = styled.div`
  margin: 0px 4vw;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    visibility: visible;
    max-width: 0%;
    opacity: 0;
    overflow: hidden;
    animation: ${showText} 1s 2s forwards;
    font-size: 2rem;
    line-height: 24px;
    font-weight: 500;
    margin-top: -2px;
    display: inline-block;
    white-space: pre;
  }

  @media only screen and (max-width: 500px) {
    height: 22px;

    span {
      font-size: 1.6rem;
      line-height: 22px;
    }
  }

  @media only screen and (max-width: 300px) {
    height: 18px;

    span {
      font-size: 1.3rem;
      margin-top: -1px;
      line-height: 18px;
    }
  }
`;

export const Icon = styled(PayPalIcon)`
  height: 100%;
  width: auto;
`;