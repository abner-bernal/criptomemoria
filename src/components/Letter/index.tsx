import { CSSProperties, HTMLAttributes, useContext, useMemo } from "react";
import { ThemeContext } from "styled-components";
import { Title } from "./styles";

type StatusProp = 'encrypted' | 'decrypted' | 'correct' | 'incorrect' | 'empty';

export interface LetterProps extends HTMLAttributes<HTMLSpanElement> {
  char: string;
  status: StatusProp;
}

export function Letter({ char, status, ...rest }: LetterProps) {
  const { colors } = useContext(ThemeContext);

  const letterEncrypted = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.darker,
    borderColor: colors.gray50,
  }), [colors.darker, colors.gray50]);

  const letterDecrypted = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.gray50,
    borderColor: 'transparent',
  }), [colors.gray50]);

  const letterCorrect = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.green50,
    borderColor: 'transparent',
  }), [colors.green50]);

  const letterIncorrect = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.pink50,
    borderColor: 'transparent',
  }), [colors.pink50]);

  const letterEmpty = useMemo<CSSProperties>(() => ({
    backgroundColor: colors.darker,
    borderColor: 'transparent',
  }), [colors.darker]);

  const styleLetter = () => {
    switch (status) {
      case 'encrypted':
        return letterEncrypted;
      case 'decrypted':
        return letterDecrypted;
      case 'correct': 
        return letterCorrect;
      case 'incorrect':
        return letterIncorrect;
      case 'empty':
        return letterEmpty;
    }
  }

  return(
    <Title style={styleLetter()} {...rest}>
      { char }
    </Title>
  )
}