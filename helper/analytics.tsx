import Script from 'next/script';
import { FC } from 'react';

const Analytics: FC = () => (
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
  </>
);

export default Analytics;
