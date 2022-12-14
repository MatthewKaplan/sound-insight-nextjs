import Head from 'next/head';
import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import classes from './styles/audio.module.css';
import { getPageById } from '../../helper/api-util';
import CarouselComponent from '../../components/carousel';
import { AudioPageData } from '../../types/audioPage.type';
import BackBtnComponent from '../../components/backButton';

const AudioPage: FC<AudioPageData> = ({
  AudioImg1,
  AudioImg2,
  AudioImg3,
  AudioInfo1,
  AudioInfo4,
  AudioInfo2,
  AudioIcons,
  AudioLinks,
  AudioNames,
  AudioTitle1,
  AudioTitle2,
  AudioTitle4,
  AudioTitle3,
  AudioInfo3A,
  AudioInfo3B,
  AudioImages,
  SpeakerIcons,
  SpeakerNames,
  SpeakerLinks,
  SpeakerImages,
  StreamerNames,
  StreamerLinks,
  StreamerIcons,
  StreamerImages,
  TurntableIcons,
  TurntableLinks,
  TurntableNames,
  TurntableImages,
  AudioSlideTitle
}) => (
  <div className={classes.audioPage}>
    <Head>
      <title>Sound Insight - Home Audio | Analog | Digital</title>
      <meta name="twitter:title" content="Sound Insight - Home Audio | Analog | Digital" />
      <meta name="twitter:description" content="Whether You Wish to Spin Vinyl or Listen to Digital Music Media it Sounds Better on Sound Insight's Carefully Selected Products and Custom Designed Systems." />
      <meta name="og:title" content="Sound Insight - Home Audio | Analog | Digital" />
      <meta name="description" content="Whether You Wish to Spin Vinyl or Listen to Digital Music Media it Sounds Better on Sound Insight's Carefully Selected Products and Custom Designed Systems." />
      <meta name="og:description" content="Whether You Wish to Spin Vinyl or Listen to Digital Music Media it Sounds Better on Sound Insight's Carefully Selected Products and Custom Designed Systems." />
      <meta name="keywords" content="Vinyl, Vinyl Players, Analog, Digital, Record Players, Audio Systems, Sound Systems, Multi-room Audio & Video, Custom Installation, Music" />
      {AudioImages.map((url) => (
        <meta key={url} property="og:image" content={url} />
      ))}
      {SpeakerImages.map((url) => (
        <meta key={url} property="og:image" content={url} />
      ))}
      {StreamerImages.map((url) => (
        <meta key={url} property="og:image" content={url} />
      ))}
      {TurntableImages.map((url) => (
        <meta key={url} property="og:image" content={url} />
      ))}
    </Head>
    <div className={classes.header} />
    <BackBtnComponent />
    <div className={classes.audioInfo}>
      <section className={classes.pageHeading}>
        <h1>{AudioTitle1}</h1>
        <p>{AudioInfo1}</p>
      </section>
      <div className={classes.homeAudio}>
        <Image src={AudioImg1} className={classes.audioImg} alt="TV with a big stero system" width={1400} height={750} layout="responsive" />
        <h2 className={classes.sectionTitle}>{AudioTitle2}</h2>
        <p>{AudioInfo2}</p>
      </div>
      <div className={classes.bottomServices}>
        <section className={classes.analog}>
          <Image src={AudioImg2} alt="Analog system with record player" width={150} height={150} layout="responsive" />
          <h2 className={classes.sectionTitle}>{AudioTitle3}</h2>
          <p>{AudioInfo3A}</p>
          <br />
          <p>{AudioInfo3B}</p>
        </section>
        <section className={classes.digital}>
          <Image src={AudioImg3} alt="Digital sound system" width={150} height={150} layout="responsive" />
          <h2 className={classes.sectionTitle}>{AudioTitle4}</h2>
          <p>{AudioInfo4}</p>
        </section>
      </div>
    </div>
    <p>{AudioSlideTitle}</p>
    <section className={classes.productSlides}>
      <CarouselComponent
        icons={SpeakerIcons}
        links={SpeakerLinks}
        iconNames={SpeakerNames}
        pictures={SpeakerImages}
      />
      <CarouselComponent
        icons={AudioIcons}
        links={AudioLinks}
        pictures={AudioImages}
        iconNames={AudioNames}
      />
      <CarouselComponent
        icons={StreamerIcons}
        links={StreamerLinks}
        iconNames={StreamerNames}
        pictures={StreamerImages}
      />
      <CarouselComponent
        icons={TurntableIcons}
        links={TurntableLinks}
        iconNames={TurntableNames}
        pictures={TurntableImages}
      />
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
