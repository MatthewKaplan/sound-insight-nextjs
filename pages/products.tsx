import { GetStaticProps } from 'next';
import { FC } from 'react';
import Link from 'next/link';
import Seo from '../components/seo';
import Hero from '../components/hero';
import ConversionBand from '../components/conversionBand';
import LogoGrid, { LogoItem, zipLogos } from '../components/logoGrid';
import { getPagesById, REVALIDATE_SECONDS } from '../helper/api-util';
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../helper/structured-data';
import classes from './styles/products.module.css';
import uiClasses from '../components/styles/ui.module.css';
import { ProductPageData } from '../types/productPageData';
import { BrandPageData } from '../types/brandPage.type';
import { withBrandHrefs } from '../data/brands';

type CategoryData = {
  title: string;
  items: LogoItem[];
};

type Props = {
  SplashImg: string;
  SplashSubTitle: string;
  categories: CategoryData[];
  brandWall: LogoItem[];
};

const ProductsPage: FC<Props> = ({
  SplashImg, SplashSubTitle, categories, brandWall
}) => (
  <>
    <Seo
      title="Sound Insight - TVs | Speakers | Amplifiers | Turntables | Streamers"
      description="Curated audio and video products you can hear before you buy — TVs, speakers, amplifiers, turntables, streamers, and AV furniture at our Huntington, NY showroom."
      path="/products"
      structuredData={[
        buildLocalBusinessSchema('/products'),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' }
        ])
      ]}
    />

    <Hero
      compact
      title="What's on our floor"
      eyebrow="Products"
      subtitle={SplashSubTitle}
      imageSrc={SplashImg}
      imageAlt=""
    >
      <Link href="/contact" className="btn btnPrimary">Book a demo</Link>
    </Hero>

    <div className="container section">
      <p className={`prose ${classes.positioning}`}>
        Anything below can be bought online. What you can&apos;t buy online is
        hearing it first — set up properly, in a real room, next to its
        competition — and having the same people design, install, and calibrate
        it in your home. That&apos;s what the showroom is for.
      </p>

      <nav className={classes.jumpNav} aria-label="Product categories">
        {categories.map(({ title }) => (
          <a key={title} href={`#${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className={classes.jumpLink}>
            {title}
          </a>
        ))}
        <a href="#brands" className={classes.jumpLink}>All brands</a>
      </nav>

      {categories.map(({ title, items }) => (
        <section
          key={title}
          id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className={classes.category}
          aria-label={title}
        >
          <div className={classes.categoryHead}>
            <h2 className={classes.categoryTitle}>{title}</h2>
            <span className={classes.categoryCount}>{`${items.length} brands`}</span>
          </div>
          <LogoGrid items={items} ariaLabel={`${title} brands`} />
        </section>
      ))}

      <section id="brands" className={classes.category} aria-labelledby="brands-heading">
        <div className={uiClasses.sectionHead}>
          <span className="eyebrow">The full list</span>
          <h2 id="brands-heading" className={uiClasses.sectionTitle}>Brands we carry</h2>
          <p className={uiClasses.sectionSub}>
            If you don&apos;t see the line you&apos;re looking for,
            {' '}
            <Link href="/contact">ask us</Link>
            {' '}
            — we can usually get it, and we&apos;ll tell you honestly when
            something else is better value.
          </p>
        </div>
        <LogoGrid items={brandWall} ariaLabel="All brands carried" />
      </section>
    </div>

    <ConversionBand
      title="Hear them before you buy them."
      subtitle="Dedicated stereo and cinema demo rooms in Huntington village. Bring your music, your room dimensions, or just your curiosity."
      primaryLabel="Book a demo"
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const [productsRaw, brandsRaw] = await getPagesById(['P_PRODUCTS', 'P_BRANDS']);
  const products = productsRaw as ProductPageData;
  const brands = brandsRaw as BrandPageData;

  // Items whose brand has a landing page get an href into /brands/[slug],
  // making the brand wall the crawlable hub for those pages.
  const categories: CategoryData[] = [
    { title: products.ProductTitle1 ?? 'Televisions', items: zipLogos(products.videoImages, products.videoDetails) },
    { title: products.ProductTitle2 ?? 'Receivers & Amplifiers', items: zipLogos(products.audioIcons, products.audioNames) },
    { title: products.ProductTitle5 ?? 'Speakers', items: zipLogos(products.speakerIcons, products.speakerNames) },
    { title: products.ProductTitle3 ?? 'Turntables', items: zipLogos(products.turntableIcons, products.turntableNames) },
    { title: products.ProductTitle4 ?? 'Internet Music Streamers', items: zipLogos(products.streamerIcons, products.streamerNames) },
    { title: products.ProductTitle6 ?? 'Furniture', items: zipLogos(products.furnitureLogos, products.furnitureNames) }
  ]
    .map(({ title, items }) => ({ title, items: withBrandHrefs(items) }))
    .filter(({ items }) => items.length > 0);

  const logos = (brands.manufacturerLogo ?? []) as string[];
  const alts = (brands.manufacturerAltText ?? []) as string[];
  const brandWall: LogoItem[] = withBrandHrefs(logos.map((src, i) => ({
    src,
    name: (alts[i] ?? '').replace(/\s*logo\s*$/i, ''),
    alt: alts[i] ?? ''
  })));

  return {
    props: {
      SplashImg: products.SplashImg,
      SplashSubTitle: products.SplashSubTitle,
      categories,
      brandWall
    },
    revalidate: REVALIDATE_SECONDS
  };
};

export default ProductsPage;
