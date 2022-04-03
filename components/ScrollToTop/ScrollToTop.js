import { useEffect, useState } from 'react';
import Image from 'next/image';

import scrollButton from './back-to-top.png';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(!showScroll && window.pageYOffset > 400);
    };

    document.addEventListener('scroll', checkScrollTop);

    return () => document.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (
    <span className="scrollTop">
      <Image
        src={scrollButton}
        alt=""
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
      />
    </span>
  );
};

export default ScrollToTop;
