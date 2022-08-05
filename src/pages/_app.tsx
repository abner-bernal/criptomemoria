import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../global/styles'
import { theme } from '../global/styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
