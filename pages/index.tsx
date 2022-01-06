import clsx from 'clsx';
import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Box } from '@chakra-ui/layout';
import classes from './styles/home.module.css';
import { getPageById } from '../helper/api-util';
import { HomePageData } from '../types/homePage.type';
import SplashImageComponent from '../components/splashImage';

const HomePage: FC<HomePageData> = ({
  SplashImg,
  Showroom,
  ShowroomInfo,
  ShowroomTitle,
  SplashSubTitle,
  SplashTitle,
  StoreImg,
  StoreImg1,
  StoreImg2,
  StoreImg3,
  StoreImg4,
  SubMission,
  AudioImg,
  AudioSub,
  AudioTitle,
  AutoImg,
  AutoSub,
  AutoTitle,
  VideoImg,
  VideoSub,
  VideoTitle,
  Visit,
  Call,
  City,
  Google,
  tel,
  PhoneNumber,
  Mission
}) => (
  <div>
    <Head>
      <title>Sound Insight - Custom AV Solution & Design | Huntington, NY</title>
      <meta name="description" content="The very best in AUDIO and VIDEO since 2002. Let our Knowledgeable Team Help You Find the Right Technology to Match Your Home or Office." />
      <meta name="keywords" content="Audio Visual Installations Long Island, Home Cinema Installation, Home Security, Home Theatre, Home Automation, Audio & Video, Surround Sound Installation, TV Installation, Audio Installation, Gifts for Dad" />
    </Head>
    <SplashImageComponent altText="Living room with TV over fireplace" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
    <Box className={classes.homeServices} height="auto">
      <h2>{Mission}</h2>
      <p className={classes.mission}>{SubMission}</p>
      <div className={classes.servicesWrapper}>
        <section className={classes.service}>
          <Link href="/services/audio" passHref>
            <a>
              <Image src={AudioImg} width={430} height={375} alt="Speaker system" className={classes.serviceImg} />
              <h3 className={classes.sectionTitle}>{AudioTitle}</h3>
            </a>
          </Link>
          <p className={classes.serviceDesc}>
            {AudioSub}
          </p>
        </section>
        <section className={classes.service}>
          <Link href="/services/video">
            <a>
              <Image src={VideoImg} width={430} height={375} alt="Custom Home movie theater" className={classes.serviceImg} />
              <h3 className={classes.sectionTitle}>{VideoTitle}</h3>
            </a>
          </Link>
          <p className={classes.serviceDesc}>
            {VideoSub}
          </p>
        </section>
        <section className={classes.service}>
          <Link href="/services/automation">
            <a>
              <Image src={AutoImg} width={430} height={375} alt="Home Automation system" className={classes.serviceImg} />
              <h3 className={classes.sectionTitle}>{AutoTitle}</h3>
            </a>
          </Link>
          <p className={classes.serviceDesc}>
            {AutoSub}
          </p>
        </section>
      </div>
      <section className={classes.storeImage}>
        <div className={classes.storeFront}>
          <div className={classes.imageOverlay} />
          <Image src={StoreImg} alt="Sound Insight store front" layout="fill" objectFit="cover" className={classes.storeFrontImg} />
          <div className={classes.splashDesc}>
            <p>
              <strong>{Showroom}</strong>
            </p>
            <p>{City}</p>
          </div>
        </div>
      </section>
      <section className={classes.storeInfo}>
        <h2 className={classes.storeInfoTitle}>{ShowroomTitle}</h2>
        <p className={classes.showroomInfo}>
          {ShowroomInfo}
        </p>
        <p className={clsx(classes.serviceDesc, classes.contactInfo)}>
          {Call}
          {' '}
          <strong>
            <a target="_blank" href={tel} rel="noopener noreferrer">
              {PhoneNumber}
            </a>
          </strong>
          {' '}
          {Visit}
          {' '}
          <strong>
            <a
              target="_blank"
              href={Google}
              rel="noopener noreferrer"
            >
              {City}
            </a>
          </strong>
        </p>
        <div className={classes.topImages}>
          <Image src={StoreImg1} width={250} height={250} alt="Inside of Sound Insight" className={classes.store1} />
          <Image src={StoreImg2} width={250} height={250} alt="Inside of Sound Insight" className={classes.store2} />
          <Image src={StoreImg3} width={250} height={250} alt="Inside of Sound Insight" className={classes.store1} />
          <Image src={StoreImg4} width={250} height={250} alt="Inside of Sound Insight" className={classes.store2} />
        </div>
      </section>
    </Box>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_HOME');

  return {
    props: featuredPage
  };
};

export default HomePage;
