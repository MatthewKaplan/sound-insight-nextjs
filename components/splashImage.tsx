import Image from 'next/image';
import { FC } from 'react';
import classes from './styles/splashImage.module.css';

type Props = {
  imageLink: string;
  subTitle: string;
  title: string;
  altText: string;
};

const SplashImageComponent: FC<Props> = ({
  imageLink, altText, subTitle, title
}) => (
  <div className={classes.splashPage}>
    <div className={classes.parentContainer}>
      <div className={classes.colorOverlay} />
      <Image src={imageLink} alt={altText} layout="fill" objectFit="cover" className={classes.splashImg} priority />
      <div className={classes.splashDesc}>
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
    </div>
  </div>
);

export default SplashImageComponent;
