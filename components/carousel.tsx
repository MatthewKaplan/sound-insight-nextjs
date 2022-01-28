import React, { CSSProperties, FC, useState } from 'react';
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
  const [prevArrowHover, setPrevArrowHover] = useState<boolean>(false);
  const [nextArrowHover, setNextArrowHover] = useState<boolean>(false);
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
    showStatus: boolean('showStatus', false, tooglesGroupId),
    showIndicators: boolean('showIndicators', true, tooglesGroupId),
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
    selectedItem: number('selectedItem', 1, {}, valuesGroupId),
    interval: number('interval', 8000, {}, valuesGroupId),
    transitionTime: number('transitionTime', 2000, {}, valuesGroupId),
    swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
    ariaLabel: text('ariaLabel', '')
  });

  const carouselDiv = imgArr.map(({
    name, img, logo, link
  }) => (
    <div key={name} className={classes.carouselDiv}>
      <a href={link} target="_blank" rel="noreferrer">
        <Image src={img} width={300} height={225} alt={`${name} television/speakers`} />
        <Image src={logo} width={300} height={100} alt={`${name} brand logo`} />
      </a>
    </div>
  ));

  const indicatorStyles: CSSProperties = {
    display: 'inline-block',
    margin: '0 8px'
  };

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
          renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && (
            <button
              type="button"
              title={label}
              onClick={onClickHandler}
              className={classes.arrow}
              style={{ left: 15, paddingLeft: 15 }}
              onMouseEnter={() => setPrevArrowHover(true)}
              onMouseLeave={() => setPrevArrowHover(false)}
            >
              <Image
                onClick={onClickHandler}
                alt="previous slide arrow"
                width={prevArrowHover ? 50 : 25}
                height={prevArrowHover ? 50 : 25}
                src={prevArrowHover ? 'https://res.cloudinary.com/dgmtf6brh/image/upload/v1643334011/right-chevron_6_obvift.png' : 'https://res.cloudinary.com/dgmtf6brh/image/upload/v1643334011/right-chevron_5_deye84.png'}
              />
            </button>
          )}
          renderArrowNext={(onClickHandler, hasNext, label) => hasNext && (
            <button
              title={label}
              type="button"
              onClick={onClickHandler}
              className={classes.arrow}
              style={{ right: 15, paddingLeft: 15 }}
              onMouseEnter={() => setNextArrowHover(true)}
              onMouseLeave={() => setNextArrowHover(false)}
            >
              <Image
                alt="next slide arrow"
                onClick={onClickHandler}
                width={nextArrowHover ? 50 : 25}
                height={nextArrowHover ? 50 : 25}
                src={nextArrowHover ? 'https://res.cloudinary.com/dgmtf6brh/image/upload/v1643333449/right-chevron_2_luz7sx.png' : 'https://res.cloudinary.com/dgmtf6brh/image/upload/v1643333522/right-chevron_4_qteuuh.png'}
              />
            </button>
          )}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <div style={indicatorStyles}>
                  <Image
                    width={15}
                    height={15}
                    alt="slide selected indicator"
                    src="https://res.cloudinary.com/dgmtf6brh/image/upload/v1643337258/circle_2_v3f5od.png"
                  />
                </div>
              );
            }
            return (
              <div onClick={onClickHandler} role="button" tabIndex={0} style={indicatorStyles} onKeyDown={onClickHandler}>
                <Image
                  width={15}
                  height={15}
                  alt="slide not selected indicator"
                  src="https://res.cloudinary.com/dgmtf6brh/image/upload/v1643337355/circle_3_b9kjrz.png"
                />
              </div>
            );
          }}
        >
          {carouselDiv}
        </Carousel>
      </div>
      <div className={classes.mobileCarousel}>
        <Carousel centerMode {...getConfigurableProps()}>
          {carouselDiv}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;
