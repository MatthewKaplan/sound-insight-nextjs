import React from 'react';
import Image from 'next/image';
import classes from './styles/carousel.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { boolean, number, text } from '@storybook/addon-knobs';


type Props = {
  icons: string[],
  iconNames: string[],
  links: string[]
}

const CarouselComponent = (props: Props) => {

  const baseChildren = props.icons.map((image, i) =>
    <div key={i} className={classes.carouselDiv}>
      <Image src={image} width={250} height={250} />
      <a href={props.links[i]} target="_blank">
        <p className={classes.legend}>{props.iconNames[i]}</p>
      </a>
    </div>);

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
    ariaLabel: text('ariaLabel', ''),
  });
  return (
    <div className={classes.carouselContainer}>
      <Carousel
        centerMode
        centerSlidePercentage={number('centerSlidePercentage', 40, {}, mainGroupId)}
        {...getConfigurableProps()}>{baseChildren}</Carousel>
    </div>
  );
};

export default CarouselComponent;
