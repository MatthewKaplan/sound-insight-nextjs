import { GetStaticProps } from 'next';
import { FC } from 'react';
import Seo from '../../components/seo';
import ServicePageLayout from '../../components/servicePageLayout';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import { buildBreadcrumbSchema, buildServiceSchema } from '../../helper/structured-data';
import { SecurityPageData } from '../../types/securityPage.type';

const SecurityPage: FC<SecurityPageData> = ({
  SecImg1, SecImg2, SecImg3,
  SecInfo1, SecInfo2, SecInfo3A, SecInfo3B, SecInfo4A, SecInfo4B,
  SecTitle1, SecTitle2, SecTitle3, SecTitle4
}) => (
  <>
    <Seo
      title="Sound Insight - Security Systems | Alarms | Cameras"
      description="Sound Insight offers turnkey solutions for video surveillance and security system installation. Peace of mind 24 hours a day!"
      path="/services/security"
      structuredData={[
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Security', path: '/services/security' }
        ]),
        buildServiceSchema({
          name: 'Security & Surveillance Systems',
          description: 'Turnkey video surveillance and security system design and installation for homes and businesses.',
          path: '/services/security',
          serviceType: 'Security system design and installation'
        })
      ]}
    />
    <ServicePageLayout
      name="Security"
      title={SecTitle1}
      intro={SecInfo1}
      ctaLabel="Request a security assessment"
      bandTitle="Peace of mind, professionally installed."
      sections={[
        {
          title: SecTitle2,
          paragraphs: [SecInfo2],
          imageSrc: SecImg1,
          imageAlt: 'Security camera mounted on a house exterior'
        },
        {
          title: SecTitle3,
          paragraphs: [SecInfo3A, SecInfo3B],
          imageSrc: SecImg2,
          imageAlt: 'Surveillance camera feeds on a monitor'
        },
        {
          title: SecTitle4,
          paragraphs: [SecInfo4A, SecInfo4B],
          imageSrc: SecImg3,
          imageAlt: 'Smart doorbell camera at a front door'
        }
      ]}
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_SECURITY');

  return {
    props: featuredPage as SecurityPageData,
    revalidate: REVALIDATE_SECONDS
  };
};

export default SecurityPage;
