import clsx from 'clsx';
import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Box } from '@chakra-ui/layout';
import classes from './styles/services.module.css';
import { getPageById } from '../../helper/api-util';
import { ServicePageData } from '../../types/servicePage.typs';
import SplashImageComponent from '../../components/splashImage';

const ServicesPage: FC<ServicePageData> = ({
  SplashImg,
  SplashSubTitle,
  SplashTitle,
  SecurityImg,
  SecurityInfo,
  SecurityTitle,
  ServicesSubtitle,
  ServicesTitle,
  PhoneTitle,
  PhoneImg,
  PhoneInfo,
  AudioImg,
  AudioInfo,
  AudioTitle,
  AutoImg,
  AutoInfo,
  AutoTitle,
  VideoImg,
  VideoInfo,
  VideoTitle
}) => (
  <div>
    <Head>
      <title>Sound Insight - Audio, Video, Home Automation Services</title>
      <meta name="description" content="We provide our clients with a complete range of audio-video solutions, smart home automation, security solutions, phone systems, and IT solutions. Sound Insight is New York's #1 in AV Solutions." />
    </Head>
    <SplashImageComponent altText="Living room with TV on the wall" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
    <Box className={classes.servicesProvided}>
      <section className={classes.header}>
        <h2 className={classes.title}>{ServicesTitle}</h2>
        <p className={classes.subtitle}>{ServicesSubtitle}</p>
      </section>
      <hr className={classes.pageBreak} />
      <section className={classes.topService}>
        <div className={classes.audioService}>
          <Link href="/services/audio">
            <a>
              <Image src={AudioImg} alt="Living room with a pair of white speakers" className={classes.topServiceImg} height={600} width={1400} />
              <h3 className={classes.sectionTitle}>{AudioTitle}</h3>
            </a>
          </Link>
          <p>{AudioInfo}</p>
        </div>
      </section>
      <section className={classes.servicesInfo}>
        <div className={classes.flex}>
          <div className={clsx(classes.automation, classes.service)}>
            <Link href="/services/automation">
              <a className={classes.anchor}>
                <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                  <Image src={AutoImg} alt="Home Automation solutions" className={classes.serviceImg} height={425} width={500} />
                </div>
                <h3 className={classes.sectionTitle}>{AutoTitle}</h3>
              </a>
            </Link>
            <p>{AutoInfo}</p>
          </div>
          <div className={clsx(classes.automation, classes.service)}>
            <Link href="/services/video">
              <a className={classes.anchor}>
                <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                  <Image src={VideoImg} alt="Custom Home Movie Theater" className={classes.serviceImg} height={425} width={500} />
                </div>
                <h3 className={classes.sectionTitle}>{VideoTitle}</h3>
              </a>
            </Link>
            <p>{VideoInfo}</p>
          </div>
        </div>
        <div className={classes.flex}>
          <div className={clsx(classes.automation, classes.service)}>
            <Link href="/services/phoneSystems">
              <a className={classes.anchor}>
                <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                  <Image src={PhoneImg} alt="Man on an office phone" className={classes.serviceImg} height={425} width={500} />
                </div>
                <h3 className={classes.sectionTitle}>{PhoneTitle}</h3>
              </a>
            </Link>
            <p>{PhoneInfo}</p>
          </div>
          <div className={clsx(classes.automation, classes.service)}>
            <Link href="/services/security">
              <a className={classes.anchor}>
                <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                  <Image src={SecurityImg} alt="Man viewing security cameras on iPad" className={classes.serviceImg} height={425} width={500} />
                </div>
                <h3 className={classes.sectionTitle}>{SecurityTitle}</h3>
              </a>
            </Link>
            <p>{SecurityInfo}</p>
          </div>
        </div>
      </section>
    </Box>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_SERVICES');

  return {
    props: featuredPage as ServicePageData
  };
};

export default ServicesPage;
