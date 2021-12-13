import clsx from 'clsx';
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Box } from "@chakra-ui/layout";
import classes from './styles/home.module.css';
import { getPageById } from '../helper/api-util';
import SplashImageComponent from '../components/splashImage';
import { HomePageData } from '../types/homePage.type';

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
                <Image src={props.AudioImg} width={430} height={375} alt="Speaker system" className={classes.serviceImg} />
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
                <Image src={props.VideoImg} width={430} height={375} alt="Custom Home movie theater" className={classes.serviceImg} />
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
                <Image src={props.AutoImg} width={430} height={375} alt="Home Automation system" className={classes.serviceImg} />
                <h3>{props.AutoTitle}</h3>
              </a>
            </Link>
            <p className={classes.serviceDesc}>
              {props.AutoSub}
            </p>
          </section>
        </div>
        <section className={classes.storeImage}>
          <div className={classes.storeFront}>
            <div className={classes.imageOverlay} />
            <Image src={props.StoreImg} width={1000} height={450} alt="Sound Insight store front" layout='fill' className={classes.storeFrontImg} />
            <div className={classes.splashDesc}>
              <p>
                <strong>{props.Showroom}</strong>
              </p>
              <p>{props.City}</p>
            </div>
          </div>
        </section>
        <section className={classes.storeInfo}>
          <h1>{props.ShowroomTitle}</h1>
          <p className={classes.showroomInfo}>
            {props.ShowroomInfo}
          </p>
          <div className={classes.topImages}>
            <Image src={props.StoreImg1} width={500} height={500} alt="Inside of Sound Insight" className={classes.store1} />
            <Image src={props.StoreImg2} width={500} height={500} alt="Inside of Sound Insight" className={classes.store2} />
            <Image src={props.StoreImg3} width={500} height={500} alt="Inside of Sound Insight" className={classes.store1} />
            <Image src={props.StoreImg4} width={500} height={500} alt="Inside of Sound Insight" className={classes.store2} />
          </div>
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