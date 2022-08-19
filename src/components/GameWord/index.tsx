import { memo, MutableRefObject, SetStateAction, useCallback, useEffect } from "react";

import { GameDataProps } from "../../utils/data-utils";
import { dayNumber } from "../../utils/date-utils";

import { Container, Content } from "./styles";

import { Letter, LetterProps } from "../Letter";
import { CardProps } from "../Card";

interface GameWordProps {
  COLLECTION?: string;
  gameData: GameDataProps | undefined;
  tries: LetterProps[][];
  letterPosition: MutableRefObject<number>;
  setGameData: (data: GameDataProps) => void;
  setTries: (tries: LetterProps[][]) => void;
  setCards: (cards: SetStateAction<CardProps[] | undefined>) => void;
}

function GameWord({ 
  tries,
  setTries,
  setCards,
  gameData,
  COLLECTION,
  setGameData,
  letterPosition, 
}: GameWordProps) {

  const checkHits = useCallback(() => {
    if(gameData && COLLECTION) {
      let hasWon = true;
      
      const newRowState = gameData.solutionCards.map((card, index): LetterProps => {
        const correct = tries[gameData.curRow][index].char === card.letter;

        if(!correct) {
          hasWon = false;
        }

        return {
          char: tries[gameData.curRow][index].char,
          status: correct ? 'correct' : 'incorrect'
        };
      });

      tries[gameData.curRow] = hasWon ? gameData?.solution : newRowState;
      
      gameData.curDay = dayNumber();
      gameData.won = hasWon;
      gameData.gameOver = gameData.curRow === 2 || hasWon;
      
      if(gameData.curRow < 2 && !hasWon) {
        tries[gameData.curRow + 1] = gameData.encryptedSolution;
      }
      
      if(!hasWon) gameData.curRow++;
      gameData.tries = tries;
      gameData.cards = gameData.cards.map((item: CardProps) => {
        item.flipped = false;
        return item;
      });

      localStorage.setItem(COLLECTION, JSON.stringify(gameData));
      setTries([...tries]);
      setCards([...gameData.cards])
      setGameData({...gameData});
    }
  }, [
    tries,
    setTries,
    gameData,
    setCards,
    COLLECTION,
    setGameData,
  ]);

  useEffect(() => {
    if (gameData && (letterPosition.current === gameData.solution.length)) {  
      letterPosition.current = 0;
      checkHits();      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tries]);

  return(
    <Container>
      {
        tries.map((item, index) => (
          <Content key={index}>
            {
              item.map((letter, index) => (
                <Letter
                  key={index}
                  char={letter.char}
                  status={letter.status}
                />
              ))
            }
          </Content>
        )) 
      }
    </Container>
  );
}

export default memo(GameWord);