import Head from 'next/head';
import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import classes from './styles/about.module.css';
import { getPageById } from '../helper/api-util';
import { AboutPageData } from '../types/aboutPage.type';
import SplashImageComponent from '../components/splashImage';

const AboutPage: FC<AboutPageData> = ({
  SplashImg,
  SplashSubTitle,
  SplashTitle,
  AboutImg1,
  AboutImg2,
  AboutImg3,
  AboutInfo1,
  AboutInfo2,
  AboutInfo3,
  AboutTitle
}) => (
  <div className={classes.aboutPage}>
    <Head>
      <title>Sound Insight - About | Passion for Audio & Video since 2002</title>
      <meta name="description" content="Partnering With The Top Brands in The Audiovisual Industry, We Provide Top Residential and Commercial Audio, Video, and Automation Design and Installation Services. We Provide our Clients With a Complete Range of Audio-Video Solutions, Smart Home Automation, Network, and IT Solutions." />
      <meta name="keywords" content="Audio Video Long Island, Audio Video New York, Shop Small, Audio Equipment, Video Equipment, Residential Installation, Commercial Installation, Media Center, Home Cinema Amplifiers, Home Theater" />
    </Head>
    <SplashImageComponent altText="Sound Insight store front location in Huntington, NY" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
    <div className={classes.aboutInfo}>
      <h2 className={classes.aboutTitle}>{AboutTitle}</h2>
      <section className={classes.aboutSection}>
        <div className={classes.flex}>
          <Image src={AboutImg1} alt="Audio show room" width={400} height={350} layout="fixed" className={classes.imgRadius} />
          <p className={classes.info}>{AboutInfo1}</p>
        </div>
      </section>
      <section className={classes.aboutSection}>
        <div className={classes.flex}>
          <p className={classes.info}>{AboutInfo2}</p>
          <Image src={AboutImg2} alt="Custom Home Theater" width={400} height={350} layout="fixed" className={classes.imgRadius} />
        </div>
      </section>
      <section className={classes.aboutSection}>
        <div className={classes.flex}>
          <Image src={AboutImg3} alt="Office desk" width={400} height={350} layout="fixed" className={classes.imgRadius} />
          <p className={classes.info}>{AboutInfo3}</p>
        </div>
      </section>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_ABOUT');

  return {
    props: featuredPage
  };
};

export default AboutPage;
