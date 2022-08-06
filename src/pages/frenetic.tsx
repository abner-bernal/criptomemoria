import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from "next";

import { GameDataProps, initialGameData } from "../utils/data-utils";
import { sortArray } from "../utils/card-utils";
import { COLLECTION_EASY_FRENETIC } from "../configs/database";
import { words } from "../data/easyFreneticMode";
import { dayNumber } from "../utils/date-utils";

import { TextTimer, ButtonStart } from "../global/styles/freneticPage";

import { LetterProps } from "../components/Letter";
import GameHeader from "../components/GameHeader";
import { CardProps } from "../components/Card";
import { Header } from "../components/Header";
import GameWord from "../components/GameWord";
import Grid from "../components/Grid";

import { Container, Main } from "../global/styles/pages";

type FreneticModeProps = {
  initialData: GameDataProps;
}

const FreneticMode: NextPage<FreneticModeProps> = ({ initialData }: FreneticModeProps) => {
  const [gameData, setGameData] = useState<GameDataProps>(initialData);
  const [tries, setTries] = useState<LetterProps[][]>(initialData.tries);
  const [cards, setCards] = useState<CardProps[] | undefined>(initialData.cards);
  const [start, setStart] = useState<boolean>(false);

  const letterPosition = useRef<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem(COLLECTION_EASY_FRENETIC);
    
    if(storedData) {
      const data: GameDataProps = JSON.parse(storedData);
      if(data.curDay === gameData.curDay) {
        const sortCards = sortArray(data.cards);
        setCards([...sortCards]);
        setTries([...data.tries]);
        setGameData({...data});
      }      
    }
  }, [gameData.curDay])

  const handleGameOver = useCallback((hasWin: boolean) => {
    //Fim de Jogo
    setStart(false);
  }, []);

  return (
    <Container>
      <Header subtitle="Modo Frenético"/>
      <Main>
        <GameHeader
          leftContent={
            start ? 
              <Timer cards={cards} setCards={setCards} start={start}/>
            :
              <ButtonStart 
                disabled={gameData.gameOver} 
                onClick={() => setStart(true)}
              >Iniciar</ButtonStart>
          }
        />
        <GameWord
          tries={tries}
          setTries={setTries}
          setCards={setCards}
          gameData={gameData}
          setGameData={setGameData}
          onGameOver={handleGameOver}
          letterPosition={letterPosition}
          COLLECTION={COLLECTION_EASY_FRENETIC}
        />
        <Grid 
          cards={cards}
          tries={tries}
          active={start}
          setTries={setTries}
          gameData={gameData}
          letterPosition={letterPosition}
        />
      </Main>
    </Container>
  )
}

type TimerProps = {
  start: boolean;
  cards?: CardProps[];
  setCards: (cards: CardProps[]) => void;
}

const Timer = ({cards, setCards, start}: TimerProps) => {
  const startTime = useMemo(() => ({minute: 1, second: 30}), []);
  const [counter, setCounter] = useState(startTime);
  
  const zeroPad = (num: number) => {
    return num.toString().padStart(2, "0");
  }

  const handleRestartGame = useCallback(() => {
    if(cards) {
      const newStateCards = cards.map((card) => {
        card.flipped = false;
        return card;
      });    
      const newCards = sortArray(newStateCards);

      setCards([...newCards]);
    }
  }, [cards, setCards])

  useEffect(() => {
    if(counter.minute >= 0 && counter.second >= 0 && start) {        
      setTimeout(() => {
        if(counter.minute > 0 && counter.second === 0) {
          setCounter({minute: counter.minute-1, second: 59});
        } else if(counter.second > 0) {
          setCounter({minute: counter.minute, second: counter.second-1});            
        } else {
          handleRestartGame();
          setCounter(startTime);
        }
      }, 1000);
    }
  }, [counter, start, handleRestartGame, startTime]);

  return(
    <TextTimer>{zeroPad(counter.minute)}:{zeroPad(counter.second)}</TextTimer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const curDay = dayNumber();
  console.log(curDay);
  const initialData = initialGameData(words[curDay], curDay);
  
  return {
    props: {
      initialData
    }
  }
}

export default FreneticMode