import React, { FC } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { boolean, number, text } from '@storybook/addon-knobs';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './styles/carousel.module.css';

type Props = {
  icons: string[];
  iconNames: string[];
  links: string[];
};

const CarouselComponent: FC<Props> = ({ icons, iconNames, links }) => {
  const baseChildren = icons.map((image, i) => (
    <div key={image} className={classes.carouselDiv}>
      <Image src={image} width={250} height={250} alt={`${iconNames[i]} television/speakers`} />
      <a href={links[i]} target="_blank" rel="noreferrer">
        <p className={classes.legend}>{iconNames[i]}</p>
      </a>
    </div>
  ));

  const tooglesGroupId = 'Toggles';
  const valuesGroupId = 'Values';
  const mainGroupId = 'Main';

  const getConfigurableProps = () => ({
    showArrows: boolean('showArrows', true, tooglesGroupId),
    showStatus: boolean('showStatus', true, tooglesGroupId),
    showIndicators: boolean('showIndicators', false, tooglesGroupId),
    infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
    showThumbs: boolean('showThumbs', false, tooglesGroupId),
    useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    autoPlay: boolean('autoPlay', true, tooglesGroupId),
    stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    swipeable: boolean('swipeable', true, tooglesGroupId),
    dynamicHeight: boolean('dynamicHeight', false, tooglesGroupId),
    emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    autoFocus: boolean('autoFocus', false, tooglesGroupId),
    thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    interval: number('interval', 8000, {}, valuesGroupId),
    transitionTime: number('transitionTime', 2000, {}, valuesGroupId),
    swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
    ariaLabel: text('ariaLabel', '')
  });
  return (
    <div className={classes.carouselContainer}>
      <div className={classes.browserCarousel}>
        <Carousel
          centerMode
          centerSlidePercentage={number('centerSlidePercentage', 40, {}, mainGroupId)}
          {...getConfigurableProps()}
        >
          {baseChildren}

        </Carousel>
      </div>
      <div className={classes.mobileCarousel}>
        <Carousel
          centerMode
          {...getConfigurableProps()}
        >
          {baseChildren}

        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;
