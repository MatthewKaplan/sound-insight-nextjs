import { FC } from 'react';
import Link from 'next/link';
import classes from './styles/ui.module.css';

export type LogoItem = {
  src: string;
  name: string;
  alt?: string;
  /** When set, the whole cell links here (e.g. a /brands/[slug] page). */
  href?: string;
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

const CellContent: FC<{ src: string; name: string; alt?: string }> = ({ src, name, alt }) => (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt ?? ''} loading="lazy" width={120} height={48} />
    <span className={classes.logoName}>{name}</span>
  </>
);

/**
 * Static, wrapped grid of brand logos. Replaces the autoplaying carousels:
 * everything is visible at once, nothing moves. Plain <img> is intentional —
 * dozens of tiny CMS logos aren't worth the next/image per-image layout
 * contract; the fixed 120×48 box plus lazy loading covers the cost.
 */
const LogoGrid: FC<Props> = ({ items, ariaLabel }) => (
  <ul className={classes.logoGrid} aria-label={ariaLabel}>
    {items.map(({
      src, name, alt, href
    }) => (
      <li key={`${name}-${src}`} className={classes.logoCell}>
        {href ? (
          <Link href={href} className={classes.logoLink}>
            <CellContent src={src} name={name} alt={alt} />
          </Link>
        ) : (
          <CellContent src={src} name={name} alt={alt} />
        )}
      </li>
    ))}
  </ul>
);

export default LogoGrid;
