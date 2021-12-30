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
  AutoTitle4,
  AutoInfo1,
  AutoInfo2A,
  AutoInfo2B,
  AutoInfo3A,
  AutoInfo3B,
  AutoInfo4A,
  AutoInfo4B,
  AutoImg1,
  AutoImg2,
  AutoImg3
}) => (
  <div className={classes.automationPage}>
    <div className={classes.header} />
    <BackBtnComponent />
    <div className={classes.automationInfo}>
      <section className={classes.pageHeading}>
        <h1>{AutoTitle1}</h1>
        <p>{AutoInfo1}</p>
      </section>
      <section className={classes.homeAutomation}>
        <Image src={AutoImg1} alt="Example of home automation" width={1400} height={750} layout="responsive" />
        <p className={classes.sectionTitle}>{AutoTitle2}</p>
        <p>{AutoInfo2A}</p>
        <br />
        <p>{AutoInfo2B}</p>
      </section>
      <div className={classes.bottomServices}>
        <section className={classes.controlFour}>
          <Image src={AutoImg2} alt="Control 4 automation system" width={250} height={250} layout="responsive" />
          <p className={classes.sectionTitle}>{AutoTitle3}</p>
          <p>{AutoInfo3A}</p>
          <br />
          <p>{AutoInfo3B}</p>
        </section>
        <section className={classes.elan}>
          <Image src={AutoImg3} alt="Elan home automation system" width={250} height={250} layout="responsive" />
          <p className={classes.sectionTitle}>{AutoTitle4}</p>
          <p>{AutoInfo4A}</p>
          <br />
          <p>{AutoInfo4B}</p>
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
