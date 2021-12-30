import Script from 'next/script';
import Head from 'next/dist/shared/lib/head';
import { FC } from 'react';

const Analytics: FC = () => {
  const url = `https://www.googletagmanager.com/gtag/js?id=${process.env.google_analytics || ''}`;
  return (
    <Head>
      <Script
        src={url}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.google_analytics || ''});
        `}
      </Script>
    </Head>
  );
};

export default Analytics;
