import classes from './styles/audio.module.css';
import { GetStaticProps } from "next";
import { getPageById } from "../../helper/api-util";
import { AudioPageData } from "../../types/audioPage.type";
import React from 'react';
import CarouselComponent from '../../components/carousel';

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
          <img src={props.AudioImg1} alt="Living room" className={classes.homeAudioImg} />
          <h2>{props.AudioTitle2}</h2>
          <p>{props.AudioInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.analog}>
            <img src={props.AudioImg2} alt="Analog system" className={classes.analogImg} />
            <h2>{props.AudioTitle3}</h2>
            <p>{props.AudioInfo3A}</p>
            <p>{props.AudioInfo3B}</p>
          </section>
          <section className={classes.digital}>
            <img src={props.AudioImg3} alt="digital system" />
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
        <CarouselComponent icons={props.audioImages} iconNames={props.audioDetails} links={props.audioLinks}/>
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