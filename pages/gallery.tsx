import Head from 'next/head';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import 'react-responsive-modal/styles.css';
import { getPageById } from '../helper/api-util';
import classes from './styles/gallery.module.css';
import { GalleryPageData } from '../types/galleryPage.type';

const GalleryPage: FC<GalleryPageData> = ({
  GalleryTitle, GallerySubTitle, Data
}) => (
  <div className={classes.galleryPage}>
    <Head>
      <title>Sound Insight - Project Gallery | Home | Audio </title>
      <meta name="description" content="Whether You Wish to Spin Vinyl or Listen to Digital Music Media it Sounds Better on Sound Insight's Carefully Selected Products and Custom Designed Systems." />
      <meta name="keywords" content="Audio Video Gallery, Audio Video Racks, Gifts, Gifts for Fathers Day, Record Players, Audio Systems, Sound Systems, Multi-room Audio & Video, Custom Installation, Music" />
    </Head>
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
              <p className={classes.imgLocation}>{img.ImgLocation}</p>
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
