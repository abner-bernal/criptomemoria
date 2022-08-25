import { useEffect, useRef, useState } from "react";
import { NextPage } from 'next'
import Head from "next/head";

import { medium } from "../data/mediumClassicMode";
import { easy } from '../data/easyClassicMode';
import { hard } from "../data/hardClassicMode";
import { 
  COLLECTION_MEDIUM_CLASSIC, 
  COLLECTION_EASY_CLASSIC, 
  COLLECTION_HARD_CLASSIC, 
  CLASSIC_CURRENT_LEVEL,
} from "../configs/database";

import { GameDataProps, initialGameData } from "../utils/data-utils";
import { dayNumber } from "../utils/date-utils";
import { emptyWord } from "../utils/word-utils";

import GameHeader, { GameLevel } from "../components/GameHeader";
import GameOverModal from "../components/GameOverModal";
import { LetterProps } from "../components/Letter";
import { CardProps } from "../components/Card";
import GameWord from "../components/GameWord";
import Grid from "../components/Grid";
import BuyMeACoffee from "../components/BuyMeACoffee";

const Home: NextPage = () => {
  const [isGameOverModalOpen, setGameOverModalOpen] = useState<boolean>(false);
  const [tries, setTries] = useState<LetterProps[][]>(() => {
    const empty = emptyWord(5);
    return [empty, empty, empty]
  });
  const [gameData, setGameData] = useState<GameDataProps>();
  const [level, setLevel] = useState<GameLevel>('easy');
  const [cards, setCards] = useState<CardProps[]>();

  const letterPosition = useRef<number>(0);
  const collectionMode = useRef<string>();
  const words = useRef<string[]>();

  useEffect(() => {
    const storedCurLevel = localStorage.getItem(CLASSIC_CURRENT_LEVEL);
    const curLevel: GameLevel = storedCurLevel 
      ? JSON.parse(storedCurLevel) 
      : undefined;

    if(curLevel && curLevel !== level) setLevel(curLevel);

    switch (curLevel) {
      case 'medium':
        words.current = medium;
        collectionMode.current = COLLECTION_MEDIUM_CLASSIC;
        break;
      case 'hard':
        words.current = hard;
        collectionMode.current = COLLECTION_HARD_CLASSIC;
        break;
      default:
        words.current = easy;
        collectionMode.current = COLLECTION_EASY_CLASSIC;
        break;
    }

    const storedData = localStorage.getItem(collectionMode.current);
    const curDay = dayNumber();
    let newData = true;

    if(storedData) {
      const data: GameDataProps = JSON.parse(storedData);
      
      if(data.curDay === curDay) {
        setCards([...data.cards]);
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
      setGameOverModalOpen(true);
    }
  }, [gameData?.gameOver])
  
  return (
    <>
      <Head>
        <title>CRIPTO | Clássico</title>
      </Head>
      {/* <BuyMeACoffee /> */}
      <Grid 
        cards={cards}
        tries={tries}
        setTries={setTries}
        gameData={gameData}
        active={!gameData?.gameOver}
        letterPosition={letterPosition}
      />
      <GameWord
        tries={tries}
        setTries={setTries}
        setCards={setCards}
        gameData={gameData}
        COLLECTION={collectionMode.current}
        setGameData={setGameData}
        letterPosition={letterPosition}
      />
      <GameHeader 
        level={level} 
        setLevel={setLevel} 
        GameMode={CLASSIC_CURRENT_LEVEL}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        setOpen={setGameOverModalOpen}
        finalTry={gameData?.curRow}
      />
    </>
  )
}

export default Home;