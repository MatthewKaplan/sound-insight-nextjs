import React from "react";
import { useState } from "react";
import { GetStaticProps } from "next";
import { getPageById } from "../helper/api-util";
import classes from './styles/contact.module.css';
import ContactForm from '../components/contactForm';
import { ContactPageData } from '../types/contactPage.type';
import DemoRequestForm from '../components/demoRequestForm';
import SplashImageComponent from "../components/splashImage";
import SurveyRequestForm from "../components/surveyRequestForm";

const ContactPage = (props: ContactPageData) => {
  const [demoRequest, setDemoRequest] = useState<boolean>(false);
  const [estimateRequest, setEstimateRequest] = useState<boolean>(false);
  const [contactUs, setContactUs] = useState<boolean>(false);

  const closeFourms = () => {
    setDemoRequest(false)
    setEstimateRequest(false)
    setContactUs(false)
  }


  return (
    <div className={classes.contactPage}>
      <SplashImageComponent altText="Sound Insight lobby with TVs and speakers" imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <section className={classes.contactPageContents}>
        <h1>{props.ContactTitle}</h1>
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
        <div className={classes.buttonContainer}>
          <input
            type="submit"
            value="REQUEST A DEMO"
            className={classes.contactBtn}
            onClick={() => setDemoRequest(true)}
          />
          <input
            type="submit"
            value="REQUEST A FREE ESTIMATE"
            className={classes.contactBtn}
            onClick={() => setEstimateRequest(true)}
          />
          <input
            type="submit"
            value="CONTACT US"
            className={classes.contactBtn}
            onClick={() => setContactUs(true)}
          />
        </div>
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
        <div className={classes.storeInfo}>
          <section className={classes.storeAddress}>
            <section className={classes.address}>
              <h3>
                <strong>ADDRESS:</strong>
              </h3>
              <h3>382 New York Ave</h3>
              <h3>Huntington, NY 11743</h3>
            </section>
            <section className={classes.hours}>
              <h3>
                <strong>Showroom Hours:</strong>
              </h3>
              <h3>
                <strong>MON - SAT:</strong> 10:00 AM - 6:00 PM
              </h3>
              <h3>
                <strong>SUN:</strong> By Appointment Only
              </h3>
            </section>
          </section>
          <h3 className={classes.phoneNumber}>
            <a target="_blank" href="tel:6312714434" rel="noopener noreferrer">
              631.271.4434
            </a>
          </h3>
          <h3 className={classes.email}>
            <a href="mailto:sales@sound-insight.com">sales@sound-insight.com</a>
          </h3>
        </div>
        {demoRequest === true && <DemoRequestForm closeForm={closeFourms} />}
        {estimateRequest === true && <SurveyRequestForm closeForm={closeFourms} />} 
        {contactUs === true && <ContactForm closeForm={closeFourms} />}
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_CONTACT');

  return {
    props: featuredPage
  }
}

export default ContactPage;