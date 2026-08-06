import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './styles/ui.module.css';

type Props = {
  href: string;
  title: string;
  copy: string;
  imageSrc: string;
  imageAlt?: string;
  linkLabel?: string;
};

const ServiceCard: FC<Props> = ({
  href, title, copy, imageSrc, imageAlt = '', linkLabel = 'Learn more'
}) => (
  <article className={classes.card}>
    <div className={classes.cardImgWrap}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className={classes.cardImg}
      />
    </div>
    <div className={classes.cardBody}>
      <h3 className={classes.cardTitle}>
        <Link href={href}>{title}</Link>
      </h3>
      <p className={classes.cardCopy}>{copy}</p>
      <span className={classes.cardLink} aria-hidden="true">
        {`${linkLabel} →`}
      </span>
    </div>
  </article>
);

export default ServiceCard;
