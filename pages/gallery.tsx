import { GetStaticProps } from 'next';
import {
  FC, KeyboardEvent, useCallback, useEffect, useRef, useState
} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Seo from '../components/seo';
import ConversionBand from '../components/conversionBand';
import { getPageById, REVALIDATE_SECONDS } from '../helper/api-util';
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../helper/structured-data';
import classes from './styles/gallery.module.css';
import uiClasses from '../components/styles/ui.module.css';

type GalleryItem = {
  ImgSrc: string;
  ImgDesc: string;
  ImgLocation: string;
};

type Props = {
  GalleryTitle: string;
  GallerySubTitle: string;
  Data: GalleryItem[];
};

const CATEGORIES = ['All', 'Cinema', 'Audio & Video', 'Outdoor', 'Automation'] as const;
type Category = typeof CATEGORIES[number];

const categorize = (desc: string): Category => {
  const d = desc.toLowerCase();
  if (/outdoor|pool|patio|backyard|sunbrite/.test(d)) return 'Outdoor';
  if (/theater|cinema|seating|projector|screen/.test(d)) return 'Cinema';
  if (/light|automation|control|shade|keypad|thermostat|distribution|network|rack/.test(d)) return 'Automation';
  return 'Audio & Video';
};

const GalleryPage: FC<Props> = ({ GalleryTitle, GallerySubTitle, Data }) => {
  const [filter, setFilter] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const items = Data.filter((item) => filter === 'All' || categorize(item.ImgDesc) === filter);
  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  const close = useCallback(() => {
    setLightboxIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + delta + items.length) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [lightboxIndex]);

  const onLightboxKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <>
      <Seo
        title="Sound Insight - Project Gallery | Home Theaters | Outdoor TVs"
        description="Browse recent Sound Insight installations across Long Island — home theaters, outdoor TVs, lighting control, whole-home audio, and more."
        path="/gallery"
        structuredData={[
          buildLocalBusinessSchema('/gallery'),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery' }
          ])
        ]}
      />

      <div className="container section">
        <div className={uiClasses.sectionHead}>
          <span className="eyebrow">Recent work</span>
          <h1 className={uiClasses.sectionTitle}>{GalleryTitle}</h1>
          <p className={uiClasses.sectionSub}>{GallerySubTitle}</p>
        </div>

        <div className={classes.filters} role="group" aria-label="Filter projects by type">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={clsx(classes.filterChip, filter === category && classes.filterChipActive)}
              aria-pressed={filter === category}
              onClick={() => {
                setFilter(category);
                setLightboxIndex(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className={classes.grid}>
          {items.map((item, index) => (
            <li key={item.ImgSrc} className={classes.item}>
              <button
                type="button"
                className={classes.itemButton}
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setLightboxIndex(index);
                }}
              >
                <Image
                  src={item.ImgSrc}
                  alt={item.ImgLocation
                    ? `${item.ImgDesc.trim()} in ${item.ImgLocation}`
                    : item.ImgDesc.trim()}
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={classes.itemImg}
                />
              </button>
              <p className={classes.caption}>
                <strong>{item.ImgDesc.trim()}</strong>
                {item.ImgLocation && (
                  <span className={classes.captionLocation}>{item.ImgLocation}</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          className={classes.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.ImgDesc.trim()}${active.ImgLocation ? ` — ${active.ImgLocation}` : ''}`}
          onKeyDown={onLightboxKeyDown}
        >
          <button
            type="button"
            className={classes.lightboxBackdrop}
            aria-label="Close image viewer"
            onClick={close}
            tabIndex={-1}
          />
          <div className={classes.lightboxContent}>
            <div className={classes.lightboxImgWrap}>
              <Image
                src={active.ImgSrc}
                alt={active.ImgDesc.trim()}
                fill
                sizes="90vw"
                className={classes.lightboxImg}
              />
            </div>
            <p className={classes.lightboxCaption}>
              <strong>{active.ImgDesc.trim()}</strong>
              {active.ImgLocation ? ` — ${active.ImgLocation}` : ''}
            </p>
            <div className={classes.lightboxControls}>
              <button type="button" className="btn btnSecondary onDark" onClick={() => step(-1)}>
                Previous
              </button>
              <button
                type="button"
                ref={closeButtonRef}
                className="btn btnPrimary"
                onClick={close}
              >
                Close
              </button>
              <button type="button" className="btn btnSecondary onDark" onClick={() => step(1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <ConversionBand
        title="Want a room like this?"
        subtitle="Every project here started with a conversation. Tell us what you're imagining and we'll tell you what it takes."
        primaryLabel="Request a free estimate"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredPage = await getPageById('P_GALLERY');

  return {
    props: featuredPage,
    revalidate: REVALIDATE_SECONDS
  };
};

export default GalleryPage;
