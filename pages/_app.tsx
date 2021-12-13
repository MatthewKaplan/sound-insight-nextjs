import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainContainer from '../containers/main';
import { ColorModeProvider, CSSReset, theme, ThemeProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sound Insight: Custom AV Solution & Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A passion for audio and video since 2002! We design thoughtful, intuitive systems." />
        <meta property="og:title" content="Sound Insight" />
        <meta property="og:description" content="Custom home theater systems offer high performance surround sound and video. Let Sound Insight deliver your dream system." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sound-insight.com/" />
        <meta property="og:site_name" content="Sound Insight" />
        <meta property="og:image" content="https://i.imgur.com/TXAMHbb.png" />
        <meta property="og:image:secure_url" content="https://i.imgur.com/TXAMHbb.png" />
        <meta property="og:image:width" content="1520" />
        <meta property="og:image:height" content="1280" />
        <meta property="og:image:alt" content="Sound Insight Logo" />
        <meta property="dc:title" content="Sound Insight" />
        <meta property="dc:description" content="Custom home theater systems offer high performance surround sound and video. Let Sound Insight deliver your dream system." />
        <meta name="author" content="Matthew Kaplan" />
      </Head>
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
    </>
  )
}

export default MyApp
