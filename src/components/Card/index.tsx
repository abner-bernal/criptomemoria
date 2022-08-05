import { CSSProperties, HTMLAttributes, useMemo } from "react";
import Star from "../Star";
import { CardContent, CardFaceBack, CardFaceFront, Container, Separator } from "./styles";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  flipped?: boolean;
  letter: string;
  symbol: string;
  handleClick?: (id: string) => void;
}

export function Card({ id, flipped = false, letter, symbol, handleClick, ...rest }: CardProps) {

  const cardContentFlipped = useMemo<CSSProperties>(() => ({
    transform: 'rotateY(180deg)',
  }), []);

  const containerStyle = flipped ? cardContentFlipped : undefined;

  const handleClickFn = () => {
    if (handleClick) {
      handleClick(id);
    }
  }

  return(
    <Container style={containerStyle} onClick={handleClickFn} {...rest}>
      <CardFaceFront>
        <Star />
      </CardFaceFront>
      <CardFaceBack>
        <CardContent>{letter}</CardContent>
        <Separator />
        <CardContent>{symbol}</CardContent>
      </CardFaceBack>
    </Container>
  );
}