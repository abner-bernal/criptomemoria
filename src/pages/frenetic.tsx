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
import { emptyWord } from "../utils/word-utils";
import Head from "next/head";

const FreneticMode: NextPage = () => {
  const [gameData, setGameData] = useState<GameDataProps>();
  const [tries, setTries] = useState<LetterProps[][]>(() => {
    const empty = emptyWord(5);
    return [empty, empty, empty, empty]
  });
  const [cards, setCards] = useState<CardProps[]>();
  const [start, setStart] = useState<boolean>(false);

  const letterPosition = useRef<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem(COLLECTION_EASY_FRENETIC);
    const curDay = dayNumber();
    let newData = true;

    if(storedData) {
      const data: GameDataProps = JSON.parse(storedData);

      if(data.curDay === curDay) {
        const sortCards = sortArray(data.cards);
        setCards([...sortCards]);
        setTries([...data.tries]);
        setGameData({...data});
        newData = false;
      }      
    }

    if(newData) {
      const initialData = initialGameData(words[curDay], curDay);

      setCards([...initialData.cards]);
      setTries([...initialData.tries]);
      setGameData({...initialData});
    }
  }, [])

  const handleGameOver = useCallback((hasWin: boolean) => {
    //Fim de Jogo
    setStart(false);
  }, []);

  return (
    <Container>
      <Head>
        <title>CRIPTO | Frenético</title>
      </Head>
      <Header page='frenetic'/>
      <Main>
        <GameHeader
          leftContent={
            start ? 
              <Timer cards={cards} setCards={setCards} start={start}/>
            :
              <ButtonStart 
                disabled={gameData ? gameData.gameOver : true} 
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

export default FreneticMode