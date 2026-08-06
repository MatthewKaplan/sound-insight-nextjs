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
      <meta name="author" content="Matthew Kaplan" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148182336-1" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-148182336-1', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
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
