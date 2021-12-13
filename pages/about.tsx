import clsx from 'clsx';
import Image from 'next/image';
import React from "react";
import Head from 'next/head';
import { GetStaticProps } from "next";
import classes from './styles/about.module.css';
import { getPageById } from "../helper/api-util";
import { AboutPageData } from '../types/aboutPage.type';
import SplashImageComponent from "../components/splashImage";

const AboutPage = (props: AboutPageData) => {
  return (
    <div className={classes.aboutPage}>
      <Head>
        <title>Sound Insight - About Us</title>
        <meta name="description" content="Partnering with the top brands in the audiovisual industry, we provide top residential audio, video, and automation design and installation services. We provide our clients with a complete range of audio-video solutions, smart home automation, network, and IT solutions." />
      </Head>
      <SplashImageComponent altText="Sound Insight store front location in Huntington, NY" imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <div className={classes.aboutInfo}>
        <h1>{props.AboutTitle}</h1>
        <section className={classes.aboutSection}>
          <div className={classes.flex}>
            <Image src={props.AboutImg1} alt="Audio show room" width={400} height={350} layout='fixed' className={classes.imgRadius} />
            <p>{props.AboutInfo1}</p>
          </div>
        </section>
        <section className={classes.aboutSection}>
          <div className={classes.flex}>
            <p>{props.AboutInfo2}</p>
            <Image src={props.AboutImg2} alt="Custom Home Theater" width={400} height={350} layout='fixed' className={classes.imgRadius} />
          </div>
        </section>
        <section className={classes.aboutSection}>
          <div className={classes.flex}>
            <Image src={props.AboutImg3} alt="Office desk" width={400} height={350} layout='fixed' className={classes.imgRadius} />
            <p>{props.AboutInfo3}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_ABOUT');

  return {
    props: featuredPage
  }
}

export default AboutPage;