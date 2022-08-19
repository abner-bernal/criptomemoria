import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 16px 0 0;
  align-items: center;

  @media(max-width: 540px) {
    margin: 16px 8px 0;
  }
`;

export const ButtonLevel = styled(Button)`
  background-color: ${props => props.theme.colors.gray85};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;

  &:hover:enabled {
    filter: brightness(1.5);
  }

  @media(max-width: 540px) {
    min-height: 38px;
  }
`;

export const ItemButton = styled.button`

`;