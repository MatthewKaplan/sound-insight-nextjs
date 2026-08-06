import { GetStaticProps } from 'next';
import { FC } from 'react';
import Seo from '../../components/seo';
import ServicePageLayout from '../../components/servicePageLayout';
import { zipLogos } from '../../components/logoGrid';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import { buildBreadcrumbSchema, buildServiceSchema } from '../../helper/structured-data';
import { AudioPageData } from '../../types/audioPage.type';

const AudioPage: FC<AudioPageData> = ({
  AudioImg1, AudioImg2, AudioImg3,
  AudioInfo1, AudioInfo2, AudioInfo3A, AudioInfo3B, AudioInfo4,
  AudioTitle1, AudioTitle2, AudioTitle3, AudioTitle4,
  AudioIcons, AudioNames,
  SpeakerIcons, SpeakerNames,
  StreamerIcons, StreamerNames,
  TurntableIcons, TurntableNames
}) => (
  <>
    <Seo
      title="Sound Insight - Home Audio | Analog | Digital"
      description="Whether You Wish to Spin Vinyl or Listen to Digital Music Media it Sounds Better on Sound Insight's Carefully Selected Products and Custom Designed Systems."
      path="/services/audio"
      structuredData={[
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Audio', path: '/services/audio' }
        ]),
        buildServiceSchema({
          name: 'Home Audio Systems',
          description: 'Custom home audio design, installation, and product solutions for analog, digital, and whole-home listening.',
          path: '/services/audio',
          serviceType: 'Home audio design and installation'
        })
      ]}
    />
    <ServicePageLayout
      name="Home Audio"
      title={AudioTitle1}
      intro={AudioInfo1}
      ctaLabel="Book a listening session"
      bandTitle="Bring a record. Leave convinced."
      sections={[
        {
          title: AudioTitle2,
          paragraphs: [AudioInfo2],
          imageSrc: AudioImg1,
          imageAlt: 'TV with a large stereo system'
        },
        {
          title: AudioTitle3,
          paragraphs: [AudioInfo3A, AudioInfo3B],
          imageSrc: AudioImg2,
          imageAlt: 'Analog system with a record player'
        },
        {
          title: AudioTitle4,
          paragraphs: [AudioInfo4],
          imageSrc: AudioImg3,
          imageAlt: 'Digital streaming sound system'
        }
      ]}
      brandGroups={[
        { label: 'Speakers', items: zipLogos(SpeakerIcons, SpeakerNames) },
        { label: 'Amplifiers & processors', items: zipLogos(AudioIcons, AudioNames) },
        { label: 'Music streamers', items: zipLogos(StreamerIcons, StreamerNames) },
        { label: 'Turntables', items: zipLogos(TurntableIcons, TurntableNames) }
      ]}
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_AUDIO');

  return {
    props: featuredPage as AudioPageData,
    revalidate: REVALIDATE_SECONDS
  };
};

export default AudioPage;
