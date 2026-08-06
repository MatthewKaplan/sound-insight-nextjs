import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Breadcrumb from './breadcrumb';
import ConversionBand from './conversionBand';
import LogoGrid, { LogoItem } from './logoGrid';
import { BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '../helper/structured-data';
import classes from './styles/servicePageLayout.module.css';

export type ServiceSection = {
  title: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
};

export type BrandGroup = {
  label: string;
  items: LogoItem[];
};

type Props = {
  name: string;
  title: string;
  intro: string;
  ctaLabel: string;
  sections: ServiceSection[];
  brandGroups?: BrandGroup[];
  bandTitle?: string;
};

/** Shared template for the five service detail pages. */
const ServicePageLayout: FC<Props> = ({
  name, title, intro, ctaLabel, sections, brandGroups = [], bandTitle
}) => (
  <>
    <Breadcrumb
      crumbs={[
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { label: name }
      ]}
    />

    <header className={`container ${classes.head}`}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.intro}>{intro}</p>
      <div className={classes.headCtas}>
        <Link href="/contact" className="btn btnPrimary">{ctaLabel}</Link>
        <a href={`tel:${BUSINESS_PHONE}`} className="btn btnSecondary">
          {`Call ${BUSINESS_PHONE_DISPLAY}`}
        </a>
      </div>
    </header>

    <div className={`container ${classes.sections}`}>
      {sections.map(({
        title: sectionTitle, paragraphs, imageSrc, imageAlt = ''
      }, index) => (
        <section
          key={sectionTitle}
          className={clsx(classes.row, index % 2 === 1 && classes.rowFlipped)}
        >
          {imageSrc && (
            <div className={classes.rowImgWrap}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className={classes.rowImg}
              />
            </div>
          )}
          <div className={classes.rowBody}>
            <h2 className={classes.rowTitle}>{sectionTitle}</h2>
            {paragraphs.filter(Boolean).map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={classes.rowCopy}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>

    {brandGroups.length > 0 && (
      <section className={`container section ${classes.brands}`}>
        <h2 className={classes.brandsTitle}>{`Brands we carry for ${name.toLowerCase()}`}</h2>
        <p className={classes.brandsSub}>
          Every line below is on our floor or a demo away —
          {' '}
          <Link href="/products">see the full product range</Link>
          .
        </p>
        {brandGroups.map(({ label, items }) => (
          <div key={label} className={classes.brandGroup}>
            <h3 className={classes.brandGroupLabel}>{label}</h3>
            <LogoGrid items={items} ariaLabel={`${label} brands`} />
          </div>
        ))}
      </section>
    )}

    <ConversionBand
      title={bandTitle}
      primaryLabel={ctaLabel}
    />
  </>
);

export default ServicePageLayout;
