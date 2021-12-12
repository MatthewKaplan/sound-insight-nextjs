import classes from './styles/security.module.css';
import { GetStaticProps } from 'next';
import React from 'react';
import { getPageById } from '../../helper/api-util';
import { SecurityPageData } from '../../types/securityPage.type';

const SecurityPage = (props: SecurityPageData) => {
  return (
    <div className={classes.securityPage}>
      <div className={classes.header} />
      <div className={classes.securityInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.SecTitle1}</h1>
          <p>{props.SecInfo1}</p>
        </section>
        <section className={classes.securitySystems}>
          <img src={props.SecImg1} alt="honeywell security" className={classes.honeywellImg} />
          <h2>{props.SecTitle2}</h2>
          <p>{props.SecInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.cameraSystems}>
            <img src={props.SecImg2} alt="camera security system" className={classes.cameraImg} />
            <h2>{props.SecTitle3}</h2>
            <p>{props.SecInfo3A}</p>
            <p>{props.SecInfo3B}</p>
          </section>
          <section className={classes.smartDevices}>
            <img src={props.SecImg3} alt="tablet security" className={classes.tabletImg} />
            <h2>{props.SecTitle4}</h2>
            <p>{props.SecInfo4A}</p>
            <p>{props.SecInfo4B}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_SECURITY');

  return {
    props: featuredPage
  }
}

export default SecurityPage;
