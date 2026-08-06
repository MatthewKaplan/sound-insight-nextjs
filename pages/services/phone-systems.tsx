import { GetStaticProps } from 'next';
import { FC } from 'react';
import Seo from '../../components/seo';
import ServicePageLayout from '../../components/servicePageLayout';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import { buildBreadcrumbSchema, buildServiceSchema } from '../../helper/structured-data';
import { PhoneSystemPageData } from '../../types/phoneSystemPage.type';

const PhoneSystemsPage: FC<PhoneSystemPageData> = ({
  PhoneImg1, PhoneImg2, PhoneImg3,
  PhoneInfo1, PhoneInfo2, PhoneInfo3, PhoneInfo4,
  PhoneTitle1, PhoneTitle2, PhoneTitle3, PhoneTitle4
}) => (
  <>
    <Seo
      title="Sound Insight - Phone Systems | Office Phones | VoIP Phones"
      description="Sound Insight offers a one-stop solution for your business and residential communication needs. From basic digital systems to modern VoIP systems."
      path="/services/phone-systems"
      structuredData={[
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Phone Systems', path: '/services/phone-systems' }
        ]),
        buildServiceSchema({
          name: 'Business Phone Systems',
          description: 'Business and residential phone system design, installation, and support — digital and VoIP.',
          path: '/services/phone-systems',
          serviceType: 'Phone system installation'
        })
      ]}
    />
    <ServicePageLayout
      name="Business Phone Systems"
      title={PhoneTitle1}
      intro={PhoneInfo1}
      ctaLabel="Talk to us about your business"
      bandTitle="One call, one point of contact."
      sections={[
        {
          title: PhoneTitle2,
          paragraphs: [PhoneInfo2],
          imageSrc: PhoneImg1,
          imageAlt: 'Office desk phone system'
        },
        {
          title: PhoneTitle3,
          paragraphs: [PhoneInfo3],
          imageSrc: PhoneImg2,
          imageAlt: 'VoIP phone in a conference room'
        },
        {
          title: PhoneTitle4,
          paragraphs: [PhoneInfo4],
          imageSrc: PhoneImg3,
          imageAlt: 'Receptionist using a multi-line phone'
        }
      ]}
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_PHONE');

  return {
    props: featuredPage as PhoneSystemPageData,
    revalidate: REVALIDATE_SECONDS
  };
};

export default PhoneSystemsPage;
