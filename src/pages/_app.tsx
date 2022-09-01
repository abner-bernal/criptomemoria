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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="title" content="CriptoMemória" />
        <meta name="description" content="Descriptografe a palavra mistério em três tentativas. Jogue com a memória e desvende a palavra do dia."/>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.criptomemoria.com/"/>
        <meta property="og:title" content="CriptoMemória"/>
        <meta property="og:description" content="Descriptografe a palavra mistério em três tentativas. Jogue com a memória e desvende a palavra do dia."/>
        <meta property="og:image" content="/linkLogo.png"/>

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://www.criptomemoria.com/"/>
        <meta property="twitter:title" content="CriptoMemória"/>
        <meta property="twitter:description" content="Descriptografe a palavra mistério em três tentativas. Jogue com a memória e desvende a palavra do dia."/>
        <meta property="twitter:image" content="/linkLogo.png"/>
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
