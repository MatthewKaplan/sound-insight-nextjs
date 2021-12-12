import classes from './styles/home.module.css';
import { getPageById } from '../helper/api-util';
import { Box } from "@chakra-ui/layout";
import SplashImageComponent from '../components/splashImage';
import { GetStaticProps } from 'next';
import Link from 'next/link'
import { HomePageData } from '../types/homePage.type';
import clsx from 'clsx';

const HomePage = (props: HomePageData) => {
  return (
    <div>
      <SplashImageComponent imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <Box className={classes.homeServices} height="auto">
        <h1>{props.MainTitle}</h1>
        <p className={classes.mission}>{props.Mission}</p>
        <p className={classes.mission}>{props.SubMission}</p>
        <p className={clsx(classes.serviceDesc, classes.contactInfo)}>
          {props.Call}{" "}
          <strong>
            <a target="_blank" href={props.tel} rel="noopener noreferrer">
              {props.PhoneNumber}
            </a>
          </strong>{" "}
          {props.Visit}{" "}
          <strong>
            <a
              target="_blank"
              href={props.Google}
              rel="noopener noreferrer"
            >
              {props.City}
            </a>
          </strong>
        </p>
        <div className={classes.servicesWrapper}>
          <section className={classes.service}>
            <Link href="/services/audio">
              <a>
                <img
                  src={props.AudioImg}
                  alt="Speakers"
                  className={classes.serviceImg}
                />
                <h3>{props.AudioTitle}</h3>
              </a>
            </Link>
            <p className={classes.serviceDesc}>
              {props.AudioSub}
            </p>
          </section>
          <section className={classes.service}>
            <Link href="/services/video">
              <a>
                <img
                  src={props.VideoImg}
                  alt="Home theater"
                  className={classes.serviceImg}
                />
                <h3>{props.VideoTitle}</h3>
              </a>
            </Link>
            <p className={classes.serviceDesc}>
              {props.VideoSub}
            </p>
          </section>
          <section className={classes.service}>
            <Link href="/services/automation">
              <a>
                <img
                  src={props.AutoImg}
                  alt="iPad"
                  className={classes.serviceImg}
                />
                <h3>{props.AutoTitle}</h3>
              </a>
            </Link>
            <p className={classes.serviceDesc}>
              {props.AutoSub}
            </p>
          </section>
        </div>
        <section className={classes.storeImage}>
          <div className={classes.imageOverlay} />
          <img
            src={props.StoreImg}
            alt="Sound Insight store front"
            className={classes.storeFrontImg}
          />
          <div className={classes.splashDesc}>
            <p>
              <strong>{props.Showroom}</strong>
            </p>
            <p>{props.City}</p>
          </div>
        </section>
        <section className={classes.storeInfo}>
          <h1>{props.ShowroomTitle}</h1>
          <p className={classes.showroomInfo}>
            {props.ShowroomInfo}
          </p>
          <div className={classes.topImages}>
            <img
              src={props.StoreImg1}
              alt="inside store"
              className={classes.store2}
            />
            <img
              src={props.StoreImg2}
              alt="inside store"
              className={classes.store1}
            />
          </div>
          <img
            src={props.StoreImg3}
            alt="inside store"
            className={classes.store3}
          />
          <img
            src={props.StoreImg4}
            alt="inside store"
            className={classes.store4}
          />
        </section>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_HOME');

  return {
    props: featuredPage
  }
}

export default HomePage;