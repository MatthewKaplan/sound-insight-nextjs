import classes from './styles/automation.module.css';
import { GetStaticProps } from 'next';
import React from 'react';
import { getPageById } from '../../helper/api-util';
import { AutomationPageData } from '../../types/automationPage.type';

const AutomationPage = (props: AutomationPageData) => {
  return (
    <div className={classes.automationPage}>
      <div className={classes.header} />
      <div className={classes.automationInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.AutoTitle1}</h1>
          <p>{props.AutoInfo1}</p>
        </section>
        <section className={classes.homeAutomation}>
          <img src={props.AutoImg1} alt="home automation" className={classes.automationImg} />
          <h2>{props.AutoTitle2}</h2>
          <p>{props.AutoInfo2A}</p>
          <p>{props.AutoInfo2B}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.controlFour}>
            <img src={props.AutoImg2} alt="Control 4 system" className={classes.controlFourImg} />
            <h2>{props.AutoTitle3}</h2>
            <p>{props.AutoInfo3A}</p>
            <p>{props.AutoInfo3B}</p>
          </section>
          <section className={classes.elan}>
            <img src={props.AutoImg3} alt="Elan system" className={classes.elanSystemImg} />
            <h2>{props.AutoTitle4}</h2>
            <p>{props.AutoInfo4A}</p>
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
