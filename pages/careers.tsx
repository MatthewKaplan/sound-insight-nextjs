import { Button } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React, { FC, useState } from 'react';
import Seo from '../components/seo';
import { getPageById } from '../helper/api-util';
import { buildBreadcrumbSchema } from '../helper/structured-data';
import classes from './styles/careers.module.css';
import { CareersPageData } from '../types/careersPage.type';
import ApplicationForm from '../components/applicationForm';
import SplashImageComponent from '../components/splashImage';

const CareersPage: FC<CareersPageData> = ({
  SplashPageImg, SplashPageSubTitle, SplashPageTitle, CareersInfo1, CareersInfo2
}) => {
  const [hover1, setHover1] = useState<boolean>(false);
  const [application, setApplication] = useState<boolean>(false);

  const applicationHandler = (order: boolean) => {
    setApplication(order);
  };

  return (
    <div className={classes.careersComponent}>
      <Seo
        title="Sound Insight - Careers | We're Hiring in Huntington, NY"
        description="We are Currently Hiring Both Sales and Installation Help in Huntington, NY! Come Work For Long Islands #1 Shop For All Audio and Video Needs."
        path="/careers"
        keywords="Audio Installation, Projector Installation, TV Installation, Home Cinema Installation, AV Installers, Audio Visual Installation, Audio Visual Installations Long Island, AV Installation Experts, Smart Home Installation, Media Room Installation"
        structuredData={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' }
        ])}
      />
      <SplashImageComponent altText="Tools and peg board" imageLink={SplashPageImg} title={SplashPageTitle} subTitle={SplashPageSubTitle} />
      <section className={classes.pageHeading}>
        <h2 dangerouslySetInnerHTML={{ __html: CareersInfo1 }} />
        <p>{CareersInfo2}</p>
      </section>
      <section className={classes.applicationBtnContainer}>
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
        {hover1 ? <Button colorScheme="facebook" style={{ backgroundColor: '#6bc06a' }} className={classes.applyBtn} onClick={() => applicationHandler(true)} onMouseEnter={() => setHover1(true)} onMouseLeave={() => setHover1(false)}>APPLY HERE</Button>
          : <Button colorScheme="facebook" style={{ backgroundColor: '#00478E' }} className={classes.applyBtn} onClick={() => applicationHandler(true)} onMouseEnter={() => setHover1(true)}>APPLY HERE</Button>}
        <div className={classes.breakLine}>
          <hr className={classes.pageBreak} />
        </div>
      </section>
      {application === true && <ApplicationForm closeForm={applicationHandler} />}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_CAREERS');

  return {
    props: featuredPage
  };
};

export default CareersPage;
