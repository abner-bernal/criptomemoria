import { CardProps } from "../components/Card";
import { symbols } from "../data/symbols";
import { keyGen } from "./key-utils";

export const completeCards = (array: CardProps[]): CardProps[] => {
  if(!array) return [];

  let cardArray = new Array(...array);
  
  const maxRepeat = 20 - array.length;

  if(maxRepeat > 0) {
    const caracteres = 'abcdefghijklmnopqrstuvxyz';
    const frequent = 'abcdefilmnoprstuv';
    const symbolsSolution = array.map(item => item.symbol);
    const maxSameSymbols = Math.ceil(maxRepeat * 0.3);

    for (var i = 0; i < maxRepeat; i++) {      
      do {
        var letter: string;
        var symbol: string;

        if(i < maxSameSymbols){
          letter = frequent.charAt(Math.floor(Math.random() * frequent.length));
          symbol = symbolsSolution[Math.floor(Math.random() * symbolsSolution.length)];
        } else {
          letter = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
          symbol = symbols[Math.floor(Math.random() * symbols.length)];
        }
        var exists = cardArray.find(el => {
          return el.letter === letter && el.symbol === symbol;
        });        
      } while(exists !== undefined);
      
      cardArray.push({
        id: keyGen(),
        letter,
        symbol
      });
    }
  }

  return cardArray;
}

export const sortArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
}

export const completeSortCards = (cards: CardProps[]): CardProps[] => {
  return sortArray(completeCards(cards));
}
