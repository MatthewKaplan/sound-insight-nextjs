import React from "react";
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from "next";
import classes from './styles/brands.module.css';
import { getPageById } from "../helper/api-util";
import { BrandPageData } from '../types/brandPage.type';
import SplashImageComponent from "../components/splashImage";

const BrandsPage = (props: BrandPageData) => {
  const renderLogos = () => {
    return props.manufacturerLogo.map((logo, i) => 
    <div className={classes.brandLogo} key={i}>
      <a href={props.manufacturerLink[i]} target="_blank" rel="noopener noreferrer" className={classes.logoLink}>
          <Image src={logo} alt={props.manufacturerAltText[i]} className={classes.logoImg} width={150} height={150} layout='fixed' />
      </a>
    </div>)
  }

  return (
    <div className={classes.brandsPage}>
      <Head>
        <title>Sound Insight - Audio & Video Manufacturers</title>
        <meta name="description" content="We only carry top of the line Audio and Video brands guarenteed to excite the senses. Audio-Technica, JBL, Monitor Audio, Sonos, Marantz, Sony, SpeakerCraft, Paradigm, Panamax, Samsung, Heos, etc..." />
      </Head>
      <SplashImageComponent altText="Sound Insight lobby with TVs and speakers" imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <section className={classes.brands}>
        <div className={classes.brandHeading}>
          <h2>
            <strong>{props.BrandsTitle}</strong>
          </h2>
          <h2 className={classes.brandSubtitle}>
            {props.BrandSub1}{' '}
            <a href="mailto:sales@sound-insight.com">{props.BrandSub2}</a> {props.BrandSub3}
          </h2>
        </div>
        <div className={classes.hrLine}>
          <hr className={classes.pageBreak} />
        </div>
        <section className={classes.logoContainer}>{renderLogos()}</section>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_BRANDS');

  return {
    props: featuredPage
  }
}

export default BrandsPage;