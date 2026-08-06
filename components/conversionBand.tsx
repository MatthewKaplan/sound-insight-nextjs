import { FC } from 'react';
import Link from 'next/link';
import classes from './styles/ui.module.css';
import { BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '../helper/structured-data';

type Props = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

const ConversionBand: FC<Props> = ({
  title = 'Hear it in person.',
  subtitle = 'Two dedicated demo rooms in Huntington village — stereo and home cinema. Walk in Mon–Sat 10–6, or book a time that suits you.',
  primaryLabel = 'Book a showroom visit',
  primaryHref = '/contact'
}) => (
  <section className={classes.band}>
    <div className={`container ${classes.bandInner}`}>
      <h2 className={classes.bandTitle}>{title}</h2>
      <p className={classes.bandSub}>{subtitle}</p>
      <div className={classes.bandCtas}>
        <Link href={primaryHref} className="btn btnPrimary">
          {primaryLabel}
        </Link>
        <a href={`tel:${BUSINESS_PHONE}`} className="btn btnSecondary onDark">
          {`Call ${BUSINESS_PHONE_DISPLAY}`}
        </a>
      </div>
    </div>
  </section>
);

export default ConversionBand;
