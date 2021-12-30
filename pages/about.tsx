import React, { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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
      <title>Sound Insight - About Us</title>
      <meta name="description" content="Partnering with the top brands in the audiovisual industry, we provide top residential audio, video, and automation design and installation services. We provide our clients with a complete range of audio-video solutions, smart home automation, network, and IT solutions." />
    </Head>
    <SplashImageComponent altText="Sound Insight store front location in Huntington, NY" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
    <div className={classes.aboutInfo}>
      <p className={classes.aboutTitle}>{AboutTitle}</p>
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
