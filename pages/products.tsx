import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import Seo from '../components/seo';
import { getPageById } from '../helper/api-util';
import { buildBreadcrumbSchema } from '../helper/structured-data';
import classes from './styles/products.module.css';
import CarouselComponent from '../components/carousel';
import { ProductPageData } from '../types/productPageData';
import SplashImageComponent from '../components/splashImage';

const ProductPage: FC<ProductPageData> = ({
  SplashImg,
  audioLinks,
  audioIcons,
  audioNames,
  videoLinks,
  videoImages,
  SplashTitle,
  videoTvImgs,
  audioImages,
  videoDetails,
  speakerNames,
  speakerIcons,
  speakerLinks,
  ProductTitle1,
  ProductTitle2,
  ProductTitle3,
  ProductTitle4,
  ProductTitle5,
  ProductTitle6,
  streamerNames,
  streamerIcons,
  streamerLinks,
  speakerImages,
  SplashSubTitle,
  turntableNames,
  turntableLinks,
  turntableIcons,
  streamerImages,
  furnitureNames,
  furnitureLogos,
  furnitureLinks,
  turntableImages,
  furnitureImages
}) => (
  <div>
    <Seo
      title="Sound Insight - Audio & Video Products Available in our NY Showroom"
      description="We Carry the Highest Quality Products For All Your Audio and Video Needs, That Are Guaranteed to Excite the Senses. Long Island #1 AV Specialists"
      path="/products"
      keywords="Sony Television, Gifts, Monitor Audio, Paradigm, Marantz, Sonos, Samsung, Sound Bars, Heos, Gifts for Dad"
      images={[
        ...furnitureImages,
        ...turntableImages,
        ...streamerImages,
        ...speakerImages,
        ...audioImages,
        ...videoImages
      ]}
      structuredData={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' }
      ])}
    />
    <SplashImageComponent altText="Large Stereo system" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
    <div className={classes.productsPage}>
      <section className={classes.products}>
        <h2>{ProductTitle1}</h2>
        <section className={classes.productSlides}>
          <CarouselComponent
            links={videoLinks}
            icons={videoImages}
            pictures={videoTvImgs}
            iconNames={videoDetails}
          />
        </section>
        <h2 className={classes.speakerHeader}>{ProductTitle2}</h2>
        <section className={classes.productSlides}>
          <CarouselComponent
            icons={audioIcons}
            links={audioLinks}
            iconNames={audioNames}
            pictures={audioImages}
          />
        </section>
        <h2 className={classes.speakerHeader}>{ProductTitle3}</h2>
        <section className={classes.productSlides}>
          <CarouselComponent
            icons={turntableIcons}
            links={turntableLinks}
            iconNames={turntableNames}
            pictures={turntableImages}
          />
        </section>
        <h2 className={classes.speakerHeader}>{ProductTitle4}</h2>
        <section className={classes.productSlides}>
          <CarouselComponent
            icons={streamerIcons}
            links={streamerLinks}
            iconNames={streamerNames}
            pictures={streamerImages}
          />
        </section>
        <h2 className={classes.speakerHeader}>{ProductTitle5}</h2>
        <section className={classes.productSlides}>
          <CarouselComponent
            icons={speakerIcons}
            links={speakerLinks}
            iconNames={speakerNames}
            pictures={speakerImages}
          />
        </section>
        <h2 className={classes.speakerHeader}>{ProductTitle6}</h2>
        <section className={classes.productSlides}>
          <CarouselComponent
            icons={furnitureLogos}
            links={furnitureLinks}
            iconNames={furnitureNames}
            pictures={furnitureImages}
          />
        </section>
      </section>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_PRODUCTS');

  return {
    props: featuredPage
  };
};

export default ProductPage;
