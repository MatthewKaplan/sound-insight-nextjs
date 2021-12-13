import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import classes from './styles/video.module.css';
import { getPageById } from '../../helper/api-util';
import { VideoPageData } from '../../types/videoPage.type';
import CarouselComponent from '../../components/carousel';

const VideoPage = (props: VideoPageData) => {
  return (
    <div className={classes.videoPage}>
      <div className={classes.header} />
      <section className={classes.videoInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.VidTitle1}</h1>
          <p>{props.VidInfo1}</p>
        </section>
        <section className={classes.homeCinema}>
          <Image src={props.VidImg1} alt="Custom Home theater" width={1400} height={750} layout='responsive' />
          <h2>{props.VidTitle2}</h2>
          <p>{props.VidInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.televisionSystems}>
            <Image src={props.VidImg2} alt="Sony OLED television" width={250} height={250} layout='responsive' />
            <h2>{props.VidTitle3}</h2>
            <p>{props.VidInfo3A}</p>
            <p>{props.VidInfo3B}</p>
          </section>
          <section className={classes.projectionSystems}>
            <Image src={props.VidImg3} alt="Sony projector" width={250} height={250} layout='responsive' />
            <h2>{props.VidTitle4}</h2>
            <p>{props.VidInfo4A}</p>
            <p>{props.VidInfo4B}</p>
          </section>
        </div>
      </section>
      <h1>{props.VidSlideTitle}</h1>
      <section className={classes.productSlides}>
        <div className={classes.topBreakLine}>
          <hr className={classes.topPageBreak} />
        </div>
        <CarouselComponent icons={props.videoImages} iconNames={props.videoDetails} links={props.videoLinks} />
        <div className={classes.bottomBreakLine}>
          <hr className={classes.bottomPageBreak} />
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_VIDEO');

  return {
    props: featuredPage
  }
}

export default VideoPage;
