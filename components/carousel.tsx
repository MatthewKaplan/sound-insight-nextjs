import React, { FC } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { boolean, number, text } from '@storybook/addon-knobs';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './styles/carousel.module.css';

type Props = {
  icons: string[];
  links: string[];
  pictures: string[];
  iconNames: string[];
};

const CarouselComponent: FC<Props> = ({
  icons, iconNames, pictures, links
}) => {
  const imgArr: { img: string; logo: string; name: string; link: string }[] = [];
  for (let i = 0; i < iconNames.length; i += 1) {
    imgArr.push({
      img: pictures[i],
      logo: icons[i],
      name: iconNames[i],
      link: links[i]
    });
  }

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
      <div className={classes.topBreakLine}>
        <hr className={classes.topPageBreak} />
      </div>
      <div className={classes.browserCarousel}>
        <Carousel
          centerMode
          centerSlidePercentage={number('centerSlidePercentage', 40, {}, mainGroupId)}
          {...getConfigurableProps()}
        >
          {
            imgArr.map(({
              name, img, logo, link
            }) => (
              <div
                key={name}
                style={{
                  display: 'flex', flexDirection: 'column', maxWidth: '200px', margin: '0 auto', cursor: 'pointer'
                }}
              >
                <a href={link} target="_blank" rel="noreferrer">
                  <Image src={img} width={300} height={225} alt={`${name} television/speakers`} />
                  <Image src={logo} width={300} height={100} alt={`${name} television/speakers`} />
                </a>
              </div>
            ))
          }
        </Carousel>
      </div>
      <div className={classes.bottomBreakLine}>
        <hr className={classes.bottomPageBreak} />
      </div>
    </div>
  );
};

export default CarouselComponent;
