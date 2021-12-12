import classes from './styles/services.module.css';
import { Box } from "@chakra-ui/layout";
import { GetStaticProps } from "next";
import { getPageById } from "../../helper/api-util";
import Link from 'next/link'
import { ServicePageData } from "../../types/servicePage.typs";
import SplashImageComponent from '../../components/splashImage';
import clsx from 'clsx';


const ServicesPage = (props: ServicePageData) => {
  return (
    <div>
      <SplashImageComponent imageLink={props.SplashImg} title={props.SplashTitle} subTitle={props.SplashSubTitle} />
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
                <img
                  src={props.AudioImg}
                  alt="Speakers"
                  className={classes.topServiceImg}
                />
                <h3>{props.AudioTitle}</h3>
              </a>
            </Link>
            <p>{props.AudioInfo}</p>
          </div>
        </section>
        <section className={classes.servicesInfo}>
          <div className={clsx(classes.automation, classes.service)}>
            <Link href="/services/automation">
              <a>
                <img
                  src={props.AutoImg}
                  alt="Speakers"
                  className={classes.serviceImg}
                />
                <h3>{props.AutoTitle}</h3>
              </a>
            </Link>
            <p>{props.AutoInfo}</p>
          </div>
          <div className={clsx(classes.video, classes.service)}>
            <Link href="/services/video">
              <a>
                <img
                  src={props.VideoImg}
                  alt="Speakers"
                  className={classes.serviceImg}
                />
                <h3>{props.VideoTitle}</h3>
              </a>
            </Link>
            <p>{props.VideoInfo}</p>
          </div>
          <div className={clsx(classes.phone, classes.service)}>
            <Link href="/services/phoneSystems">
              <a>
                <img
                  src={props.PhoneImg}
                  alt="Man making phonecall"
                  className={classes.serviceImg}
                />
                <h3>{props.PhoneTitle}</h3>
              </a>
            </Link>
            <p>{props.PhoneInfo}</p>
          </div>
          <div className={clsx(classes.phone, classes.service)}>
            <Link href="/services/security">
              <a>
                <img
                  src={props.SecurityImg}
                  alt="Speakers"
                  className={classes.serviceImg}
                />
                <h3>{props.SecurityTitle}</h3>
              </a>
            </Link>
            <p>{props.SecurityInfo}</p>
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