import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import 'react-responsive-modal/styles.css';
import React, { FC, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { getPageById } from '../helper/api-util';
import classes from './styles/gallery.module.css';
import { GalleryPageData } from '../types/galleryPage.type';

const GalleryPage: FC<GalleryPageData> = ({
  GalleryTitle, GallerySubTitle, Data, CloseIcon
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string>('');
  const [modalImgDesc, setModalImgDesc] = useState<string>('');
  const [modalImgLocation, setModalImgLocation] = useState<string>('');

  const getImg = (imgSrc: { ImgDesc: string; ImgLocation: string; ImgSrc: string }) => {
    setModalImg(imgSrc.ImgSrc);
    setModalImgDesc(imgSrc.ImgDesc);
    setModalImgLocation(imgSrc.ImgLocation);
    setModal(true);
  };

  const closeIcon = (
    <Image src={CloseIcon} alt="Close Icon" width={50} height={50} />
  );

  return (
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
        <Modal open={modal} onClose={() => setModal(false)} center closeIcon={closeIcon}>
          <Image src={modalImg} alt={`${modalImgDesc} in ${modalImgLocation}`} height={800} width={750} />
        </Modal>
        <section className={classes.gallery}>
          {Data.map((img) => (
            <div className={classes.galleryPictures} key={img.ImgSrc} onClick={() => getImg(img)} role="button" tabIndex={0} onKeyDown={() => getImg(img)}>
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
};

export const getStaticProps: GetStaticProps = async (contex) => {
  const featuredPage = await getPageById('P_GALLERY');

  return {
    props: featuredPage
  };
};

export default GalleryPage;
