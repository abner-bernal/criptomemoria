import styled from "styled-components";

import Button from "../../components/Button";

export const TextTimer = styled.span`
  font-weight: 500;
  font-size: 3.2rem;
  line-height: 40px;
  color: ${props => props.theme.colors.highlight};

  @media(max-width: 540px) {
    line-height: 36px;
    font-size: 2.8rem;
  }
`;

type ButtonStartProps = {
  disabled: boolean;
};

export const ButtonStart = styled(Button).attrs((props: ButtonStartProps) => ({
  disabled: props.disabled,
}))<ButtonStartProps>`
  background-color: ${props => props.theme.colors.purple70};

  &:disabled {
    opacity: 0.5;
  }

  &:hover:enabled {
    filter: brightness(1.2);
  }
`;