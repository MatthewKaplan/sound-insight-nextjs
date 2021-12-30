import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getPageById } from '../../helper/api-util';
import classes from './styles/automation.module.css';
import BackBtnComponent from '../../components/backButton';
import { AutomationPageData } from '../../types/automationPage.type';

const AutomationPage = (props: AutomationPageData) => {
  return (
    <div className={classes.automationPage}>
      <div className={classes.header} />
      <BackBtnComponent />
      <div className={classes.automationInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.AutoTitle1}</h1>
          <p>{props.AutoInfo1}</p>
        </section>
        <section className={classes.homeAutomation}>
          <Image src={props.AutoImg1} alt="Example of home automation" width={1400} height={750} layout='responsive' />
          <p className={classes.sectionTitle}>{props.AutoTitle2}</p>
          <p>{props.AutoInfo2A}</p>
          <br />
          <p>{props.AutoInfo2B}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.controlFour}>
            <Image src={props.AutoImg2} alt="Control 4 automation system" width={250} height={250} layout='responsive' />
            <p className={classes.sectionTitle}>{props.AutoTitle3}</p>
            <p>{props.AutoInfo3A}</p>
            <br />
            <p>{props.AutoInfo3B}</p>
          </section>
          <section className={classes.elan}>
            <Image src={props.AutoImg3} alt="Elan home automation system" width={250} height={250} layout='responsive' />
            <p className={classes.sectionTitle}>{props.AutoTitle4}</p>
            <p>{props.AutoInfo4A}</p>
            <br />
            <p>{props.AutoInfo4B}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_AUTOMATION');

  return {
    props: featuredPage
  }
}

export default AutomationPage;
