import clsx from 'clsx';
import Image from 'next/image';
import classes from './styles/about.module.css';
import React from "react";
import { GetStaticProps } from "next";
import SplashImageComponent from "../components/splashImage";
import { getPageById } from "../helper/api-util";
import { AboutPageData } from '../types/aboutPage.type';

const AboutPage = (props: AboutPageData) => {
  return (
    <div className={classes.aboutPage}>
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