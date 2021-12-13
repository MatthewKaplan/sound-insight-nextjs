import React from "react";
import Head from 'next/head';
import { useState } from "react";
import { GetStaticProps } from "next";
import { getPageById } from "../helper/api-util";
import classes from './styles/careers.module.css';
import { CareersPageData } from '../types/careersPage.type';
import ApplicationForm from '../components/applicationForm';
import SplashImageComponent from "../components/splashImage";

const CareersPage = (props: CareersPageData) => {
  const [application, setApplication] = useState<boolean>(false);

  const applicationHandler = (order: boolean) => {
    setApplication(order);
  }

  return (
    <div className={classes.careersComponent}>
      <SplashImageComponent altText="Tools and peg board" imageLink={props.SplashPageImg} title={props.SplashPageTitle} subTitle={props.SplashPageSubTitle} />
      <section className={classes.pageHeading}>
        <h1>{props.CareersTitle}</h1>
        <p dangerouslySetInnerHTML={{ __html: props.CareersInfo1 }}></p>
        <p>{props.CareersInfo2}</p>
      </section>
      <section className={classes.applicationBtnContainer}>
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
        <input
          type="submit"
          value="APPLY"
          className={classes.contactBtn}
          onClick={() => applicationHandler(true)}
        />
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
      </section>
      {application === true && <ApplicationForm closeForm={applicationHandler} />}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_CAREERS');

  return {
    props: featuredPage
  }
}

export default CareersPage;