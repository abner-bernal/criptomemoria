import Document, { 
  DocumentContext, 
  DocumentInitialProps, 
  Head, 
  Html, 
  Main, 
  NextScript 
} from 'next/document';
import Script from 'next/script';

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return(
      <Html>
        <Head>
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


          {/* google adsense */}
          {/* <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4905108546886726" 
            crossOrigin="anonymous"
          ></script> */}

        </Head>
        
        <body>
          <Script
            async 
            crossOrigin="anonymous"
            strategy='beforeInteractive'
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4905108546886726"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

/*  <Script 
      charSet="UTF-8" 
      strategy='beforeInteractive'
      src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" 
    /> */
      