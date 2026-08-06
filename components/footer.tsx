import { FC } from 'react';
import Link from 'next/link';
import classes from './styles/footer.module.css';
import {
  BUSINESS_CITY,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_POSTAL_CODE,
  BUSINESS_REGION,
  BUSINESS_STREET_ADDRESS
} from '../helper/structured-data';

const SERVICE_LINKS = [
  { href: '/services/audio', label: 'Home Audio' },
  { href: '/services/video', label: 'Home Cinema & Video' },
  { href: '/services/automation', label: 'Home Automation' },
  { href: '/services/security', label: 'Security' },
  { href: '/services/phone-systems', label: 'Business Phone Systems' }
];

const COMPANY_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/products#brands', label: 'Brands we carry' },
  { href: '/gallery', label: 'Project gallery' },
  { href: '/about', label: 'About us' },
  { href: '/about#careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' }
];

const FooterComponent: FC = () => (
  <footer className={classes.footer}>
    <div className={`container ${classes.grid}`}>
      <div className={classes.brandCol}>
        <p className={classes.brandName}>Sound Insight</p>
        <p className={classes.tagline}>
          Custom audio, video, and automation — designed, installed, and
          supported on Long Island since 2002.
        </p>
        <address className={classes.address}>
          {BUSINESS_STREET_ADDRESS}
          <br />
          {`${BUSINESS_CITY}, ${BUSINESS_REGION} ${BUSINESS_POSTAL_CODE}`}
          <br />
          <a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE_DISPLAY}</a>
          <br />
          <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
        </address>
      </div>

      <nav className={classes.linkCol} aria-label="Services">
        <p className={classes.colTitle}>Services</p>
        <ul>
          {SERVICE_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className={classes.linkCol} aria-label="Company">
        <p className={classes.colTitle}>Company</p>
        <ul>
          {COMPANY_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={classes.hoursCol}>
        <p className={classes.colTitle}>Showroom hours</p>
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
      </div>
    </div>

    <div className={`container ${classes.legal}`}>
      <p>
        &copy;
        {` ${new Date().getFullYear()} Sound Insight. All rights reserved.`}
      </p>
    </div>
  </footer>
);

export default FooterComponent;
