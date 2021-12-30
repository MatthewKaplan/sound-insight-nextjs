import React, { FC } from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import classes from './styles/audio.module.css';
import { getPageById } from '../../helper/api-util';
import CarouselComponent from '../../components/carousel';
import { AudioPageData } from '../../types/audioPage.type';
import BackBtnComponent from '../../components/backButton';

const AudioPage: FC<AudioPageData> = ({
  AudioTitle1,
  AudioInfo1,
  AudioImg1,
  AudioTitle2,
  AudioInfo2,
  AudioImg2,
  AudioTitle3,
  AudioInfo3A,
  AudioInfo3B,
  AudioImg3,
  AudioTitle4,
  AudioInfo4,
  AudioSlideTitle,
  audioImages,
  audioDetails,
  audioLinks
}) => (
  <div className={classes.audioPage}>
    <div className={classes.header} />
    <BackBtnComponent />
    <div className={classes.audioInfo}>
      <section className={classes.pageHeading}>
        <h1>{AudioTitle1}</h1>
        <p>{AudioInfo1}</p>
      </section>
      <div className={classes.homeAudio}>
        <Image src={AudioImg1} className={classes.audioImg} alt="TV with a big stero system" width={1400} height={750} layout="responsive" />
        <p className={classes.sectionTitle}>{AudioTitle2}</p>
        <p>{AudioInfo2}</p>
      </div>
      <div className={classes.bottomServices}>
        <section className={classes.analog}>
          <Image src={AudioImg2} alt="Analog system with record player" width={150} height={150} layout="responsive" />
          <p className={classes.sectionTitle}>{AudioTitle3}</p>
          <p>{AudioInfo3A}</p>
          <br />
          <p>{AudioInfo3B}</p>
        </section>
        <section className={classes.digital}>
          <Image src={AudioImg3} alt="Digital sound system" width={150} height={150} layout="responsive" />
          <p className={classes.sectionTitle}>{AudioTitle4}</p>
          <p>{AudioInfo4}</p>
        </section>
      </div>
    </div>
    <p>{AudioSlideTitle}</p>
    <section className={classes.productSlides}>
      <div className={classes.topBreakLine}>
        <hr className={classes.topPageBreak} />
      </div>
      <CarouselComponent icons={audioImages} iconNames={audioDetails} links={audioLinks} />
      <div className={classes.bottomBreakLine}>
        <hr className={classes.bottomPageBreak} />
      </div>
    </section>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_AUDIO');

  return {
    props: featuredPage as AudioPageData
  };
};

export default AudioPage;
