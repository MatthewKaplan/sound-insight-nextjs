import classes from './styles/about.module.css';
import { GetStaticProps } from "next";
import React from "react";
import SplashImageComponent from "../components/splashImage";
import { getPageById } from "../helper/api-util";
import { AboutPageData } from '../types/aboutPage.type';
import clsx from 'clsx';

const AboutPage = (props: AboutPageData) => {
  return (
    <div className={classes.aboutPage}>
      <SplashImageComponent imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <div className={classes.aboutInfo}>
        <h1>{props.AboutTitle}</h1>
        <section className={classes.aboutSection}>
          <img src={props.AboutImg1} alt="Living room" className={clsx(classes.about1Img, classes.aboutImg)} />
          <p>{props.AboutInfo1}</p>
        </section>
        <section className={classes.aboutSection}>
          <img src={props.AboutImg2} alt="Home theater" className={clsx(classes.about2Img, classes.aboutImg)} />
          <p>{props.AboutInfo2}</p>
        </section>
        <section className={clsx(classes.aboutSection, classes.aboutSection3)}>
          <img src={props.AboutImg3} alt="Office" className={clsx(classes.about3Img, classes.aboutImg)} />
          <p>{props.AboutInfo3}</p>
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