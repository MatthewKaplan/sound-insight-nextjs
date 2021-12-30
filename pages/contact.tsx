import React, { FC, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Button } from '@chakra-ui/react';
import { getPageById } from '../helper/api-util';
import classes from './styles/contact.module.css';
import ContactForm from '../components/contactForm';
import { ContactPageData } from '../types/contactPage.type';
import DemoRequestForm from '../components/demoRequestForm';
import SplashImageComponent from '../components/splashImage';
import SurveyRequestForm from '../components/surveyRequestForm';

const ContactPage: FC<ContactPageData> = ({
  SplashImg, SplashSubTitle, SplashTitle, ContactTitle
}) => {
  const [hover1, setHover1] = useState<boolean>(false);
  const [hover2, setHover2] = useState<boolean>(false);
  const [hover3, setHover3] = useState<boolean>(false);
  const [demoRequest, setDemoRequest] = useState<boolean>(false);
  const [estimateRequest, setEstimateRequest] = useState<boolean>(false);
  const [contactUs, setContactUs] = useState<boolean>(false);

  const closeFourms = () => {
    setDemoRequest(false);
    setEstimateRequest(false);
    setContactUs(false);
  };

  return (
    <div className={classes.contactPage}>
      <Head>
        <title>Sound Insight - Contact Us</title>
        <meta name="description" content="Contact Sound Insight for your next AV design, install or service for your home, business, or entertainment space. FREE ESTIMATES! #1 Audio and Video on Long Island." />
      </Head>
      <SplashImageComponent altText="Sound Insight lobby with TVs and speakers" imageLink={SplashImg} title={SplashTitle} subTitle={SplashSubTitle} />
      <section className={classes.contactPageContents}>
        <h1>{ContactTitle}</h1>
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
        <div className={classes.buttonContainer}>
          {hover1 ? <Button colorScheme="facebook" style={{ backgroundColor: '#6bc06a' }} className={classes.contactBtn} onClick={() => setDemoRequest(true)} onMouseEnter={() => setHover1(true)} onMouseLeave={() => setHover1(false)}>REQUEST A DEMO</Button>
            : <Button colorScheme="facebook" style={{ backgroundColor: '#00478E' }} className={classes.contactBtn} onClick={() => setDemoRequest(true)} onMouseEnter={() => setHover1(true)}>REQUEST A DEMO</Button>}
          {hover2 ? <Button colorScheme="facebook" style={{ backgroundColor: '#6bc06a' }} className={classes.contactBtn} onClick={() => setEstimateRequest(true)} onMouseEnter={() => setHover2(true)} onMouseLeave={() => setHover2(false)}>REQUEST A FREE ESTIMATE</Button>
            : <Button colorScheme="facebook" style={{ backgroundColor: '#00478E' }} className={classes.contactBtn} onClick={() => setEstimateRequest(true)} onMouseEnter={() => setHover2(true)}>REQUEST A FREE ESTIMATE</Button>}
          {hover3 ? <Button colorScheme="facebook" style={{ backgroundColor: '#6bc06a' }} className={classes.contactBtn} onClick={() => setContactUs(true)} onMouseEnter={() => setHover3(true)} onMouseLeave={() => setHover3(false)}>CONTACT US</Button>
            : <Button colorScheme="facebook" style={{ backgroundColor: '#00478E' }} className={classes.contactBtn} onClick={() => setContactUs(true)} onMouseEnter={() => setHover3(true)}>CONTACT US</Button>}
        </div>
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
        <div className={classes.storeInfo}>
          <section className={classes.storeAddress}>
            <section className={classes.address}>
              <p>
                <strong>ADDRESS:</strong>
              </p>
              <p>382 New York Ave</p>
              <p>Huntington, NY 11743</p>
            </section>
            <section className={classes.hours}>
              <p>
                <strong>Showroom Hours:</strong>
              </p>
              <p>
                <strong>MON - SAT:</strong>
                {' '}
                10:00 AM - 6:00 PM
              </p>
              <p>
                <strong>SUN:</strong>
                {' '}
                By Appointment Only
              </p>
            </section>
          </section>
          <p className={classes.phoneNumber}>
            <a target="_blank" href="tel:6312714434" rel="noopener noreferrer">
              631.271.4434
            </a>
          </p>
          <p className={classes.email}>
            <a href="mailto:sales@sound-insight.com">sales@sound-insight.com</a>
          </p>
        </div>
        {demoRequest === true && <DemoRequestForm closeForm={closeFourms} />}
        {estimateRequest === true && <SurveyRequestForm closeForm={closeFourms} />}
        {contactUs === true && <ContactForm closeForm={closeFourms} />}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_CONTACT');

  return {
    props: featuredPage
  };
};

export default ContactPage;
