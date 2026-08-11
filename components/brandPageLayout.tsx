import { FC } from 'react';
import Link from 'next/link';
import Breadcrumb from './breadcrumb';
import ConversionBand from './conversionBand';
import InquiryForm from './inquiryForm';
import LogoGrid, { LogoItem } from './logoGrid';
import {
  BUSINESS_CITY,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_POSTAL_CODE,
  BUSINESS_REGION,
  BUSINESS_STREET_ADDRESS
} from '../helper/structured-data';
import { Brand } from '../data/brands';
import classes from './styles/brandPageLayout.module.css';

type Props = {
  brand: Brand;
  /** Logo URL resolved from Firebase, when the alt-text join found one. */
  logoSrc?: string;
  /** Sibling brand pages (already carrying hrefs) for the related grid. */
  relatedItems: LogoItem[];
};

/** Shared template for the /brands/[slug] manufacturer landing pages. */
const BrandPageLayout: FC<Props> = ({ brand, logoSrc, relatedItems }) => {
  const {
    name, authorizedDealer, intro, sections, localAngle, serviceLinks
  } = brand;
  const locality = `${BUSINESS_CITY}, ${BUSINESS_REGION}`;
  // "Authorized Dealer" is a legal claim — gated behind per-brand confirmation.
  const heading = authorizedDealer
    ? `Authorized ${name} Dealer in ${locality}`
    : `${name} in ${locality}`;

  return (
    <>
      <Breadcrumb
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/products#brands', label: 'Brands' },
          { label: name }
        ]}
      />

      <header className={`container ${classes.head}`}>
        {logoSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt={`${name} logo`} className={classes.headLogo} width={180} height={72} />
        )}
        <span className={classes.eyebrow}>Brands we carry</span>
        <h1 className={classes.title}>{heading}</h1>
        <p className={classes.intro}>{intro}</p>
        <div className={classes.headCtas}>
          <Link href="/contact" className="btn btnPrimary">{`Hear ${name} in our showroom`}</Link>
          <a href={`tel:${BUSINESS_PHONE}`} className="btn btnSecondary">
            {`Call ${BUSINESS_PHONE_DISPLAY}`}
          </a>
        </div>
      </header>

      <div className={`container ${classes.sections}`}>
        {sections.map(({ title, paragraphs }) => (
          <section key={title}>
            <h2 className={classes.sectionTitle}>{title}</h2>
            {paragraphs.filter(Boolean).map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={classes.sectionCopy}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className={classes.localBlock} aria-label={`Hear ${name} locally`}>
          <h2 className={classes.localTitle}>{`Hear ${name} in our ${BUSINESS_CITY} showroom`}</h2>
          <p className={classes.localCopy}>{localAngle}</p>
          <p className={classes.localAddress}>
            {`${BUSINESS_STREET_ADDRESS}, ${BUSINESS_CITY}, ${BUSINESS_REGION} ${BUSINESS_POSTAL_CODE} · Mon–Sat 10–6, Sunday by appointment`}
          </p>
        </section>

        <section aria-label={`Services featuring ${name}`}>
          <h2 className={classes.sectionTitle}>{`What we do with ${name}`}</h2>
          <ul className={classes.serviceLinks}>
            {serviceLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
            <li>
              <Link href="/products">See everything on our floor</Link>
            </li>
          </ul>
        </section>
      </div>

      {relatedItems.length > 0 && (
        <section className={`container ${classes.related}`} aria-label="Related brands">
          <h2 className={classes.relatedTitle}>Related brands we carry</h2>
          <LogoGrid items={relatedItems} ariaLabel="Related brands" />
        </section>
      )}

      <section className={`container ${classes.inquiry}`} aria-labelledby="brand-inquiry-heading">
        <h2 id="brand-inquiry-heading" className={classes.inquiryTitle}>{`Ask about ${name}`}</h2>
        <InquiryForm headingId="brand-inquiry-heading" defaultInterest="A showroom visit or demo" />
      </section>

      <ConversionBand
        title={`Hear ${name} before you buy it.`}
        primaryLabel="Book a demo"
      />
    </>
  );
};

export default BrandPageLayout;
