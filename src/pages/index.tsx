import { useCallback, useEffect, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from 'next'

import { GameDataProps, initialGameData } from "../utils/data-utils";
import { COLLECTION_EASY_CLASSIC } from "../configs/database";
import { dayNumber } from "../utils/date-utils";
import { words } from '../data/easyClassicMode';

import { Container, Main } from "../global/styles/pages";

import { LetterProps } from "../components/Letter";
import GameHeader from "../components/GameHeader";
import { Header } from "../components/Header";
import GameWord from "../components/GameWord";
import { CardProps } from "../components/Card";
import Grid from "../components/Grid";

type HomeProps = {
  initialData: GameDataProps;
}

const Home: NextPage<HomeProps> = ({initialData}: HomeProps) => {
  const [gameData, setGameData] = useState<GameDataProps>(initialData);
  const [tries, setTries] = useState<LetterProps[][]>(initialData.tries);
  const [cards, setCards] = useState<CardProps[]>(initialData.cards);

  const letterPosition = useRef<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem(COLLECTION_EASY_CLASSIC);

    if(storedData) {
      const data: GameDataProps = JSON.parse(storedData);
      if(data.curDay === gameData.curDay) {
        setCards([...data.cards]);
        setTries([...data.tries]);
        setGameData({...data});
      }      
    }
  }, [gameData.curDay])

  const handleGameOver = useCallback((hasWin: boolean) => {
    //Fim de Jogo
  }, []);
  
  return (
    <Container>
      <Header subtitle="Modo Clássico"/>
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
          active={!gameData.gameOver}
          letterPosition={letterPosition}
        />
      </Main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const curDay = dayNumber();
  const initialData = initialGameData(words[curDay]);
  
  return {
    props: {
      initialData
    }
  }
}

export default Home;