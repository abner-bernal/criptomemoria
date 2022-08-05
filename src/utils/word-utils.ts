import { CardProps } from "../components/Card";
import { LetterProps } from "../components/Letter";
import { symbols } from "../data/symbols";
import { keyGen } from "./key-utils";

export const generateWordCards = (word: string): CardProps[] => {
  const splitString = word.split("");

  const wordArray = splitString.map(letter => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    return {
      id: keyGen(),
      letter,
      symbol
    }
  });

  return wordArray;
}

export const generateWordLetters = (word: string): LetterProps[] => {
  const splitString = word.split("");

  const wordArray = splitString.map((letter): LetterProps => {
    return {
      char: letter,
      status: 'correct',
    }
  });

  return wordArray;
}

export const encryptWord = (wordCards: CardProps[]): LetterProps[] => {
  const encryptedWord = wordCards.map((word): LetterProps =>  {
    return {
      char: word.symbol,
      status: 'encrypted'
    }
  });

  return encryptedWord;
}

export const emptyWord = (word: LetterProps[]): LetterProps[] => {
  const wordResult = word.map((): LetterProps =>  {
    return {
      char: "",
      status: 'empty'
    }
  });

  return wordResult;
}; 