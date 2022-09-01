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
import Script from 'next/script';
import * as gtag from '../lib/gtag';
import SideAdsense from '../components/SideAdsense';

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

    const handleRouteChangeComplete = (url: string) => {
      changing.current = false;
      gtag.pageview(url);
      setLoading(false);
    }

    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('hashChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>CriptoMemória</title>
      </Head>
      <GlobalStyle />
      {loading && <LoadScreen />}

      <Container>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
          <SideAdsense />
          <Main 
            id='main' 
            style={
              pathname !== '/about' 
                ? {flexDirection: 'column-reverse'} : undefined
            }
          >
            <Component {...pageProps} />
          </Main>
          <SideAdsense />
        </div>
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
