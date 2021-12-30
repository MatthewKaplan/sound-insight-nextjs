import clsx from 'clsx';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from "next";
import { Box } from "@chakra-ui/layout";
import classes from './styles/services.module.css';
import { getPageById } from "../../helper/api-util";
import { ServicePageData } from "../../types/servicePage.typs";
import SplashImageComponent from '../../components/splashImage';


const ServicesPage = (props: ServicePageData) => {
  return (
    <div>
      <Head>
        <title>Sound Insight - Audio, Video, Home Automation Services</title>
        <meta name="description" content="We provide our clients with a complete range of audio-video solutions, smart home automation, security solutions, phone systems, and IT solutions. Sound Insight is New York's #1 in AV Solutions." />
      </Head>
      <SplashImageComponent altText="Living room with TV on the wall" imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
      <Box className={classes.servicesProvided}>
        <section className={classes.header}>
          <h1 className={classes.title}>{props.ServicesTitle}</h1>
          <h2 className={classes.subtitle}>{props.ServicesSubtitle}</h2>
        </section>
        <hr className={classes.pageBreak} />
        <section className={classes.topService}>
          <div className={classes.audioService}>
            <Link href="/services/audio">
              <a>
                <Image src={props.AudioImg} alt="Living room with a pair of white speakers" className={classes.topServiceImg} height={600} width={1400} />
                <p className={classes.sectionTitle}>{props.AudioTitle}</p>
              </a>
            </Link>
            <p>{props.AudioInfo}</p>
          </div>
        </section>
        <section className={classes.servicesInfo}>
          <div className={classes.flex}>
            <div className={clsx(classes.automation, classes.service)}>
              <Link href="/services/automation">
                <a className={classes.anchor}>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                    <Image src={props.AutoImg} alt="Home Automation solutions" className={classes.serviceImg} height={425} width={500} />
                  </div>
                  <p className={classes.sectionTitle}>{props.AutoTitle}</p>
                </a>
              </Link>
              <p>{props.AutoInfo}</p>
            </div>
            <div className={clsx(classes.automation, classes.service)}>
              <Link href="/services/video">
                <a className={classes.anchor}>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                    <Image src={props.VideoImg} alt="Custom Home Movie Theater" className={classes.serviceImg} height={425} width={500} />
                  </div>
                  <p className={classes.sectionTitle}>{props.VideoTitle}</p>
                </a>
              </Link>
              <p>{props.VideoInfo}</p>
            </div>
          </div>
          <div className={classes.flex}>
            <div className={clsx(classes.automation, classes.service)}>
              <Link href="/services/phoneSystems">
                <a className={classes.anchor}>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                    <Image src={props.PhoneImg} alt="Man on an office phone" className={classes.serviceImg} height={425} width={500} />
                  </div>
                  <p className={classes.sectionTitle}>{props.PhoneTitle}</p>
                </a>
              </Link>
              <p>{props.PhoneInfo}</p>
            </div>
            <div className={clsx(classes.automation, classes.service)}>
              <Link href="/services/security">
                <a className={classes.anchor}>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.imgDiv}>
                    <Image src={props.SecurityImg} alt="Man viewing security cameras on iPad" className={classes.serviceImg} height={425} width={500} />
                  </div>
                  <p className={classes.sectionTitle}>{props.SecurityTitle}</p>
                </a>
              </Link>
              <p>{props.SecurityInfo}</p>
            </div>
          </div>
        </section>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_SERVICES');

  return {
    props: featuredPage
  }
}

export default ServicesPage;