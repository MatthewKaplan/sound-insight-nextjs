import { GetStaticProps } from 'next';
import { FC } from 'react';
import Link from 'next/link';
import Seo from '../components/seo';
import Hero from '../components/hero';
import InquiryForm from '../components/inquiryForm';
import { getPageById, REVALIDATE_SECONDS } from '../helper/api-util';
import {
  BUSINESS_CITY,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_POSTAL_CODE,
  BUSINESS_REGION,
  BUSINESS_STREET_ADDRESS,
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildLocalBusinessSchema
} from '../helper/structured-data';
import classes from './styles/contact.module.css';
import { ContactPageData } from '../types/contactPage.type';

const DIRECTIONS_URL = 'https://maps.google.com?daddr=382+New+York+Avenue+Huntington+NY+11743';
const MAP_EMBED_URL = 'https://maps.google.com/maps?q=382%20New%20York%20Ave%20Huntington%2C%20NY%2011743&t=&z=15&ie=UTF8&iwloc=&output=embed';

const ContactPage: FC<ContactPageData> = ({ SplashImg }) => (
  <>
    <Seo
      title="Sound Insight - Contact Us | Audio & Video Demos | Free Estimates"
      description="Let our Experienced Team Help with your Next AV Design, Install or Service for your Home, Business, or Entertainment Space. FREE ESTIMATES! #1 AV on Long Island."
      path="/contact"
      structuredData={[
        buildLocalBusinessSchema('/contact'),
        buildContactPageSchema(),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ])
      ]}
    />
    <Hero
      compact
      title="Tell us about your project"
      eyebrow="Contact"
      subtitle="A demo, a free in-home estimate, or just a question — one form, one business day to hear back."
      imageSrc={SplashImg}
      imageAlt=""
    />

    <div className={`container section ${classes.layout}`}>
      <section aria-labelledby="contact-form-heading" className={classes.formCol}>
        <h2 id="contact-form-heading" className={classes.colTitle}>Send us a note</h2>
        <InquiryForm headingId="contact-form-heading" />
      </section>

      <aside className={classes.infoCol}>
        <h2 className={classes.colTitle}>Or come hear it in person</h2>
        <div className={classes.mapWrap}>
          <iframe
            title="Map to the Sound Insight showroom"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <address className={classes.address}>
          {BUSINESS_STREET_ADDRESS}
          <br />
          {`${BUSINESS_CITY}, ${BUSINESS_REGION} ${BUSINESS_POSTAL_CODE}`}
        </address>
        <dl className={classes.hours}>
          <div>
            <dt>Mon – Sat</dt>
            <dd>10:00 AM – 6:00 PM</dd>
          </div>
          <div>
            <dt>Sunday</dt>
            <dd>By appointment</dd>
          </div>
        </dl>
        <div className={classes.infoCtas}>
          <a href={`tel:${BUSINESS_PHONE}`} className="btn btnSecondary">
            {`Call ${BUSINESS_PHONE_DISPLAY}`}
          </a>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnSecondary"
          >
            Get directions
          </a>
        </div>
        <p className={classes.altContact}>
          Prefer email?
          {' '}
          <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
        </p>
        <p className={classes.altContact}>
          Interested in working here?
          {' '}
          <Link href="/about#careers">See open roles</Link>
        </p>
      </aside>
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_CONTACT');

  return {
    props: featuredPage,
    revalidate: REVALIDATE_SECONDS
  };
};

export default ContactPage;
