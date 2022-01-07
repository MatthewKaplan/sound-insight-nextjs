import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ColorModeProvider, CSSReset, theme, ThemeProvider
} from '@chakra-ui/react';
import Script from 'next/script';
import { FC } from 'react';
import MainContainer from '../containers/main';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=UA-148182336-1"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-148182336-1');
        `}
    </Script>
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
      <link rel="canonical" href="https://sound-insight.com/" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content="The Very Best in Audio and Video Since 2002. Let our Team Help You Find the Right Technology to Match Your Home or Office." />
      <meta name="twitter:title" content="Sound Insight - Custom AV Solution & Design | Huntington, NY" />
      <meta name="twitter:image" content="https://i.imgur.com/TXAMHbb.png" />
      <meta name="twitter:site" content="@matthewkaplan92" />
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
