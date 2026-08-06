import { GetStaticProps } from 'next';
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Seo from '../../components/seo';
import Hero from '../../components/hero';
import ConversionBand from '../../components/conversionBand';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../../helper/structured-data';
import { ServicePageData } from '../../types/servicePage.typs';
import layoutClasses from '../../components/styles/servicePageLayout.module.css';
import classes from './styles/services.module.css';

const PROCESS_STEPS = [
  { title: 'Listen', copy: 'We start with your rooms, your habits, and your wish list — in the showroom or in your home.' },
  { title: 'Design', copy: 'A system designed around your space and budget, coordinated with your builder or designer when needed.' },
  { title: 'Install', copy: 'Clean, careful installation by our own crew — no subcontractors, no surprises.' },
  { title: 'Support', copy: 'One number to call for tuning, service, and upgrades, for as long as you own the system.' }
];

const ServicesPage: FC<ServicePageData> = ({
  SplashImg, SplashTitle, SplashSubTitle, ServicesTitle, ServicesSubtitle,
  AudioImg, AudioInfo, AudioTitle,
  VideoImg, VideoInfo, VideoTitle,
  AutoImg, AutoInfo, AutoTitle,
  PhoneImg, PhoneInfo, PhoneTitle,
  SecurityImg, SecurityInfo, SecurityTitle
}) => {
  const services = [
    {
      href: '/services/audio', title: AudioTitle, copy: AudioInfo, img: AudioImg, alt: 'Listening room with floor-standing speakers'
    },
    {
      href: '/services/video', title: VideoTitle, copy: VideoInfo, img: VideoImg, alt: 'Dedicated home cinema room'
    },
    {
      href: '/services/automation', title: AutoTitle, copy: AutoInfo, img: AutoImg, alt: 'Person controlling lights in her house on an iPad'
    },
    {
      href: '/services/phone-systems', title: PhoneTitle, copy: PhoneInfo, img: PhoneImg, alt: 'Business phone system handset'
    },
    {
      href: '/services/security', title: SecurityTitle, copy: SecurityInfo, img: SecurityImg, alt: 'Outdoor security camera'
    }
  ];

  return (
    <>
      <Seo
        title="Sound Insight - Services | Audio | Video | Home Automation | Security"
        description="We provide our clients with a complete range of audio-video solutions, smart home automation, security solutions, phone systems, and IT solutions. Sound Insight is New York's #1 in AV Solutions."
        path="/services"
        structuredData={[
          buildLocalBusinessSchema('/services'),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' }
          ])
        ]}
      />
      <Hero
        compact
        title="What we design, install, and stand behind"
        eyebrow="Services"
        subtitle={SplashSubTitle}
        imageSrc={SplashImg}
        imageAlt=""
      >
        <Link href="/contact" className="btn btnPrimary">Book a showroom visit</Link>
      </Hero>

      <div className={`container ${classes.framing}`}>
        <h2 className={classes.framingTitle}>{ServicesTitle}</h2>
        <p className="muted">{ServicesSubtitle}</p>
      </div>

      <div className={`container ${layoutClasses.sections}`}>
        {services.map(({
          href, title, copy, img, alt
        }, index) => (
          <section
            key={href}
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
              <h3 className={layoutClasses.rowTitle}>{title}</h3>
              <p className={layoutClasses.rowCopy}>{copy}</p>
              <Link href={href} className={`btnLink ${classes.rowLink}`}>
                {`Explore ${title.toLowerCase()}`}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className={`sectionDark ${classes.process}`} aria-labelledby="process-heading">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h2 id="process-heading" className={classes.processTitle}>
            From first listen to long-term support
          </h2>
          <ol className={classes.processList}>
            {PROCESS_STEPS.map(({ title, copy }, index) => (
              <li key={title} className={classes.processStep}>
                <span className={classes.processNumber} aria-hidden="true">{index + 1}</span>
                <h3 className={classes.processStepTitle}>{title}</h3>
                <p className={classes.processStepCopy}>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ConversionBand
        title="Not sure where to start? Walk the showroom."
        subtitle="Bring your questions — and your music. Dedicated stereo and cinema rooms in Huntington village, Mon–Sat 10–6."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_SERVICES');

  return {
    props: featuredPage,
    revalidate: REVALIDATE_SECONDS
  };
};

export default ServicesPage;
