import Head from 'next/head';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { getPageById } from '../helper/api-util';
import classes from './styles/products.module.css';
import CarouselComponent from '../components/carousel';
import { ProductPageData } from '../types/productPageData';
import SplashImageComponent from '../components/splashImage';

const ProductPage: FC<ProductPageData> = ({
  videoImages,
  videoDetails,
  SplashImg,
  SplashSubTitle,
  SplashTitle,
  ProductTitle1,
  ProductTitle2,
  audioDetails,
  audioImages
}) => {
  const videoImgs = videoImages.map((img) => (!img.endsWith('g') ? `${img}g` : img));
  const audioImgs = audioImages.map((img) => (!img.endsWith('g') ? `${img}g` : img));

  return (
    <div>
      <Head>
        <title>Sound Insight - Audio & Video Products Available in our NY Showroom</title>
        <meta name="description" content="We Carry the Highest Quality Products For All Your Audio and Video Needs, That Are Guarenteed to Excite the Senses. Long Island #1 AV Specialists" />
        <meta name="keywords" content="Sony Television, JBL Speakers, Monitor Audio, Paradigm, Marantz, Sonos, Samsung, Sound Bars, Heos, Subwoofer" />
      </Head>
      <SplashImageComponent altText="Large Stero system" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
      <div className={classes.productsPage}>
        <section className={classes.products}>
          <h2>{ProductTitle1}</h2>
          <section className={classes.productSlides}>
            <CarouselComponent icons={videoImgs} iconNames={videoDetails} />
          </section>
          <h2 className={classes.speakerHeader}>{ProductTitle2}</h2>
          <section className={classes.productSlides}>
            <CarouselComponent icons={audioImgs} iconNames={audioDetails} />
          </section>
        </section>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_PRODUCTS');

  return {
    props: featuredPage
  };
};

export default ProductPage;
