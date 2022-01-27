import Head from 'next/head';
import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import classes from './styles/brands.module.css';
import { getPageById } from '../helper/api-util';
import { BrandPageData } from '../types/brandPage.type';
import SplashImageComponent from '../components/splashImage';

const BrandsPage: FC<BrandPageData> = ({
  SplashImg,
  BrandSub1,
  BrandSub2,
  BrandSub3,
  SplashTitle,
  BrandsTitle,
  SplashSubTitle,
  manufacturerLogo,
  manufacturerAltText
}) => {
  const renderLogos = () => manufacturerLogo.map((logo, i) => (
    <div className={classes.brandLogo} key={logo}>
      <Image src={logo} alt={manufacturerAltText[i]} className={classes.logoImg} width={150} height={75} layout="fixed" />
    </div>
  ));

  const qobuz = (
    <div className={classes.brandLogo}>
      <Image src="https://res.cloudinary.com/sound-insight/image/upload/v1640960455/logo-2018-qobuz_tm1dc3.png" alt="Qubuz logo which is a media service" className={classes.logoImg} width={150} height={75} layout="fixed" />
    </div>
  );

  return (
    <div className={classes.brandsPage}>
      <Head>
        <title>Sound Insight - Audio & Video Manufacturers Currently Carried</title>
        <meta name="description" content="We only carry top of the line Audio and Video brands guarenteed to excite the senses. Audio-Technica, JBL, Monitor Audio, Sonos, Marantz, Sony, SpeakerCraft, Paradigm, Panamax, Samsung, Heos, etc..." />
        <meta name="keywords" content="Audio-Technica, JBL, Monitor Audio, Sonos, Marantz, Sony, SpeakerCraft, Paradigm, Panamax, Samsung, Heos" />
      </Head>
      <SplashImageComponent altText="Sound Insight lobby with TVs and speakers" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
      <section className={classes.brands}>
        <div className={classes.brandHeading}>
          <h2>{BrandsTitle}</h2>
          <p className={classes.brandSubtitle}>
            {BrandSub1}
            {' '}
            <a href="mailto:sales@sound-insight.com">{BrandSub2}</a>
            {' '}
            {BrandSub3}
          </p>
        </div>
        <div className={classes.hrLine}>
          <hr className={classes.pageBreak} />
        </div>
        <section className={classes.logoContainer}>
          {qobuz}
          {renderLogos()}
        </section>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_BRANDS');

  return {
    props: featuredPage
  };
};

export default BrandsPage;
