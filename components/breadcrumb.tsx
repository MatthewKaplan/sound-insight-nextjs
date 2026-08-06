import { FC } from 'react';
import Link from 'next/link';
import classes from './styles/ui.module.css';

type Crumb = {
  href?: string;
  label: string;
};

type Props = {
  crumbs: Crumb[];
};

const Breadcrumb: FC<Props> = ({ crumbs }) => (
  <nav aria-label="Breadcrumb" className={`container ${classes.breadcrumb}`}>
    <ol>
      {crumbs.map(({ href, label }) => (
        <li key={label}>
          {href ? (
            <Link href={href}>{label}</Link>
          ) : (
            <span aria-current="page">{label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
