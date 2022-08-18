import Image from "next/image";
import styled, { keyframes } from "styled-components";
import DonateButton from "../../components/DonateButton";

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  z-index: 0;
  transition: all 0.3s ease-in-out;
  margin: 18px 90px 14px;

  @media (max-width: 540px) {
    margin: 18px 60px 14px;
  }

  @media (max-width: 300px) {
    margin: 18px 45px 14px;;
  }
`;

const showAuthorImage = keyframes`
  0% {
    transform: translateX(-40%);
    opacity: 0;
    overflow: hidden;
  }
  100% {
    transform: translateX(22%);
    opacity: 1;
  }
`;

export const AuthorImageContainer = styled.div`
  animation: ${showAuthorImage} 1s 0.3s forwards;
  transform: translateX(-40%);
  visibility: visible;
  overflow: hidden;
  opacity: 0;
  z-index: 2;
`;

export const AuthorImage = styled(Image)`
  border-radius: 50%;
  border: 18px solid ${props => props.theme.colors.gray90Soft} !important;

  @media (max-width: 540px) {
    border-width: 16px !important;
  }

  @media (max-width: 300px) {
    border-width: 12px !important;
  }
`;

const showLogoImage = keyframes`
  0% {
    transform: translateX(40%);
    opacity: 0;
    overflow: hidden;
  }
  100% {
    transform: translateX(-22%);
    opacity: 1;
  }
`;

export const LogoImageContainer = styled.div`
  animation: ${showLogoImage} 1s 0.3s forwards;
  transform: translateX(40%);
  visibility: visible;
  overflow: hidden;
  padding: 0 18px;
  opacity: 0;

  @media (max-width: 540px) {
    padding: 0 16px;
  }

  @media (max-width: 300px) {
    padding: 0 12px;
  }
`;

export const LogoImage = styled(Image)`
  border-radius: 50%;
`;

export const Title = styled.h1`
  text-transform: uppercase;
  color: ${props => props.theme.colors.highlight};
  margin: 14px 0 18px;
  font-weight: 500;
  font-size: 3.9rem;

  @media (max-width: 540px) {
    font-size: 2.8rem;
  }

  @media (max-width: 300px) {
    font-size: 2.6rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 24px 0;

  @media (max-width: 540px) {
    margin: 16px 0;
    gap: 24px;
  }
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 540px) {
    font-size: 1.7rem;
  }

  @media (max-width: 300px) {
    font-size: 1.5rem;
  }
`;

export const Text1 = styled(Text)`
  color: ${props => props.theme.colors.highlight};
`;

export const Text2 = styled(Text)`
  color: ${props => props.theme.colors.gray50};
`;

export const TextLink = styled.a`
  color: ${props => props.theme.colors.blue50};
  cursor: pointer;
  font-weight: 500;
  white-space: pre;
  font-size: 2rem;

  @media (max-width: 540px) {
    font-size: 1.7rem;
  }

  @media (max-width: 300px) {
    font-size: 1.5rem;
  }
`;

export const DonateContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 18px 24px;
  flex-direction: column;
`;

export const DonateTitle = styled.span`
  text-transform: uppercase;
  color: ${props => props.theme.colors.highlight};
  font-weight: 500;
  font-size: 2.6rem;
  padding: 0 0 16px 16px;
  border-bottom: 2px solid ${props => props.theme.colors.gray80};

  @media (max-width: 540px) {
    font-size: 2rem;
  }

  @media (max-width: 300px) {
    font-size: 1.8rem;
  }
`;

export const ButtonContainer = styled.div`
  padding: 0 16px;
  display: flex;
`;

export const PayPalButton = styled(DonateButton)`
  margin: 60px auto;

  @media (max-width: 540px) {
    margin: 44px auto;
  }
`;