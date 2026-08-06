import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ConversionBand from '../components/conversionBand';
import Hero from '../components/hero';
import ProofStrip from '../components/proofStrip';
import Seo from '../components/seo';
import ServiceCard from '../components/serviceCard';
import uiClasses from '../components/styles/ui.module.css';
import { getPagesById, REVALIDATE_SECONDS } from '../helper/api-util';
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema
} from '../helper/structured-data';
import { GalleryPageData } from '../types/galleryPage.type';
import { HomePageData } from '../types/homePage.type';
import { ServicePageData } from '../types/servicePage.typs';
import classes from './styles/home.module.css';

type GalleryItem = {
  ImgSrc: string;
  ImgDesc: string;
  ImgLocation: string;
};

type Props = {
  SplashImg: string;
  SplashTitle: string;
  SplashSubTitle: string;
  Mission: string;
  SubMission: string;
  AudioImg: string;
  AudioSub: string;
  VideoImg: string;
  VideoSub: string;
  AutoImg: string;
  AutoSub: string;
  SecurityImg: string;
  ShowroomTitle: string;
  ShowroomInfo: string;
  StoreImgs: string[];
  GalleryPreview: GalleryItem[];
};

const STORE_IMG_ALTS = [
  'Listening room at the Sound Insight showroom',
  'Home cinema demo room at the Sound Insight showroom',
  'Speaker wall inside the Sound Insight showroom',
  'Front counter and displays at the Sound Insight showroom'
];

const HomePage: FC<Props> = ({
  SplashImg, SplashTitle, SplashSubTitle, Mission, SubMission,
  AudioImg, AudioSub, VideoImg, VideoSub, AutoImg, AutoSub, SecurityImg,
  ShowroomTitle, ShowroomInfo, StoreImgs, GalleryPreview
}) => (
  <>
    <Seo
      title="Sound Insight - Custom AV Solution & Design | Huntington, NY"
      description="Custom audio, video, home automation and security — designed, installed and supported by Sound Insight, Long Island's AV specialists since 2002. Visit our Huntington showroom."
      path="/"
      structuredData={[
        buildOrganizationSchema(),
        buildLocalBusinessSchema('/'),
        buildBreadcrumbSchema([{ name: 'Home', path: '/' }])
      ]}
    />

    <Hero
      title={SplashTitle}
      eyebrow={SplashSubTitle}
      subtitle={Mission}
      imageSrc={SplashImg}
      imageAlt="Living room with a TV mounted over a fireplace"
    >
      <Link href="/contact" className="btn btnPrimary">Book a showroom visit</Link>
      <Link href="/contact" className="btn btnSecondary onDark">Request a free estimate</Link>
    </Hero>

    <ProofStrip />

    <section className="section">
      <div className="container">
        <div className={uiClasses.sectionHead}>
          <span className="eyebrow">What we do</span>
          <h2 className={uiClasses.sectionTitle}>{SubMission}</h2>
          <p className={uiClasses.sectionSub}>
            Design, installation, and long-term support for the technology you
            live with every day — from two-channel listening rooms to whole-home
            systems.
          </p>
        </div>
        <div className={uiClasses.cardGrid}>
          <ServiceCard
            href="/services/audio"
            title="Home Audio"
            copy={AudioSub}
            imageSrc={AudioImg}
            linkLabel="Explore audio"
          />
          <ServiceCard
            href="/services/video"
            title="Home Cinema & Video"
            copy={VideoSub}
            imageSrc={VideoImg}
            linkLabel="Explore cinema"
          />
          <ServiceCard
            href="/services/automation"
            title="Home Automation"
            copy={AutoSub}
            imageSrc={AutoImg}
            linkLabel="Explore automation"
          />
          <ServiceCard
            href="/services/security"
            title="Security"
            copy="Cameras, surveillance, and peace of mind — designed and installed as carefully as our audio."
            imageSrc={SecurityImg}
            linkLabel="Explore security"
          />
        </div>
      </div>
    </section>

    <section className={`sectionDark ${classes.showroom}`}>
      <div className={`container ${classes.showroomGrid}`}>
        <div className={classes.showroomText}>
          <span className="eyebrow">Our showroom</span>
          <h2 className={classes.showroomTitle}>{ShowroomTitle}</h2>
          <p className={`muted ${classes.showroomInfo}`}>{ShowroomInfo}</p>
          <Link href="/contact" className="btn btnPrimary" style={{color: '#FFF'}}>Plan your visit</Link>
        </div>
        <ul className={classes.showroomPhotos}>
          {StoreImgs.map((src, i) => (
            <li key={src}>
              <Image
                src={src}
                alt={STORE_IMG_ALTS[i] ?? 'Inside the Sound Insight showroom'}
                width={640}
                height={480}
                sizes="(min-width: 768px) 25vw, 50vw"
                className={classes.showroomPhoto}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>

    {GalleryPreview.length > 0 && (
      <section className="section">
        <div className="container">
          <div className={uiClasses.sectionHead}>
            <span className="eyebrow">Recent work</span>
            <h2 className={uiClasses.sectionTitle}>Real rooms, real installs</h2>
          </div>
          <ul className={classes.galleryPreview}>
            {GalleryPreview.map(({ ImgSrc, ImgDesc, ImgLocation }) => (
              <li key={ImgSrc} className={classes.galleryItem}>
                <Image
                  src={ImgSrc}
                  alt={ImgDesc}
                  width={640}
                  height={480}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={classes.galleryImg}
                />
                <p className={classes.galleryCaption}>
                  <strong>{ImgDesc.trim()}</strong>
                  {ImgLocation ? ` — ${ImgLocation}` : ''}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/gallery" className="btnLink">See the full gallery</Link>
        </div>
      </section>
    )}

    <ConversionBand />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const [homeRaw, servicesRaw, galleryRaw] = await getPagesById(['P_HOME', 'P_SERVICES', 'P_GALLERY']);
  const home = homeRaw as HomePageData;
  const services = servicesRaw as ServicePageData;
  const gallery = galleryRaw as GalleryPageData;

  const galleryData = (gallery.Data ?? []) as GalleryItem[];

  return {
    props: {
      SplashImg: home.SplashImg,
      SplashTitle: home.SplashTitle,
      SplashSubTitle: home.SplashSubTitle,
      Mission: home.Mission,
      SubMission: home.SubMission,
      AudioImg: home.AudioImg,
      AudioSub: home.AudioSub,
      VideoImg: home.VideoImg,
      VideoSub: home.VideoSub,
      AutoImg: home.AutoImg,
      AutoSub: home.AutoSub,
      SecurityImg: services.SecurityImg,
      ShowroomTitle: home.ShowroomTitle,
      ShowroomInfo: home.ShowroomInfo,
      StoreImgs: [home.StoreImg1, home.StoreImg2, home.StoreImg3, home.StoreImg4].filter(Boolean),
      GalleryPreview: galleryData.slice(0, 3)
    },
    revalidate: REVALIDATE_SECONDS
  };
};

export default HomePage;
