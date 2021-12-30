import React, { FC } from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getPageById } from '../../helper/api-util';
import classes from './styles/automation.module.css';
import BackBtnComponent from '../../components/backButton';
import { AutomationPageData } from '../../types/automationPage.type';

const AutomationPage: FC<AutomationPageData> = ({
  AutoTitle1,
  AutoTitle2,
  AutoTitle3,
  AutoInfo1,
  AutoInfo2A,
  AutoInfo2B,
  AutoInfo3A,
  AutoInfo3B,
  AutoImg1,
  AutoImg2
}) => (
  <div className={classes.automationPage}>
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
