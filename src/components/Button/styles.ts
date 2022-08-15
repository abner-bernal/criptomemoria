import styled from "styled-components";

export const Container = styled.button`
  padding: 8px 20px;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.3px;
  cursor: pointer;
  line-height: 24px;
  color: ${props => props.theme.colors.highlight};
  border-radius: 20px;
  transition: filter 300ms;

  &:disabled {
    cursor: auto;
  }

  @media(max-width: 540px) {
    font-size: 1.8rem;
    line-height: 22px;
    border-radius: 19px;
  }
`;