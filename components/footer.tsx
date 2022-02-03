import React, { FC } from 'react';
import Link from 'next/link';
import classes from './styles/footer.module.css';

const FooterComponent: FC = () => (
  <div className={classes.footerComponent}>
    <div className={classes.footerNavOptions}>
      <Link href="/services/audio">
        <a className={classes.link}>
          AUDIO
        </a>
      </Link>
      <div className={classes.dividerDot} />
      <Link href="/services/video">
        <a className={classes.link}>
          VIDEO
        </a>
      </Link>
      <div className={classes.dividerDot} />
      <Link href="/services/automation">
        <a className={classes.link}>
          AUTOMATION
        </a>
      </Link>
      <div className={classes.dividerDot} />
      <Link href="/services/phone-systems">
        <a className={classes.link}>
          PHONES
        </a>
      </Link>
      <div className={classes.dividerDot} />
      <Link href="/services/security">
        <a className={classes.link}>
          SECURITY
        </a>
      </Link>
      <div className={classes.dividerDot} />
      <Link href="/careers">
        <a className={classes.link}>
          CAREERS
        </a>
      </Link>
    </div>
    <div className={classes.footerInfo}>
      <div className={classes.mapouter}>
        <div className={classes.gmapCanvas}>
          <iframe
            title="Google map"
            width="550"
            height="350"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=382%20New%20York%20Ave%20Huntington%2C%20NY%2011743&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          />
        </div>
      </div>
      <section className={classes.storeInfo}>
        <div className={classes.storeContactInfo}>
          <h3>
            <a target="_blank" href="tel:6312714434" rel="noopener noreferrer">
              631.271.4434
            </a>
          </h3>
          <h3 className={classes.email}>
            <a href="mailto:sales@sound-insight.com">sales@sound-insight.com</a>
          </h3>
        </div>
        <section className={classes.storeInformation}>
          <section className={classes.storeAddress}>
            <h3><strong>ADDRESS:</strong></h3>
            <h3>382 New York Ave</h3>
            <h3>Huntington, NY 11743</h3>
          </section>
          <section className={classes.storeHours}>
            <h3>
              <strong>Showroom Hours:</strong>
            </h3>
            <h3>
              <strong>MON - SAT:</strong>
              {' '}
              10:00 AM - 6:00 PM
            </h3>
            <h3>
              <strong>SUN:</strong>
              {' '}
              By Appointment Only
            </h3>
          </section>
        </section>
      </section>
    </div>
  </div>
);

export default FooterComponent;
