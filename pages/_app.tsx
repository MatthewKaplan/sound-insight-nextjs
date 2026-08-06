import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ColorModeProvider, CSSReset, theme, ThemeProvider
} from '@chakra-ui/react';
import { FC } from 'react';
import MainContainer from '../containers/main';

const GA_TRACKING_ID = 'UA-148182336-1';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Matthew Kaplan" />
    </Head>
    {GA_TRACKING_ID && (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </>
    )}
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
