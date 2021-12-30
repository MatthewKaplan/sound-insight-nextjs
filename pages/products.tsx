import Head from 'next/head';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { getPageById } from '../helper/api-util';
import classes from './styles/products.module.css';
import CarouselComponent from '../components/carousel';
import { ProductPageData } from '../types/productPageData';
import SplashImageComponent from '../components/splashImage';

const ProductPage: FC<ProductPageData> = ({
  videoLinks,
  videoImages,
  videoDetails,
  SplashImg,
  SplashSubTitle,
  SplashTitle,
  ProductTitle1,
  ProductTitle2,
  audioDetails,
  audioImages,
  audioLinks
}) => {
  const videoImgs = videoImages.map((img) => (!img.endsWith('g') ? `${img}g` : img));
  const audioImgs = audioImages.map((img) => (!img.endsWith('g') ? `${img}g` : img));

  return (
    <div>
      <Head>
        <title>Sound Insight - Audio & Video Products</title>
        <meta name="description" content="We carry the highest quality products for all your audio and video needs." />
      </Head>
      <SplashImageComponent altText="Large Stero system" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
      <div className={classes.productsPage}>
        <section className={classes.products}>
          <p>
            <strong>{ProductTitle1}</strong>
          </p>
          <section className={classes.productSlides}>
            <div className={classes.topBreakLine}>
              <hr className={classes.topPageBreak} />
            </div>
            <CarouselComponent
              icons={videoImgs}
              iconNames={videoDetails}
              links={videoLinks}
            />
            <div className={classes.bottomBreakLine}>
              <hr className={classes.bottomPageBreak} />
            </div>
          </section>
          <p className={classes.speakerHeader}>
            <strong>{ProductTitle2}</strong>
          </p>
          <section className={classes.productSlides}>
            <div className={classes.topBreakLine}>
              <hr className={classes.topPageBreak} />
            </div>
            <CarouselComponent
              icons={audioImgs}
              iconNames={audioDetails}
              links={audioLinks}
            />
            <div className={classes.bottomBreakLine}>
              <hr className={classes.bottomPageBreak} />
            </div>
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
