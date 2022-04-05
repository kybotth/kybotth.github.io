import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import logo from './images/logo.png';
import logoNoReflect from './images/logo_no_reflect.png';
import job from './images/job.png';
import stars from './images/stars.png';
import clouds from './images/clouds.png';
import { Content } from '../Content';
import { useMedia } from '../../hooks/useMedia';
import CallMeKybo from './images/CALL_ME_KYBO.png';

const Splash = ({ page }) => {
  const showMobile = useMedia('(max-width: 1100px)');

  if (showMobile) {
    return (
      <>
        <Content
          className="SPLASH wrapper"
          style={{
            height: 0,
            minHeight: 0,
            maxHeight: 0,
            marginTop: 0,
            paddingTop: 0,
          }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <Image src={stars} alt="" />
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <Image src={clouds} alt="" />
          </div>
        </Content>
        <Content
          className="SPLASH wrapper"
          id={page}
          style={{
            height: 'auto',
            minHeight: 'unset',
            maxHeight: 'unset',
            marginTop: 0,
            paddingTop: 0,
          }}
        >
          <div
            style={{
              maxWidth: 200,
              height: 'auto',
            }}
          >
            <Image src={logoNoReflect} layout="responsive" alt="Logo" />
          </div>
          <div
            style={{
              opacity: 1,
              maxWidth: '537px',
              letterSpacing: '7px',
            }}
          >
            <Image src={CallMeKybo} alt="call me kybo" />
            <Image src={job} alt="Logo" />
          </div>
        </Content>
      </>
    );
  }

  return (
    <Content className="SPLASH wrapper" id={page} style={{ marginTop: 0 }}>
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
            style={{
              position: 'absolute',
              left: '-10px',
              top: showMobile ? '50px' : '280px',
            }}
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
