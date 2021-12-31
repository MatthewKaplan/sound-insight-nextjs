import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ColorModeProvider, CSSReset, theme, ThemeProvider
} from '@chakra-ui/react';
import { FC } from 'react';
import MainContainer from '../containers/main';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <link rel="canonical" href="https://www.sound-insight.com/services" />
      <meta name="twitter:site" content="@matthewkaplan92" />
      <meta property="twitter:account_id" content="272097095" />
      <meta property="twitter:title" content="Sound Insight - Custom AV Solution & Design | Huntington, NY" />
      <meta property="twitter:description" content="Providing Long Island, NY with the very best in Audio and Video since 2002. Let our Knowledgeable Team Help You Find the Right Technology to Match Your Home or Office." />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image:src" content="https://i.imgur.com/TXAMHbb.png" />
    </Head>
    <ThemeProvider theme={theme}>
      <ColorModeProvider options={{
        useSystemColorMode: true
      }}
      >
        <CSSReset />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </ColorModeProvider>
    </ThemeProvider>
  </>
);

export default MyApp;
