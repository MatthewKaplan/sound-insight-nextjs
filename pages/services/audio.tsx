import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from "next";
import classes from './styles/audio.module.css';
import { getPageById } from "../../helper/api-util";
import CarouselComponent from '../../components/carousel';
import { AudioPageData } from "../../types/audioPage.type";
import BackBtnComponent from '../../components/backButton';

const AudioPage = (props: AudioPageData) => {
  return (
    <div className={classes.audioPage}>
      <div className={classes.header} />
      <BackBtnComponent />
      <div className={classes.audioInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.AudioTitle1}</h1>
          <p>{props.AudioInfo1}</p>
        </section>
        <div className={classes.homeAudio}>
          <Image src={props.AudioImg1} className={classes.audioImg} alt="TV with a big stero system" width={1400} height={750} layout='responsive' />
          <p className={classes.sectionTitle}>{props.AudioTitle2}</p>
          <p>{props.AudioInfo2}</p>
        </div>
        <div className={classes.bottomServices}>
          <section className={classes.analog}>
            <Image src={props.AudioImg2} alt="Analog system with record player" width={150} height={150} layout='responsive' />
            <p className={classes.sectionTitle}>{props.AudioTitle3}</p>
            <p>{props.AudioInfo3A}</p>
            <br />
            <p>{props.AudioInfo3B}</p>
          </section>
          <section className={classes.digital}>
            <Image src={props.AudioImg3} alt="Digital sound system" width={150} height={150} layout='responsive' />
            <p className={classes.sectionTitle}>{props.AudioTitle4}</p>
            <p>{props.AudioInfo4}</p>
          </section>
        </div>
      </div>
      <p>{props.AudioSlideTitle}</p>
      <section className={classes.productSlides}>
        <div className={classes.topBreakLine}>
          <hr className={classes.topPageBreak} />
        </div>
        <CarouselComponent icons={props.audioImages} iconNames={props.audioDetails} links={props.audioLinks} />
        <div className={classes.bottomBreakLine}>
          <hr className={classes.bottomPageBreak} />
        </div>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_AUDIO');

  return {
    props: featuredPage
  }
}

export default AudioPage;