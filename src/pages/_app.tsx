import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import Head from 'next/head';

import { ThemeProvider } from 'styled-components'

import { Container, Main } from '../global/styles/pages';
import { GlobalStyle } from '../global/styles'
import { theme } from '../global/styles/theme'

import GameInstructions from '../components/GameInstructions';
import LoadScreen from '../components/LoadScreen';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [
    isInstructionModalOpen, 
    setIsInstructionModalOpen
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const changing = useRef(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      changing.current = true;
      setTimeout(() => {
        changing.current && setLoading(true);
      }, 40)
    }
    const handleRouteChangeComplete = () => {
      changing.current = false;
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const main = document.getElementById('main');

    if(main) {
      setTimeout(() => {
        main.style.position = isInstructionModalOpen ? 'fixed' : 'unset';
      }, 500)
    }
    
  }, [isInstructionModalOpen])

  const { pathname } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>CriptoMemória</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> 
      </Head>
      <GlobalStyle />
      {loading && <LoadScreen />}

      <Container>
        <Main 
          id='main' 
          style={
            pathname !== '/about' 
              ? {flexDirection: 'column-reverse'} : undefined
          }
        >
          <Component {...pageProps} />
        </Main>
        <Header setIsInstructionModalOpen={setIsInstructionModalOpen}/>
      </Container>

      <GameInstructions
        initialPage={pathname} 
        isOpen={isInstructionModalOpen} 
        setOpen={setIsInstructionModalOpen}
      />
    </ThemeProvider>
  )
}

export default MyApp
