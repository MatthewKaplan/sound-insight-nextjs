import Script from 'next/script';
import { FC } from 'react';

const Analytics: FC = () => {
  const url = `https://www.googletagmanager.com/gtag/js?id=${process.env.google_analytics || 'UA-148182336-1'}`;
  return (
    <>
      <Script
        src={url}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.google_analytics || 'UA-148182336-1'});
        `}
      </Script>
    </>
  );
};

export default Analytics;
