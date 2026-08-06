import { GetStaticProps } from 'next';
import { FC } from 'react';
import Seo from '../../components/seo';
import ServicePageLayout from '../../components/servicePageLayout';
import { zipLogos } from '../../components/logoGrid';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import { buildBreadcrumbSchema, buildServiceSchema } from '../../helper/structured-data';
import { VideoPageData } from '../../types/videoPage.type';

const VideoPage: FC<VideoPageData> = ({
  VidImg1, VidImg2, VidImg3,
  VidInfo1, VidInfo2, VidInfo3A, VidInfo3B, VidInfo4A, VidInfo4B,
  VidTitle1, VidTitle2, VidTitle3, VidTitle4,
  VideoIcons, VideoNames
}) => (
  <>
    <Seo
      title="Sound Insight - Video Systems | Home Theater | Televisions"
      description="Sound Insight Offers a Cinematic Experience to Those Seeking a New Home Cinema"
      path="/services/video"
      structuredData={[
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Video', path: '/services/video' }
        ]),
        buildServiceSchema({
          name: 'Home Cinema & Video Systems',
          description: 'Custom home theater and video system design and installation, from televisions to dedicated cinema rooms.',
          path: '/services/video',
          serviceType: 'Home cinema design and installation'
        })
      ]}
    />
    <ServicePageLayout
      name="Home Cinema & Video"
      title={VidTitle1}
      intro={VidInfo1}
      ctaLabel="Book a cinema demo"
      bandTitle="See it on the big screen first."
      sections={[
        {
          title: VidTitle2,
          paragraphs: [VidInfo2],
          imageSrc: VidImg1,
          imageAlt: 'Dedicated home cinema with projector screen and seating'
        },
        {
          title: VidTitle3,
          paragraphs: [VidInfo3A, VidInfo3B],
          imageSrc: VidImg2,
          imageAlt: 'Living room television installation'
        },
        {
          title: VidTitle4,
          paragraphs: [VidInfo4A, VidInfo4B],
          imageSrc: VidImg3,
          imageAlt: 'Outdoor television installation'
        }
      ]}
      brandGroups={[
        { label: 'Televisions & displays', items: zipLogos(VideoIcons, VideoNames) }
      ]}
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_VIDEO');

  return {
    props: featuredPage as VideoPageData,
    revalidate: REVALIDATE_SECONDS
  };
};

export default VideoPage;
