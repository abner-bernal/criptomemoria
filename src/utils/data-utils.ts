import { emptyWord, encryptWord, generateWordCards, generateWordLetters } from "./word-utils";
import { LetterProps } from "../components/Letter";
import { CardProps } from "../components/Card";
import { dayNumber } from "./date-utils";
import { completeSortCards } from "./card-utils";

export type GameDataProps = {
  curDay: number;
  curRow: number;
  solution: LetterProps[];
  solutionCards: CardProps[];
  cards: CardProps[];
  encryptedSolution: LetterProps[];
  won: boolean;
  gameOver: boolean;
  tries: LetterProps[][];
}

export const initialGameData = (word: string): GameDataProps => {
  const wordNoAccents = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const solution = generateWordLetters(word);
  const solutionCards = generateWordCards(wordNoAccents);
  const encryptedSolution = encryptWord(solutionCards);
  const cards = completeSortCards(solutionCards);
  const empty = emptyWord(solution.length);

  const data = {
    curDay: dayNumber(),
    curRow: 0,
    solution,
    solutionCards,
    encryptedSolution,
    cards,
    won: false,
    gameOver: false,
    tries: [encryptedSolution, empty, empty, empty],
  }

  return data;
}; 