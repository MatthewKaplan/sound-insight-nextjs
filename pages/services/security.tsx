import Head from 'next/head';
import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import classes from './styles/security.module.css';
import { getPageById } from '../../helper/api-util';
import BackBtnComponent from '../../components/backButton';
import { SecurityPageData } from '../../types/securityPage.type';

const SecurityPage: FC<SecurityPageData> = ({
  SecImg1,
  SecImg2,
  SecImg3,
  SecInfo1,
  SecInfo2,
  SecInfo3A,
  SecInfo3B,
  SecInfo4A,
  SecInfo4B,
  SecTitle1,
  SecTitle2,
  SecTitle3,
  SecTitle4
}) => (
  <div className={classes.securityPage}>
    <Head>
      <title>Sound Insight - Security Systems | Alarms | Cameras</title>
      <meta name="twitter:title" content="Sound Insight - Security Systems | Alarms | Cameras" />
      <meta name="twitter:description" content="Sound Insight offers turnkey solutions for video surveillance and security system installation. Peace of mind 24 hours a day!" />
      <meta name="og:title" content="Sound Insight - Security Systems | Alarms | Cameras" />
      <meta name="description" content="Sound Insight offers turnkey solutions for video surveillance and security system installation. Peace of mind 24 hours a day!" />
      <meta name="og:description" content="Sound Insight offers turnkey solutions for video surveillance and security system installation. Peace of mind 24 hours a day!" />
      <meta name="keywords" content="Security Systems, Alarms, Cameras, video surveillance, security system installation, Resident Security, CCTV, DVR Security, Commercial Surveillance, Safe Home" />
    </Head>
    <div className={classes.header} />
    <BackBtnComponent />
    <div className={classes.securityInfo}>
      <section className={classes.pageHeading}>
        <h1>{SecTitle1}</h1>
        <p>{SecInfo1}</p>
      </section>
      <section className={classes.securitySystems}>
        <Image src={SecImg1} alt="Honeywell security system" width={1400} height={750} layout="responsive" objectFit="cover" objectPosition="0px 0px" />
        <h2 className={classes.sectionTitle}>{SecTitle2}</h2>
        <p>{SecInfo2}</p>
      </section>
      <div className={classes.bottomServices}>
        <section className={classes.cameraSystems}>
          <Image src={SecImg2} alt="Dome security camera system" width={250} height={250} layout="responsive" />
          <h2 className={classes.sectionTitle}>{SecTitle3}</h2>
          <p>{SecInfo3A}</p>
          <br />
          <p>{SecInfo3B}</p>
        </section>
        <section className={classes.smartDevices}>
          <Image src={SecImg3} alt="Tablet security" width={250} height={250} layout="responsive" />
          <h2 className={classes.sectionTitle}>{SecTitle4}</h2>
          <p>{SecInfo4A}</p>
          <br />
          <p>{SecInfo4B}</p>
        </section>
      </div>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_SECURITY');

  return {
    props: featuredPage as SecurityPageData
  };
};

export default SecurityPage;
