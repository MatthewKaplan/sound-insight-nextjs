import React, { FC } from 'react';
import Image from 'next/image';
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
  VidSlideTitle,
  VidTitle1,
  VidTitle2,
  VidTitle3,
  VidTitle4,
  videoDetails,
  videoImages,
  videoLinks
}) => (
  <div className={classes.videoPage}>
    <div className={classes.header} />
    <BackBtnComponent />
    <section className={classes.videoInfo}>
      <section className={classes.pageHeading}>
        <h1>{VidTitle1}</h1>
        <p>{VidInfo1}</p>
      </section>
      <section className={classes.homeCinema}>
        <Image src={VidImg1} alt="Custom Home theater" width={1400} height={750} layout="responsive" />
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
          <Image src={VidImg3} alt="Sony projector" width={250} height={250} layout="responsive" />
          <h2 className={classes.sectionTitle}>{VidTitle4}</h2>
          <p>{VidInfo4A}</p>
          <br />
          <p>{VidInfo4B}</p>
        </section>
      </div>
    </section>
    <p>{VidSlideTitle}</p>
    <section className={classes.productSlides}>
      <div className={classes.topBreakLine}>
        <hr className={classes.topPageBreak} />
      </div>
      <CarouselComponent
        icons={videoImages}
        iconNames={videoDetails}
        links={videoLinks}
      />
      <div className={classes.bottomBreakLine}>
        <hr className={classes.bottomPageBreak} />
      </div>
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
