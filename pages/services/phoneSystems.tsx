import Head from 'next/head';
import Link from 'next/link';
import { CSSProperties, FC } from 'react';

const LEGACY_PHONE_SYSTEMS_PATH = '/services/phone-systems';
const CANONICAL_URL = `https://sound-insight.com${LEGACY_PHONE_SYSTEMS_PATH}`;
const redirectPageStyle: CSSProperties = {
  margin: '0 auto',
  maxWidth: '720px',
  padding: '4rem 1.5rem',
  textAlign: 'center'
};

const LegacyPhoneSystemsPage: FC = () => (
  <>
    <Head>
      <title>Redirecting to /services/phone-systems | Sound Insight</title>
      <meta
        name="description"
        content="This legacy phone systems URL has moved to /services/phone-systems."
      />
      <meta name="robots" content="noindex,follow" />
      <meta httpEquiv="refresh" content={`0;url=${LEGACY_PHONE_SYSTEMS_PATH}`} />
      <link rel="canonical" href={CANONICAL_URL} />
      <meta property="og:url" content={CANONICAL_URL} />
    </Head>
    <main style={redirectPageStyle}>
      <h1>Page moved</h1>
      <p>
        This legacy URL now lives at
        {' '}
        <Link href={LEGACY_PHONE_SYSTEMS_PATH}>
          <a>{LEGACY_PHONE_SYSTEMS_PATH}</a>
        </Link>
        .
      </p>
    </main>
  </>
);

export default LegacyPhoneSystemsPage;
