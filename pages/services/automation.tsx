import Head from 'next/head';
import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { getPageById } from '../../helper/api-util';
import classes from './styles/automation.module.css';
import BackBtnComponent from '../../components/backButton';
import { AutomationPageData } from '../../types/automationPage.type';

const AutomationPage: FC<AutomationPageData> = ({
  AutoImg1,
  AutoImg2,
  AutoInfo1,
  AutoTitle1,
  AutoTitle2,
  AutoTitle3,
  AutoInfo2A,
  AutoInfo2B,
  AutoInfo3A,
  AutoInfo3B
}) => (
  <div className={classes.automationPage}>
    <Head>
      <title>Sound Insight - Home Automation | Smart Home Solutions</title>
      <meta name="twitter:title" content="Sound Insight - Home Automation | Smart Home Solutions" />
      <meta name="twitter:description" content="Our Team Creates Home Automation Systems that Will Completely Transform Your Lifestyle by Making Tasks Easier and At The Same Time, Giving You Piece Of Mind." />
      <meta name="og:title" content="Sound Insight - Home Automation | Smart Home Solutions" />
      <meta name="description" content="Our Team Creates Home Automation Systems that Will Completely Transform Your Lifestyle by Making Tasks Easier and At The Same Time, Giving You Piece Of Mind." />
      <meta name="og:description" content="Our Team Creates Home Automation Systems that Will Completely Transform Your Lifestyle by Making Tasks Easier and At The Same Time, Giving You Piece Of Mind." />
      <meta name="keywords" content="Control4, Smart Home, Smart TV, Elan, Controlled Homes, Automation System, Sound Systems, Multi-room Audio & Video, Custom Installation, Music" />
    </Head>
    <div className={classes.header} />
    <BackBtnComponent />
    <div className={classes.automationInfo}>
      <section className={classes.pageHeading}>
        <h1>{AutoTitle1}</h1>
        <p>{AutoInfo1}</p>
      </section>
      <div className={classes.bottomServices}>
        <section className={classes.elan}>
          <Image src={AutoImg1} alt="Example of home automation" width={1400} height={750} layout="responsive" />
          <h2 className={classes.sectionTitle}>{AutoTitle2}</h2>
          <p>{AutoInfo2A}</p>
          <br />
          <p>{AutoInfo2B}</p>
        </section>
        <section className={classes.controlFour}>
          <Image src={AutoImg2} alt="Control 4 automation system" width={1400} height={750} layout="responsive" />
          <h2 className={classes.sectionTitle}>{AutoTitle3}</h2>
          <p>{AutoInfo3A}</p>
          <br />
          <p>{AutoInfo3B}</p>
        </section>
      </div>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_AUTOMATION');

  return {
    props: featuredPage as AutomationPageData
  };
};

export default AutomationPage;
