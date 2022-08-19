import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { medium } from "../data/mediumClassicMode";
import { easy } from "../data/easyFreneticMode";
import { hard } from "../data/hardClassicMode";
import { 
  COLLECTION_MEDIUM_FRENETIC, 
  COLLECTION_EASY_FRENETIC, 
  COLLECTION_HARD_FRENETIC, 
  FRENETIC_CURRENT_LEVEL 
} from "../configs/database";

import { GameDataProps, initialGameData } from "../utils/data-utils";
import { sortArray } from "../utils/card-utils";
import { dayNumber } from "../utils/date-utils";
import { emptyWord } from "../utils/word-utils";

import { TextTimer, ButtonStart } from "../global/styles/freneticPage";

import GameHeader, { GameLevel } from "../components/GameHeader";
import GameOverModal from "../components/GameOverModal";
import { LetterProps } from "../components/Letter";
import { CardProps } from "../components/Card";
import GameWord from "../components/GameWord";
import Grid from "../components/Grid";
import BuyMeACoffee from "../components/BuyMeACoffee";

const FreneticMode: NextPage = () => {
  const [isGameOverModalOpen, setGameOverModalOpen] = useState<boolean>(false);
  const [tries, setTries] = useState<LetterProps[][]>(() => {
    const empty = emptyWord(5);
    return [empty, empty, empty]
  });
  const [gameData, setGameData] = useState<GameDataProps>();
  const [level, setLevel] = useState<GameLevel>('easy');
  const [cards, setCards] = useState<CardProps[]>();
  const [start, setStart] = useState<boolean>(false);

  const letterPosition = useRef<number>(0);
  const collectionMode = useRef<string>();
  const words = useRef<string[]>();

  useEffect(() => {
    const storedCurLevel = localStorage.getItem(FRENETIC_CURRENT_LEVEL);
    const curLevel: GameLevel = storedCurLevel 
      ? JSON.parse(storedCurLevel) 
      : undefined;

    if(curLevel && curLevel !== level) setLevel(curLevel);

    switch (curLevel) {
      case 'medium':
        words.current = medium;
        collectionMode.current = COLLECTION_MEDIUM_FRENETIC;
        break;
      case 'hard':
        words.current = hard;
        collectionMode.current = COLLECTION_HARD_FRENETIC;
        break;
      default:
        words.current = easy;
        collectionMode.current = COLLECTION_EASY_FRENETIC;
        break;
    }

    const storedData = localStorage.getItem(collectionMode.current);
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
      const initialData = initialGameData(words.current[curDay], curDay);

      setCards([...initialData.cards]);
      setTries([...initialData.tries]);
      setGameData({...initialData});
    }
  }, [level])

  useEffect(() => {
    if(gameData?.gameOver) {
      setStart(false);
      setGameOverModalOpen(true);
    }
  }, [gameData?.gameOver])

  return (
    <>
      <Head>
        <title>CRIPTO | Frenético</title>
      </Head>
      <BuyMeACoffee />
      <Grid 
        cards={cards}
        tries={tries}
        active={start}
        setTries={setTries}
        gameData={gameData}
        letterPosition={letterPosition}
      />
      <GameWord
        tries={tries}
        setTries={setTries}
        setCards={setCards}
        gameData={gameData}
        setGameData={setGameData}
        letterPosition={letterPosition}
        COLLECTION={collectionMode.current}
      />
      <GameHeader
        level={level}
        GameMode={FRENETIC_CURRENT_LEVEL}
        setLevel={setLevel}
        setStart={setStart}
        leftContent={
          start ? 
            <Timer cards={cards} setCards={setCards} start={start} level={level}/>
            :
            <ButtonStart 
            disabled={gameData ? gameData.gameOver : true} 
            onClick={() => setStart(true)}
            >Iniciar</ButtonStart>
          }
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        setOpen={setGameOverModalOpen}
        finalTry={gameData?.curRow}
      />
    </>
  )
}

type TimerProps = {
  start: boolean;
  cards?: CardProps[];
  level: GameLevel;
  setCards: (cards: CardProps[]) => void;
}

const Timer = ({cards, setCards, start, level}: TimerProps) => {
  
  const startTime = useMemo(() => {
    switch (level) {
      case 'medium':
        return {minute: 2, second: 20}
      case 'hard':
        return {minute: 3, second: 20}
      default:
        return {minute: 1, second: 40}
    }
  }, [level]);
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