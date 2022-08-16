import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../global/styles'
import { theme } from '../global/styles/theme'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import LoadScreen from '../components/LoadScreen';
import { Header } from '../components/Header';

import { Container, Main } from '../global/styles/pages';
import GameInstructions from '../components/GameInstructions';

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
      {loading && <LoadScreen />}
      <GlobalStyle />
      <Container>
        <Main id='main'>
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
