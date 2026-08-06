import Head from 'next/head';
import { FC } from 'react';
import type { JsonLd } from '../helper/structured-data';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  images?: string[];
  imageAlt?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: JsonLd | JsonLd[];
};

const SITE_NAME = 'Sound Insight';
const SITE_URL = 'https://sound-insight.com';
const DEFAULT_IMAGE = 'https://i.imgur.com/TXAMHbb.png';
const DEFAULT_IMAGE_ALT = 'Sound Insight Logo';
const TWITTER_SITE = '@matthewkaplan92';

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

const getAbsoluteUrl = (path: string) => new URL(normalizePath(path), SITE_URL).toString();

const serializeJsonLd = (schema: JsonLd) => JSON.stringify(schema).replace(/</g, '\\u003c');

const getStructuredDataItems = (structuredData?: JsonLd | JsonLd[]) => {
  if (!structuredData) {
    return [];
  }

  return Array.isArray(structuredData) ? structuredData : [structuredData];
};

const getStructuredDataKey = (schema: JsonLd, path: string) => {
  const schemaId = schema['@id'];

  if (typeof schemaId === 'string') {
    return schemaId;
  }

  const schemaType = schema['@type'];

  return typeof schemaType === 'string' ? `${path}-${schemaType}` : path;
};

const Seo: FC<SeoProps> = ({
  title,
  description,
  path,
  keywords,
  images,
  imageAlt,
  ogType,
  twitterTitle,
  twitterDescription,
  structuredData
}) => {
  const canonicalUrl = getAbsoluteUrl(path);
  const pageImages = images && images.length > 0 ? images : [DEFAULT_IMAGE];
  const primaryImage = pageImages[0];
  const schemas = getStructuredDataItems(structuredData);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      <meta name="twitter:image" content={primaryImage} />
      <meta name="twitter:site" content={TWITTER_SITE} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="dc:title" content={title} />
      <meta property="dc:description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {pageImages.map((image) => (
        <meta key={`og:image:${image}`} property="og:image" content={image} />
      ))}
      <meta property="og:image:secure_url" content={primaryImage} />
      <meta property="og:image:alt" content={imageAlt} />
      {schemas.map((schema) => (
        <script
          key={getStructuredDataKey(schema, path)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(schema)
          }}
        />
      ))}
    </Head>
  );
};

Seo.defaultProps = {
  keywords: undefined,
  images: undefined,
  imageAlt: DEFAULT_IMAGE_ALT,
  ogType: 'website',
  twitterTitle: undefined,
  twitterDescription: undefined,
  structuredData: undefined
};

export default Seo;
