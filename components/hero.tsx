import { FC, ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import classes from './styles/ui.module.css';

type Props = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  compact?: boolean;
  children?: ReactNode; // CTA row
};

const Hero: FC<Props> = ({
  title, eyebrow, subtitle, imageSrc, imageAlt = '', compact = false, children
}) => (
  <section className={clsx(classes.hero, compact && classes.heroCompact)}>
    {imageSrc && (
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={classes.heroImg}
      />
    )}
    <div className={clsx('container', classes.heroInner)}>
      {eyebrow && <span className={classes.heroEyebrow}>{eyebrow}</span>}
      <h1 className={classes.heroTitle}>{title}</h1>
      {subtitle && <p className={classes.heroSub}>{subtitle}</p>}
      {children && <div className={classes.heroCtas}>{children}</div>}
    </div>
  </section>
);

export default Hero;
