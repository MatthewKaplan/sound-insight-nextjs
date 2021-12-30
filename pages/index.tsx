import clsx from 'clsx';
import { FC } from 'react';
import Link from 'next/link';
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
}: HomePageData) => (
  <div>
    <SplashImageComponent altText="Living room with TV over fireplace" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
    <Box className={classes.homeServices} height="auto">
      <p className={classes.mission}>{Mission}</p>
      <p className={classes.mission2}>{SubMission}</p>
      <div className={classes.servicesWrapper}>
        <section className={classes.service}>
          <Link href="/services/audio" passHref>
            <div>
              <Image src={AudioImg} width={430} height={375} alt="Speaker system" className={classes.serviceImg} />
              <p className={classes.sectionTitle}><strong>{AudioTitle}</strong></p>
            </div>
          </Link>
          <p className={classes.serviceDesc}>
            {AudioSub}
          </p>
        </section>
        <section className={classes.service}>
          <Link href="/services/video">
            <a>
              <Image src={VideoImg} width={430} height={375} alt="Custom Home movie theater" className={classes.serviceImg} />
              <p className={classes.sectionTitle}><strong>{VideoTitle}</strong></p>
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
              <p className={classes.sectionTitle}><strong>{AutoTitle}</strong></p>
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
        <p className={classes.storeInfoTitle}>{ShowroomTitle}</p>
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
