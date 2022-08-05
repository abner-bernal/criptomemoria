import { CSSProperties, ReactNode, useMemo } from "react";

import { ButtonLevel, Container } from "./styles";

interface GameHeaderProps {
  leftContent?: ReactNode;
}

function GameHeader({ leftContent }: GameHeaderProps) {

  const containerStyle = useMemo<CSSProperties>(() => ({
    justifyContent: leftContent ? "space-between" : "flex-end",
  }), [leftContent]);

  return(
    <Container style={containerStyle}>
      {leftContent}
      <ButtonLevel>Fácil</ButtonLevel>
    </Container>
  );
}

export default GameHeader;