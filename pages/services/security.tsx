import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import classes from './styles/security.module.css';
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
          <Image src={props.SecImg1} alt="Honeywell security system" width={1400} height={750} layout='responsive' />
          <h2>{props.SecTitle2}</h2>
          <p>{props.SecInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.cameraSystems}>
            <Image src={props.SecImg2} alt="Dome security camera system" width={250} height={250} layout='responsive' />
            <h2>{props.SecTitle3}</h2>
            <p>{props.SecInfo3A}</p>
            <p>{props.SecInfo3B}</p>
          </section>
          <section className={classes.smartDevices}>
            <Image src={props.SecImg3} alt="Tablet security" width={250} height={250} layout='responsive' />
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
