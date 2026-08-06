import { FC } from 'react';
import classes from './styles/ui.module.css';

export type LogoItem = {
  src: string;
  name: string;
  alt?: string;
};

/** Pair the CMS's parallel icon/name arrays into logo items. */
export const zipLogos = (icons: string[] = [], names: string[] = []): LogoItem[] => icons.map((src, i) => ({
  src,
  name: names[i] ?? '',
  alt: names[i] ? `${names[i]} logo` : ''
}));

type Props = {
  items: LogoItem[];
  ariaLabel: string;
};

/**
 * Static, wrapped grid of brand logos. Replaces the autoplaying carousels:
 * everything is visible at once, nothing moves, nothing links off-site.
 * Plain <img> is intentional — dozens of tiny, unknown-dimension CMS logos
 * aren't worth the next/image per-image layout contract; lazy loading covers
 * the cost.
 */
const LogoGrid: FC<Props> = ({ items, ariaLabel }) => (
  <ul className={classes.logoGrid} aria-label={ariaLabel}>
    {items.map(({ src, name, alt }) => (
      <li key={`${name}-${src}`} className={classes.logoCell}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ''} loading="lazy" />
        <span className={classes.logoName}>{name}</span>
      </li>
    ))}
  </ul>
);

export default LogoGrid;
