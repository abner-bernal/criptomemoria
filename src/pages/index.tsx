import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from 'next'

import { GameDataProps, initialGameData } from "../utils/data-utils";
import { COLLECTION_EASY_CLASSIC } from "../configs/database";
import { emptyWord } from "../utils/word-utils";
import { dayNumber } from "../utils/date-utils";
import { words } from '../data/easyClassicMode';

import { Container, Main } from "../global/styles/pages";

import { LetterProps } from "../components/Letter";
import GameHeader from "../components/GameHeader";
import { CardProps } from "../components/Card";
import { Header } from "../components/Header";
import GameWord from "../components/GameWord";
import Grid from "../components/Grid";
import Head from "next/head";


const Home: NextPage = () => {
  const [gameData, setGameData] = useState<GameDataProps>();
  const [tries, setTries] = useState<LetterProps[][]>(() => {
    const empty = emptyWord(5);
    return [empty, empty, empty, empty]
  });
  const [cards, setCards] = useState<CardProps[]>();

  const letterPosition = useRef<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem(COLLECTION_EASY_CLASSIC);
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
      const initialData = initialGameData(words[curDay], curDay);

      setCards([...initialData.cards]);
      setTries([...initialData.tries]);
      setGameData({...initialData});
    }    
  }, [])

  const handleGameOver = useCallback((hasWin: boolean) => {
    //Fim de Jogo
  }, []);
  
  return (
    <Container>
      <Head>
        <title>CRIPTO | Clássico</title>
      </Head>
      <Header page='classic'/>
      <Main>
        <GameHeader />
        <GameWord
          tries={tries}
          setTries={setTries}
          setCards={setCards}
          gameData={gameData}
          setGameData={setGameData}
          onGameOver={handleGameOver}
          letterPosition={letterPosition}
          COLLECTION={COLLECTION_EASY_CLASSIC}
        />
        <Grid 
          cards={cards}
          tries={tries}
          setTries={setTries}
          gameData={gameData}
          active={!gameData?.gameOver}
          letterPosition={letterPosition}
        />
      </Main>
    </Container>
  )
}

export default Home;