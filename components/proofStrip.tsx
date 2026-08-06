import { FC } from 'react';
import classes from './styles/ui.module.css';

const CURRENT_YEAR = new Date().getFullYear();

const ITEMS = [
  { value: `${CURRENT_YEAR - 2002}+ years`, label: 'Serving Long Island since 2002' },
  { value: '60+ brands', label: 'Premium lines carried in store' },
  { value: '2 demo rooms', label: 'Dedicated stereo & cinema rooms' },
  { value: 'Huntington, NY', label: 'Showroom in the village' }
];

const ProofStrip: FC = () => (
  <div className="container">
    <ul className={classes.proof} style={{ listStyle: 'none' }}>
      {ITEMS.map(({ value, label }) => (
        <li key={label} className={classes.proofItem}>
          <span className={classes.proofValue}>{value}</span>
          <span className={classes.proofLabel}>{label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProofStrip;
