import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from "next";
import classes from './styles/audio.module.css';
import { getPageById } from "../../helper/api-util";
import CarouselComponent from '../../components/carousel';
import { AudioPageData } from "../../types/audioPage.type";

const AudioPage = (props: AudioPageData) => {
  return (
    <div className={classes.audioPage}>
      <div className={classes.header} />
      <div className={classes.audioInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.AudioTitle1}</h1>
          <p>{props.AudioInfo1}</p>
        </section>
        <section className={classes.homeAudio}>
          <Image src={props.AudioImg1} alt="TV with a big stero system" width={1400} height={750} layout='responsive' />
          <h2>{props.AudioTitle2}</h2>
          <p>{props.AudioInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.analog}>
            <Image src={props.AudioImg2} alt="Analog system with record player" width={250} height={250} layout='responsive' />
            <h2>{props.AudioTitle3}</h2>
            <p>{props.AudioInfo3A}</p>
            <p>{props.AudioInfo3B}</p>
          </section>
          <section className={classes.digital}>
            <Image src={props.AudioImg3} alt="Digital sound system" width={250} height={250} layout='responsive' />
            <h2>{props.AudioTitle4}</h2>
            <p>{props.AudioInfo4}</p>
          </section>
        </div>
      </div>
      <h1>{props.AudioSlideTitle}</h1>
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