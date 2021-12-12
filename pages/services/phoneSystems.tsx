import classes from './styles/phoneSystems.module.css';
import { GetStaticProps } from 'next';
import React from 'react';
import { getPageById } from '../../helper/api-util';
import { PhoneSystemPageData } from '../../types/phoneSystemPage.type';

const PhoneSystemsPage = (props: PhoneSystemPageData) => {
  return (
    <div className={classes.phonePage}>
      <div className={classes.header} />
      <div className={classes.securityInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.PhoneTitle1}</h1>
          <p>{props.PhoneInfo1}</p>
        </section>
        <section className={classes.securitySystems}>
          <img src={props.PhoneImg1} alt="honeywell security" className={classes.honeywellImg} />
          <h2>{props.PhoneTitle2}</h2>
          <p>{props.PhoneInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.desktopPhones}>
            <img src={props.PhoneImg2} alt="camera security system" className={classes.cameraImg} />
            <h2>{props.PhoneTitle3}</h2>
            <p>{props.PhoneInfo3}</p>
          </section>
          <section className={classes.wirelessPhones}>
            <img src={props.PhoneImg3} alt="tablet security" className={classes.tabletImg} />
            <h2>{props.PhoneTitle4}</h2>
            <p>{props.PhoneInfo4}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_PHONE');

  return {
    props: featuredPage
  }
}

export default PhoneSystemsPage;
