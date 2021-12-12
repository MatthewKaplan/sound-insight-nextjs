import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorModeProvider, CSSReset, theme, ThemeProvider } from '@chakra-ui/react'
import MainContainer from '../containers/main'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider options={{
        useSystemColorMode: true
      }}>
        <CSSReset />
        <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default MyApp
