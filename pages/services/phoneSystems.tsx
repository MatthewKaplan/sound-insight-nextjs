import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getPageById } from '../../helper/api-util';
import classes from './styles/phoneSystems.module.css';
import BackBtnComponent from '../../components/backButton';
import { PhoneSystemPageData } from '../../types/phoneSystemPage.type';

const PhoneSystemsPage = (props: PhoneSystemPageData) => {
  return (
    <div className={classes.phonePage}>
      <div className={classes.header} />
      <BackBtnComponent />
      <div className={classes.securityInfo}>
        <section className={classes.pageHeading}>
          <h1>{props.PhoneTitle1}</h1>
          <p>{props.PhoneInfo1}</p>
        </section>
        <section className={classes.securitySystems}>
          <Image src={props.PhoneImg1} alt="NEC Systems office phones" width={1400} height={750} layout='responsive' />
          <p className={classes.sectionTitle}>{props.PhoneTitle2}</p>
          <p>{props.PhoneInfo2}</p>
        </section>
        <div className={classes.bottomServices}>
          <section className={classes.desktopPhones}>
            <Image src={props.PhoneImg2} alt="Desktop office phones" width={250} height={250} layout='responsive' />
            <p className={classes.sectionTitle}>{props.PhoneTitle3}</p>
            <p>{props.PhoneInfo3}</p>
          </section>
          <section className={classes.wirelessPhones}>
            <Image src={props.PhoneImg3} alt="Wireless office phones" width={250} height={250} layout='responsive' />
            <p className={classes.sectionTitle}>{props.PhoneTitle4}</p>
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
