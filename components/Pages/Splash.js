import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import logo from './images/logo.png';
import job from './images/job.png';
import stars from './images/stars.png';
import clouds from './images/clouds.png';
import { Content } from '../Content';

const Splash = ({ page }) => {
  return (
    <Content className="SPLASH" id={page} style={{ marginTop: 0 }}>
      <AnimatePresence>
        <>
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{
              default: { duration: 1 },
            }}
            style={{ position: 'absolute', left: 0, top: '80px' }}
          >
            <Image src={stars} alt="" />
          </motion.div>
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: '70%' }}
            transition={{
              default: { duration: 1 },
            }}
            style={{ position: 'absolute', left: 0, top: '80px' }}
          >
            <Image src={clouds} alt="" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 1 },
            }}
            style={{ position: 'absolute', left: '-10px', top: '280px' }}
          >
            <Image src={logo} alt="Logo" />
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 1 },
            }}
            style={{
              position: 'absolute',
              right: '0px',
              top: '633px',
              opacity: 1,
              width: '550px',
              letterSpacing: '7px',
            }}
          >
            <span
              className="tan-text call-me-kybo"
              style={{
                margin: '0 5px',
              }}
            >
              CALL ME
            </span>
            <span className="gold-text call-me-kybo">KYBO :)</span>
            <Image src={job} alt="Logo" />
          </motion.div>
        </>
      </AnimatePresence>
    </Content>
  );
};

export default Splash;
