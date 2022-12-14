import { memo, MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";
import { GameDataProps } from "../../utils/data-utils";

import { Card, CardProps } from "../Card";
import { LetterProps } from "../Letter";
import Star from "../Star";

import { Container, SkeletonCard } from "./styled";

export interface GridProps {
  active?: boolean;
  cards?: CardProps[];
  gameData: GameDataProps | undefined;
  tries: LetterProps[][];
  letterPosition: MutableRefObject<number>;
  setTries: (tries: LetterProps[][]) => void;
}

function Grid({ 
  cards,
  tries,
  setTries,
  gameData,
  active = true,
  letterPosition,
}: GridProps) {
  const [stateCards, setStateCards] = useState(cards);
  const curRow = gameData ? gameData.curRow : 0;
  const solutionCards = useMemo(() => (
    gameData ? gameData.solutionCards : [] as CardProps[]
  ), [gameData]);
  const encryptedSolution = useMemo(() => (
    gameData ? gameData.encryptedSolution : [] as LetterProps[]
  ), [gameData]);

  
  useEffect(() => {
    cards && setStateCards(cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const decryptLetter = useCallback((letter: string): LetterProps[] => (
    solutionCards.map((card, index): LetterProps => {
      if (index > letterPosition.current) {
        return {
          char: card.symbol,
          status: 'encrypted'
        };
      }

      if (index < letterPosition.current) {
        return {
          char: tries[curRow][index].char,
          status: 'decrypted'
        };
      }

      return {
        char: letter,
        status: 'decrypted'
      };
    })
  ), [solutionCards, letterPosition, tries, curRow]);

  const handleCardClick = useCallback((id: string) => {
    const newStateCards = stateCards?.map((card) => {
      // Se o id do cartão nao for o id clicado, ou já estiver virado, desvira.
      if (card.id !== id || card.flipped) {
        card.flipped = false;
        return card;
      }

      // Virar o card
      card.flipped = true;
      
      // Checar se o simbolo virado corresponde ao simbolo da letra
      if (card.symbol === solutionCards[letterPosition.current].symbol) {

        //Card com simbolo correspondente a posição da palavra
        tries[curRow] = decryptLetter(card.letter);
        setTries([...tries]); 
        letterPosition.current++;
      } else if (card.symbol === solutionCards[0].symbol) {
        
        //Card errado na sequencia porém é o primeiro card da palavra
        letterPosition.current = 0;
        tries[curRow] = decryptLetter(card.letter);
        setTries([...tries]);
        letterPosition.current++;
      } else {
        //Card errado da sequencia
        if(tries[curRow][0].status === 'decrypted') {
          tries[curRow] = encryptedSolution;
          setTries([...tries]); 
        }
        letterPosition.current = 0;
      }

      return card;
    });

    setStateCards(newStateCards);
  }, [
    tries,
    curRow,
    setTries,
    stateCards, 
    solutionCards, 
    decryptLetter, 
    letterPosition, 
    encryptedSolution, 
  ]);

  const skeletonCards = () => {
    let rows = [];
    for (var i = 0; i < 20; i++) {
      rows.push(
        <SkeletonCard key={i}>
          <Star />
        </SkeletonCard>
      );
    }

    return rows;
  }

  return(
    <Container>
      {
        (stateCards && gameData && active) ? 
          stateCards.map(card => (
            <Card {...card} key={card.id} handleClick={handleCardClick}/>
          ))
        :
          skeletonCards()
      }      
    </Container>
  );
}

export default memo(Grid);