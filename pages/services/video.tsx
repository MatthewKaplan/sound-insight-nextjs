/* eslint-disable max-len */
import Head from 'next/head';
import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import classes from './styles/video.module.css';
import { getPageById } from '../../helper/api-util';
import CarouselComponent from '../../components/carousel';
import BackBtnComponent from '../../components/backButton';
import { VideoPageData } from '../../types/videoPage.type';

const VideoPage: FC<VideoPageData> = ({
  VidImg1,
  VidImg2,
  VidImg3,
  VidInfo1,
  VidInfo2,
  VidInfo3A,
  VidInfo3B,
  VidInfo4A,
  VidInfo4B,
  VidTitle1,
  VidTitle2,
  VidTitle3,
  VidTitle4,
  VideoIcons,
  VideoLinks,
  VideoNames,
  VideoImages,
  VidSlideTitle
}) => (
  <div className={classes.videoPage}>
    <Head>
      <title>Sound Insight - Video Systems | Home Theater | Televisions</title>
      <meta name="twitter:title" content="Sound Insight - Video Systems | Home Theater | Televisions" />
      <meta name="twitter:description" content="Sound Insight Offers a Cinematic Experience to Those Seeking a New Home Cinema" />
      <meta name="og:title" content="Sound Insight - Video Systems | Home Theater | Televisions" />
      <meta name="description" content="Sound Insight Offers a Cinematic Experience to Those Seeking a New Home Cinema" />
      <meta name="og:description" content="Sound Insight Offers a Cinematic Experience to Those Seeking a New Home Cinema" />
      <meta name="keywords" content="Home Cinema Projectors, Home Cinema Amplifiers, Home Cinema Receivers, Home Theater, Projection Screens, Audio Visual Installations, Projector Lamps, Projector Mounts, Plasma & LCD Installation" />
      {VideoImages.map((url) => (
        <meta key={url} property="og:image" content={url} />
      ))}
    </Head>
    <div className={classes.header} />
    <BackBtnComponent />
    <section className={classes.videoInfo}>
      <section className={classes.pageHeading}>
        <h1>{VidTitle1}</h1>
        <p>{VidInfo1}</p>
      </section>
      <section className={classes.homeCinema}>
        <Image src={VidImg1} alt="Custom Home theater" width={1400} height={750} layout="responsive" objectFit="cover" />
        <h2 className={classes.sectionTitle}>{VidTitle2}</h2>
        <p>{VidInfo2}</p>
      </section>
      <div className={classes.bottomServices}>
        <section className={classes.televisionSystems}>
          <Image src={VidImg2} alt="Sony OLED television" width={250} height={250} layout="responsive" />
          <h2 className={classes.sectionTitle}>{VidTitle3}</h2>
          <p>{VidInfo3A}</p>
          <br />
          <p>{VidInfo3B}</p>
        </section>
        <section className={classes.projectionSystems}>
          <Image src={VidImg3} alt="Sony projector" width={700} height={700} layout="responsive" objectFit="cover" />
          <h2 className={classes.sectionTitle}>{VidTitle4}</h2>
          <p>{VidInfo4A}</p>
          <br />
          <p>{VidInfo4B}</p>
        </section>
      </div>
    </section>
    <p>{VidSlideTitle}</p>
    <section className={classes.productSlides}>
      <CarouselComponent
        links={VideoLinks}
        icons={VideoImages}
        iconNames={VideoNames}
        pictures={VideoIcons}
      />
    </section>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_VIDEO');

  return {
    props: featuredPage as VideoPageData
  };
};

export default VideoPage;
