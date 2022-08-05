import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 860px;
  padding: 16px;
  align-items: center;
`;

export const ButtonLevel = styled(Button)`
  background-color: ${props => props.theme.colors.gray85};

  &:hover:enabled {
    filter: brightness(1.5);
  }
`;