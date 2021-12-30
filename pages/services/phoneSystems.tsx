import Image from 'next/image';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { getPageById } from '../../helper/api-util';
import classes from './styles/phoneSystems.module.css';
import BackBtnComponent from '../../components/backButton';
import { PhoneSystemPageData } from '../../types/phoneSystemPage.type';

const PhoneSystemsPage: FC<PhoneSystemPageData> = ({
  PhoneImg1,
  PhoneImg2,
  PhoneImg3,
  PhoneInfo1,
  PhoneInfo2,
  PhoneInfo3,
  PhoneInfo4,
  PhoneTitle1,
  PhoneTitle2,
  PhoneTitle3,
  PhoneTitle4
}) => (
  <div className={classes.phonePage}>
    <div className={classes.header} />
    <BackBtnComponent />
    <div className={classes.securityInfo}>
      <section className={classes.pageHeading}>
        <h1>{PhoneTitle1}</h1>
        <p>{PhoneInfo1}</p>
      </section>
      <section className={classes.securitySystems}>
        <Image src={PhoneImg1} alt="NEC Systems office phones" width={1400} height={750} layout="responsive" />
        <p className={classes.sectionTitle}>{PhoneTitle2}</p>
        <p>{PhoneInfo2}</p>
      </section>
      <div className={classes.bottomServices}>
        <section className={classes.desktopPhones}>
          <Image src={PhoneImg2} alt="Desktop office phones" width={250} height={250} layout="responsive" />
          <p className={classes.sectionTitle}>{PhoneTitle3}</p>
          <p>{PhoneInfo3}</p>
        </section>
        <section className={classes.wirelessPhones}>
          <Image src={PhoneImg3} alt="Wireless office phones" width={250} height={250} layout="responsive" />
          <p className={classes.sectionTitle}>{PhoneTitle4}</p>
          <p>{PhoneInfo4}</p>
        </section>
      </div>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_PHONE');

  return {
    props: featuredPage as PhoneSystemPageData
  };
};

export default PhoneSystemsPage;
