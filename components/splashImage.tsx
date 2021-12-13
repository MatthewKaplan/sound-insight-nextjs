import Image from 'next/image';
import classes from './styles/splashImage.module.css'

type Props = {
  imageLink: string,
  subTitle: string,
  title: string
}

const SplashImageComponent = (props: Props) => {
  return (
    <div className={classes.splashPage}>
      <div className={classes.parentContainer}>
        <div className={classes.colorOverlay} />
        <Image src={props.imageLink} layout='fill' objectFit='cover' className={classes.splashImg} priority />
        <div className={classes.splashDesc}>
          <p>{props.subTitle}</p>
          <p>
            <strong>{props.title}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SplashImageComponent;