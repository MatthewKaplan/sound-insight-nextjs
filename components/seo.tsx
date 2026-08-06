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
const DEFAULT_IMAGE = 'https://res.cloudinary.com/sound-insight/image/upload/v1640911039/WIgvnFB_swl61h.jpg';
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
  imageAlt = DEFAULT_IMAGE_ALT,
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  structuredData
}) => {
  const canonicalUrl = getAbsoluteUrl(path);
  // Cap social images at one — crawlers only use the first, and the products
  // page used to emit dozens.
  const primaryImage = images && images.length > 0 ? images[0] : DEFAULT_IMAGE;
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
      <meta property="og:image" content={primaryImage} />
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

export default Seo;
