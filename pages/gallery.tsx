import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import Seo from '../components/seo';
import 'react-responsive-modal/styles.css';
import { getPageById } from '../helper/api-util';
import { buildBreadcrumbSchema } from '../helper/structured-data';
import classes from './styles/gallery.module.css';
import { GalleryPageData } from '../types/galleryPage.type';

const GalleryPage: FC<GalleryPageData> = ({
  GalleryTitle, GallerySubTitle, Data
}) => (
  <div className={classes.galleryPage}>
    <Seo
      title="Sound Insight - Project Gallery | Home | Audio"
      description="Whether You Wish to Spin Vinyl or Listen to Digital Music Media it Sounds Better on Sound Insight's Carefully Selected Products and Custom Designed Systems."
      path="/gallery"
      keywords="Audio Video Gallery, Audio Video Racks, Gifts, Gifts for Fathers Day, Record Players, Audio Systems, Sound Systems, Multi-room Audio & Video, Custom Installation, Music"
      structuredData={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' }
      ])}
    />
    <div className={classes.header} />
    <div className={classes.galleryInfo}>
      <section className={classes.pageHeading}>
        <h1>{GalleryTitle}</h1>
        <p>{GallerySubTitle}</p>
      </section>
      <section className={classes.gallery}>
        {Data.map((img) => (
          <div className={classes.galleryPictures} key={img.ImgSrc}>
            <img src={img.ImgSrc} alt={`${img.ImgDesc} in ${img.ImgLocation}`} />
            <span className={classes.highlight}>
              <p className={classes.imgLocation}>{img.ImgLocation ? img.ImgLocation : ''}</p>
              <p className={classes.imgDescription}>{img.ImgDesc}</p>
            </span>
          </div>
        ))}
      </section>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_GALLERY');

  return {
    props: featuredPage
  };
};

export default GalleryPage;
