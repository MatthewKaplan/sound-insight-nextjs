import classes from './styles/splashImage.module.css'

type Props = {
  imageLink: string,
  subTitle: string,
  title: string
}

const SplashImageComponent = (props: Props) => {
  return (
    <div className={classes.splashPage}>
      <div className={classes.colorOverlay} />
      <div style={{ backgroundImage: `url(${props.imageLink})` }} className={classes.splashImg} />
      <div className={classes.splashDesc}>
        <p>{props.subTitle}</p>
				<p>
					<strong>{props.title}</strong>
				</p>
			</div>
			</div>
  )
}

export default SplashImageComponent;