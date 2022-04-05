import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { wrap } from 'popmotion';

import { Content } from '../Content';
import Title from '../Title';

import seasons from './images/seasons.gif';
import { useImageSize } from '../../hooks/useImageSize';
import { Dot } from './Dot';

import Image from 'next/image';
import { FixedRatioContainer } from '../ForcedRatioContainer';
import { useMedia } from '../../hooks/useMedia';

const images = [
  '/images/events01.jpg',
  '/images/events01.gif',
  '/images/events03.jpg',
  '/images/events04.gif',
  '/images/events05.gif',
  '/images/events06.gif',
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

const Split = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    flex-grow: 1;
  }
`;

const Logos = ({ page: pageId }) => {
  const imageRef = useRef();
  const [height, setHeight] = useState(350);
  const [[page, direction], setPage] = useState([0, 0]);
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

  useEffect(() => {
    if (currentImage) {
      const newHeight = (currentImage.height * 600) / currentImage.width;

      setHeight(newHeight);
    }
  }, [currentImage, imageIndex]);

  return (
    <Content className={`${showMobile ? 'mobile' : ''}`}>
      <Split style={showMobile ? { flexDirection: 'column' } : {}}>
        <div>
          <br />
          <Title style={{ fontSize: '100px' }}>
            Events
            {showMobile && (
              <div
                style={{
                  marginLeft: '10px',
                  width: '70px',
                  display: 'inline-block',
                }}
              >
                <FixedRatioContainer>
                  <Image src={seasons} alt="" layout="fill" />
                </FixedRatioContainer>
              </div>
            )}
          </Title>
          <br />
          <br />
          {!showMobile && <br />}
          <hr style={{ maxWidth: 300, borderColor: '#ea9a27' }} />
          <br />
          {!showMobile && (
            <div style={{ width: '200px', margin: '0 auto' }}>
              <FixedRatioContainer>
                <Image src={seasons} alt="" layout="fill" />
              </FixedRatioContainer>
            </div>
          )}
        </div>
        <div>
          <div
            className="slider-container-logos"
            style={{ height: `${height}px` }}
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
                  x: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    duration: 20,
                  },
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
        </div>
      </Split>
    </Content>
  );
};

export default Logos;
