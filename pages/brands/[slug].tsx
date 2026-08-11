import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import Seo from '../../components/seo';
import BrandPageLayout from '../../components/brandPageLayout';
import { LogoItem } from '../../components/logoGrid';
import { getPageById, REVALIDATE_SECONDS } from '../../helper/api-util';
import {
  buildBrandSchema,
  buildBrandWebPageSchema,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema
} from '../../helper/structured-data';
import { BRANDS, Brand, getBrandBySlug } from '../../data/brands';
import { BrandPageData } from '../../types/brandPage.type';

type Props = {
  brand: Brand;
  logoSrc: string | null;
  relatedItems: LogoItem[];
};

const BrandPage: FC<Props> = ({ brand, logoSrc, relatedItems }) => {
  const path = `/brands/${brand.slug}`;
  // "Dealer" wording in the title is gated the same way as the H1 — it's a
  // per-manufacturer legal claim until the client confirms authorization.
  const title = brand.authorizedDealer
    ? `Authorized ${brand.name} Dealer in Huntington, NY | Sound Insight`
    : `${brand.name} in Huntington, NY | Sound Insight`;

  return (
    <>
      <Seo
        title={title}
        description={brand.metaDescription}
        path={path}
        structuredData={[
          buildLocalBusinessSchema(path),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Brands', path: '/products#brands' },
            { name: brand.name, path }
          ]),
          buildBrandSchema({
            name: brand.name,
            slug: brand.slug,
            manufacturerUrl: brand.manufacturerUrl,
            logo: logoSrc ?? undefined
          }),
          buildBrandWebPageSchema({
            name: brand.name,
            slug: brand.slug,
            description: brand.metaDescription
          })
        ]}
      />
      <BrandPageLayout brand={brand} logoSrc={logoSrc ?? undefined} relatedItems={relatedItems} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  // Brand data is repo-side, so a new brand ships with a deploy anyway —
  // fallback: false keeps unknown slugs a clean 404.
  paths: BRANDS.map(({ slug }) => ({ params: { slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const brand = getBrandBySlug(params?.slug as string);
  if (!brand) {
    return { notFound: true };
  }

  const brandsPage = await getPageById('P_BRANDS') as BrandPageData;
  const logos = brandsPage.manufacturerLogo ?? [];
  const alts = brandsPage.manufacturerAltText ?? [];
  const findLogo = ({ logoAltMatch }: Brand): string | null => {
    const index = alts.findIndex((alt) => alt === logoAltMatch);
    return index >= 0 ? logos[index] ?? null : null;
  };

  const relatedItems: LogoItem[] = brand.relatedSlugs
    .map(getBrandBySlug)
    .filter((related): related is Brand => Boolean(related))
    .map((related) => ({
      src: findLogo(related) ?? '',
      name: related.name,
      alt: `${related.name} logo`,
      href: `/brands/${related.slug}`
    }))
    .filter(({ src }) => src.length > 0);

  return {
    props: {
      brand,
      logoSrc: findLogo(brand),
      relatedItems
    },
    revalidate: REVALIDATE_SECONDS
  };
};

export default BrandPage;
