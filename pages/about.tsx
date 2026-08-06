import { GetStaticProps } from 'next';
import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Seo from '../components/seo';
import Hero from '../components/hero';
import ProofStrip from '../components/proofStrip';
import ConversionBand from '../components/conversionBand';
import { getPagesById, REVALIDATE_SECONDS } from '../helper/api-util';
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema
} from '../helper/structured-data';
import layoutClasses from '../components/styles/servicePageLayout.module.css';
import classes from './styles/about.module.css';
import { AboutPageData } from '../types/aboutPage.type';
import { CareersPageData } from '../types/careersPage.type';

type Props = {
  SplashImg: string;
  SplashSubTitle: string;
  AboutTitle: string;
  story: { copy: string; img: string; alt: string }[];
  careersIntro: string;
  careersDetail: string;
};

const STORY_ALTS = [
  'Two-channel stereo system with turntable',
  'Home cinema with projection screen',
  'Sound Insight installer working on an equipment rack'
];

const AboutPage: FC<Props> = ({
  SplashImg, SplashSubTitle, AboutTitle, story, careersIntro, careersDetail
}) => (
  <>
    <Seo
      title="Sound Insight - About Us | Long Island AV Specialists Since 2002"
      description="Sound Insight has designed and installed custom audio, video, and automation systems on Long Island since 2002. Meet the team behind the Huntington showroom."
      path="/about"
      structuredData={[
        buildLocalBusinessSchema('/about'),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' }
        ])
      ]}
    />

    <Hero
      compact
      title={AboutTitle}
      eyebrow="About"
      subtitle={SplashSubTitle}
      imageSrc={SplashImg}
      imageAlt="Sound Insight storefront in Huntington, NY"
    />

    <div className={`container section ${layoutClasses.sections}`}>
      {story.map(({ copy, img, alt }, index) => (
        <section
          key={img}
          className={clsx(layoutClasses.row, index % 2 === 1 && layoutClasses.rowFlipped)}
        >
          <div className={layoutClasses.rowImgWrap}>
            <Image
              src={img}
              alt={alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className={layoutClasses.rowImg}
            />
          </div>
          <div>
            <p className={classes.storyCopy}>{copy}</p>
          </div>
        </section>
      ))}
    </div>

    <ProofStrip />

    <section id="careers" className={`container section ${classes.careers}`} aria-labelledby="careers-heading">
      <span className="eyebrow">Careers</span>
      <h2 id="careers-heading" className={classes.careersTitle}>We&apos;re hiring</h2>
      <p className={`prose ${classes.careersCopy}`}>{careersIntro}</p>
      <p className={`prose muted ${classes.careersCopy}`}>{careersDetail}</p>
      <div className={classes.careersCtas}>
        <a
          href={`mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent('Job application — Sound Insight')}`}
          className="btn btnPrimary"
        >
          Apply by email
        </a>
        <a href={`tel:${BUSINESS_PHONE}`} className="btn btnSecondary">
          {`Call ${BUSINESS_PHONE_DISPLAY}`}
        </a>
      </div>
      <p className={classes.careersNote}>
        Include a short note about your experience and attach a résumé if you
        have one — a work history in the email body is fine too.
      </p>
    </section>

    <ConversionBand
      title="Come say hello."
      subtitle="The best way to know if we're the right fit is to visit. Walk the showroom, hear the rooms, and meet the people who'd be working in your home."
    />
  </>
);

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

export const getStaticProps: GetStaticProps = async () => {
  const [aboutRaw, careersRaw] = await getPagesById(['P_ABOUT', 'P_CAREERS']);
  const about = aboutRaw as AboutPageData;
  const careers = careersRaw as CareersPageData;

  return {
    props: {
      SplashImg: about.SplashImg,
      SplashSubTitle: about.SplashSubTitle,
      AboutTitle: about.AboutTitle,
      story: [
        { copy: about.AboutInfo1, img: about.AboutImg1, alt: STORY_ALTS[0] },
        { copy: about.AboutInfo2, img: about.AboutImg2, alt: STORY_ALTS[1] },
        { copy: about.AboutInfo3, img: about.AboutImg3, alt: STORY_ALTS[2] }
      ].filter((item) => item.copy && item.img),
      careersIntro: stripHtml(careers.CareersInfo1 ?? ''),
      careersDetail: careers.CareersInfo2 ?? ''
    },
    revalidate: REVALIDATE_SECONDS
  };
};

export default AboutPage;
