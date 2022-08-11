import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.gray80};
  cursor: pointer;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.5);
  }
`;