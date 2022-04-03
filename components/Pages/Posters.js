import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { wrap } from 'popmotion';
import { v4 as uuidv4 } from 'uuid';

import { Content } from '../Content';
import Title from '../Title';
import SubTitle from '../SubTitle';

const images = [
  '/images/poster01.jpg',
  '/images/poster02.jpg',
  '/images/poster03.jpg',
  '/images/poster04.jpg',
  '/images/poster05.jpg',
  '/images/poster06.jpg',
  '/images/poster07.jpg',
  '/images/poster08.jpg',
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

const Dot = styled.span`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid white;
  border-radius: 50%;
  min-height: 10px;
  min-width: 10px;
  margin: 0 20px;
  cursor: pointer;
  content: '';

  &.active {
    background: white;
    cursor: unset;
  }
`;

const Posters = ({ page: pageId }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDotNavigation = (page) => {
    setPage([page, 1]);
  };

  return (
    <Content id={pageId}>
      <Title>Posters/Banners</Title>
      <SubTitle>DIGITAL &amp; PRINT</SubTitle>
      <hr style={{ maxWidth: 900, borderColor: '#ea9a27' }} />
      <br />
      <div className="slider-container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
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
            key={dot.src}
            onClick={imageIndex === i ? null : () => handleDotNavigation(i)}
          />
        ))}
      </div>
    </Content>
  );
};

export default Posters;
