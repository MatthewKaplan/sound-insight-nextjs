import Image from 'next/image';
import classes from './styles/brands.module.css';
import { GetStaticProps } from "next";
import React from "react";
import SplashImageComponent from "../components/splashImage";
import { getPageById } from "../helper/api-util";
import { BrandPageData } from '../types/brandPage.type';

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
      <SplashImageComponent imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
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