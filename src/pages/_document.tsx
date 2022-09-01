import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import Script from 'next/script'

import { ServerStyleSheet } from 'styled-components'

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
            sheet.collectStyles(
              <>
                <App {...props} />
                {/* <Script 
                  charSet="UTF-8" 
                  strategy='beforeInteractive'
                  src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" 
                /> */}
                <Script
                  async 
                  crossOrigin="anonymous"
                  strategy='beforeInteractive'
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4905108546886726"
                />
              </>
            ),
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
}