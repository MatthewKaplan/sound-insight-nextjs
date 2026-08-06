export type JsonLd = {
  [key: string]: string | number | boolean | JsonLd | Array<string | number | boolean | JsonLd>;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export const SITE_NAME = 'Sound Insight';
export const SITE_URL = 'https://sound-insight.com';
export const DEFAULT_SOCIAL_IMAGE = 'https://i.imgur.com/TXAMHbb.png';
export const BUSINESS_PHONE = '+1-631-271-4434';
export const BUSINESS_PHONE_DISPLAY = '631.271.4434';
export const BUSINESS_EMAIL = 'sales@sound-insight.com';
export const BUSINESS_STREET_ADDRESS = '382 New York Ave';
export const BUSINESS_CITY = 'Huntington';
export const BUSINESS_REGION = 'NY';
export const BUSINESS_POSTAL_CODE = '11743';
export const BUSINESS_COUNTRY = 'US';
export const BUSINESS_PRICE_RANGE = '$$';

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export const getAbsoluteUrl = (path: string) => new URL(normalizePath(path), SITE_URL).toString();

const buildPostalAddress = (): JsonLd => ({
  '@type': 'PostalAddress',
  streetAddress: BUSINESS_STREET_ADDRESS,
  addressLocality: BUSINESS_CITY,
  addressRegion: BUSINESS_REGION,
  postalCode: BUSINESS_POSTAL_CODE,
  addressCountry: BUSINESS_COUNTRY
});

const buildContactPoint = (): JsonLd => ({
  '@type': 'ContactPoint',
  contactType: 'customer service',
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  url: getAbsoluteUrl('/contact'),
  areaServed: ['Huntington', 'Long Island', 'New York'],
  availableLanguage: 'English'
});

export const buildOrganizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_SOCIAL_IMAGE,
  image: DEFAULT_SOCIAL_IMAGE,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  address: buildPostalAddress(),
  contactPoint: [buildContactPoint()]
});

export const buildLocalBusinessSchema = (path = '/'): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  mainEntityOfPage: getAbsoluteUrl(path),
  image: DEFAULT_SOCIAL_IMAGE,
  logo: DEFAULT_SOCIAL_IMAGE,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  priceRange: BUSINESS_PRICE_RANGE,
  address: buildPostalAddress(),
  areaServed: ['Huntington', 'Long Island', 'New York'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '18:00'
    }
  ],
  contactPoint: [buildContactPoint()],
  parentOrganization: {
    '@id': `${SITE_URL}/#organization`
  }
});

export const buildContactPageSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${getAbsoluteUrl('/contact')}#contact-page`,
  name: `Contact ${SITE_NAME}`,
  description: 'Contact Sound Insight for audio, video, automation, security, and phone system consultations.',
  url: getAbsoluteUrl('/contact'),
  mainEntity: {
    '@id': `${SITE_URL}/#localbusiness`
  },
  about: {
    '@id': `${SITE_URL}/#organization`
  }
});

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getAbsoluteUrl(item.path)
  }))
});

export const buildServiceSchema = ({
  name,
  description,
  path,
  serviceType
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${getAbsoluteUrl(path)}#service`,
  name,
  description,
  serviceType: serviceType || name,
  provider: {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE
  },
  areaServed: ['Huntington', 'Long Island', 'New York'],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: getAbsoluteUrl('/contact')
  },
  url: getAbsoluteUrl(path)
});
