import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { wrap } from 'popmotion';
import { useImageSize } from '../../hooks/useImageSize';

import { Content } from '../Content';
import Title from '../Title';
import { useMedia } from '../../hooks/useMedia';
import { Dot } from './Dot';

const images = [
  '/images/personal01.jpg',
  '/images/personal02.jpg',
  '/images/personal03.jpg',
  '/images/personal04.jpg',
  '/images/personal05.jpg',
  '/images/personal06.jpg',
  '/images/personal10.jpg',
  '/images/personal07.jpg',
  '/images/personal08.jpg',
  '/images/personal09.jpg',
  '/images/personal11.jpg',
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 600 : -600,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 600 : -600,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Personal = ({ page: pageId }) => {
  const imageRef = useRef();
  const [[page, direction], setPage] = useState([0, 0]);
  const [height, setHeight] = useState(350);
  const showMobile = useMedia('(max-width: 1100px)');

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const currentImage = useImageSize(images[imageIndex]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDotNavigation = (page) => {
    setPage([page, 1]);
  };

  const getHeight = useCallback((height, width, actualWidth) => {
    return (height * width) / actualWidth;
  }, []);

  useEffect(() => {
    if (currentImage) {
      const newHeight = getHeight(currentImage.height, 900, currentImage.width);

      setHeight(newHeight);
    }
  }, [currentImage, getHeight]);

  return (
    <Content className={`${showMobile ? 'mobile' : ''}`}>
      <Title>Personal{!showMobile && <> Projects</>}</Title>
      <br />
      <hr style={{ maxWidth: 900, borderColor: '#ea9a27' }} />
      <br />
      <div
        className="slider-container-logos"
        // className="slider-container"
        // style={{ height: `${height}px`, width: '900px' }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            ref={imageRef}
            key={`${page}-${imageIndex}`}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, duration: 20 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
          <img
            style={{ opacity: 0, position: 'relative' }}
            src={images[imageIndex]}
            alt=""
          />
        </AnimatePresence>
        {/* <div className="next" onClick={() => paginate(1)}>
          {'‣'}
          </div>
          <div className="prev" onClick={() => paginate(-1)}>
          {'‣'}
        </div> */}
      </div>
      <div className="flex f-row" style={{ padding: '20px 0' }}>
        {images.map((dot, i) => (
          <Dot
            className={`${imageIndex === i ? 'active' : ''}`}
            key={dot}
            onClick={imageIndex === i ? null : () => handleDotNavigation(i)}
          />
        ))}
      </div>
    </Content>
  );
};

export default Personal;
