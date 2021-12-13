import React from "react";
import Head from 'next/head';
import { GetStaticProps } from "next";
import { getPageById } from "../helper/api-util";
import classes from './styles/products.module.css';
import CarouselComponent from "../components/carousel";
import { ProductPageData } from "../types/productPageData";
import SplashImageComponent from "../components/splashImage";

const ProductPage = (props: ProductPageData) => {
  const videoImgs = props.videoImages.map((img) => !img.endsWith('g') ? `${img}g` : img)
  const audioImgs = props.audioImages.map((img) => !img.endsWith('g') ? `${img}g` : img)

  return (
    <div>
      <Head>
        <title>Sound Insight - Audio & Video Products</title>
        <meta name="description" content="We carry the highest quality products for all your audio and video needs." />
      </Head>
      <SplashImageComponent altText="Large Stero system" imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <div className={classes.productsPage}>
        <section className={classes.products}>
          <h2>
            <strong>{props.ProductTitle1}</strong>
          </h2>
          <section className={classes.productSlides}>
            <div className={classes.topBreakLine}>
              <hr className={classes.topPageBreak} />
            </div>
            <CarouselComponent icons={videoImgs} iconNames={props.videoDetails} links={props.videoLinks} />
            <div className={classes.bottomBreakLine}>
              <hr className={classes.bottomPageBreak} />
            </div>
          </section>
          <h2 className={classes.speakerHeader}>
            <strong>{props.ProductTitle2}</strong>
          </h2>
          <section className={classes.productSlides}>
            <div className={classes.topBreakLine}>
              <hr className={classes.topPageBreak} />
            </div>
            <CarouselComponent icons={audioImgs} iconNames={props.audioDetails} links={props.audioLinks} />
            <div className={classes.bottomBreakLine}>
              <hr className={classes.bottomPageBreak} />
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_PRODUCTS');

  return {
    props: featuredPage
  }
}

export default ProductPage;