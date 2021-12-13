import classes from './styles/products.module.css';
import { GetStaticProps } from "next";
import React from "react";
import CarouselComponent from "../components/carousel";
import SplashImageComponent from "../components/splashImage";
import { getPageById } from "../helper/api-util";
import { ProductPageData } from "../types/productPageData";

const ProductPage = (props: ProductPageData) => {
  const videoImgs = props.videoImages.map((img) => !img.endsWith('g') ? `${img}g` : img)
  const audioImgs = props.audioImages.map((img) => !img.endsWith('g') ? `${img}g` : img)

  return (
    <div>
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