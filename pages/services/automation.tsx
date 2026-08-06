import { GetStaticProps } from 'next';
import { FC } from 'react';
import Seo from '../../components/seo';
import ServicePageLayout from '../../components/servicePageLayout';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import { buildBreadcrumbSchema, buildServiceSchema } from '../../helper/structured-data';
import { AutomationPageData } from '../../types/automationPage.type';

const AutomationPage: FC<AutomationPageData> = ({
  AutoImg1, AutoImg2,
  AutoInfo1, AutoInfo2A, AutoInfo2B, AutoInfo3A, AutoInfo3B,
  AutoTitle1, AutoTitle2, AutoTitle3
}) => (
  <>
    <Seo
      title="Sound Insight - Home Automation | Smart Home Solutions"
      description="Our Team Creates Home Automation Systems that Will Completely Transform Your Lifestyle by Making Tasks Easier and At The Same Time, Giving You Piece Of Mind."
      path="/services/automation"
      structuredData={[
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Automation', path: '/services/automation' }
        ]),
        buildServiceSchema({
          name: 'Home Automation',
          description: 'Smart home automation design and installation — lighting, climate, audio, and security on one intuitive interface.',
          path: '/services/automation',
          serviceType: 'Home automation design and installation'
        })
      ]}
    />
    <ServicePageLayout
      name="Home Automation"
      title={AutoTitle1}
      intro={AutoInfo1}
      ctaLabel="Book an automation consult"
      bandTitle="One interface for the whole house."
      sections={[
        {
          title: AutoTitle2,
          paragraphs: [AutoInfo2A, AutoInfo2B],
          imageSrc: AutoImg1,
          imageAlt: 'Smart home control panel on a wall'
        },
        {
          title: AutoTitle3,
          paragraphs: [AutoInfo3A, AutoInfo3B],
          imageSrc: AutoImg2,
          imageAlt: 'Tablet controlling home lighting scenes'
        }
      ]}
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_AUTOMATION');

  return {
    props: featuredPage as AutomationPageData,
    revalidate: REVALIDATE_SECONDS
  };
};

export default AutomationPage;
