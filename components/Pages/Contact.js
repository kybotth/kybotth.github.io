import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Content } from '../Content';
import Title from '../Title';

import LinkedInIcon from './images/LinkedIn_Icon.png';
import PhoneIcon from './images/phone_icon.png';
import EmailIcon from './images/gmail_icon.png';

const LinkText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  padding-left: 20px;
  font-weight: 300;
`;

const SpanBottomBorder1 = styled.div`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(132, 108, 255, 1) 100%
  );
  height: 10px;
  border-radius: 0 0 10px 10px;
`;
const SpanBottomBorder2 = styled.div`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(31, 160, 134, 1) 100%
  );
  height: 10px;
  border-radius: 0 0 10px 10px;
`;

const Personal = ({ page: pageId }) => {
  const rowSpacing = 40;
  return (
    <Content id={pageId}>
      <Title>LET&apos;S GET IN TOUCH</Title>
      <br />
      <hr style={{ maxWidth: 900, borderColor: '#ea9a27' }} />
      <br />
      <table style={{ margin: '0 auto', width: '100%', maxWidth: '600px' }}>
        <tr>
          <td>
            <a
              href="https://www.linkedin.com/in/tue-ho-11a613143/"
              rel="noreferrer"
              target="_blank"
            >
              <AnimatedIcon background="rgb(254,131,110)">
                <Image src={LinkedInIcon} layout="fill" alt="" />
              </AnimatedIcon>
              {/* <Image src={LinkedIn} alt="LinkedIn" /> */}
            </a>
          </td>
          <td>
            {/* <a href="tel:2516227567">
              <LinkText>LinkedIn</LinkText>
            </a>
            <SpanBottomBorder1 /> */}
          </td>
        </tr>
        <tr>
          <td style={{ paddingTop: `${rowSpacing}px` }}>
            <a href="tel:2516227567">
              <AnimatedIcon background="rgb(133,108,254)">
                <Image src={PhoneIcon} alt="Phone" />
              </AnimatedIcon>
            </a>
          </td>
          <td style={{ paddingTop: `${rowSpacing}px` }}>
            <a href="tel:2516227567">
              <LinkText>(251) 622 7567</LinkText>
            </a>
            <SpanBottomBorder1 />
          </td>
        </tr>
        <tr>
          <td style={{ paddingTop: `${rowSpacing}px` }}>
            <a href="mailto:kybotth@gmail.com">
              <AnimatedIcon background="rgb(30,161,134)">
                <Image src={EmailIcon} alt="Email" />
              </AnimatedIcon>
            </a>
          </td>
          <td style={{ paddingTop: `${rowSpacing}px` }}>
            <a href="mailto:kybotth@gmail.com">
              <LinkText>kybotth@gmail.com</LinkText>
            </a>
            <SpanBottomBorder2 />
          </td>
        </tr>
        {/* <tr>
          <td>
            <AnimatedIcon />
          </td>
          <td></td>
        </tr> */}
      </table>
    </Content>
  );
};

const AnimatedIcon = ({ children, background = 'blue' }) => {
  const size = 60;

  const IconAnimated = styled.div`
    transform-origin: 'bottom left';
    /* transform: rotateZ(45deg); */
    width: ${size}px;
    height: ${size}px;
    display: flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 3px white;
    > div {
      width: 100%;
      height: 100%;
      position: relative;
    }
  `;
  const style = {
    transformOrigin: 'bottom left',
    width: `${size}px`,
    height: `${size}px`,
    background: 'rgba(255,255,255,0)',
  };

  const motionProps = {
    whileHover: {
      rotateZ: -30,
      scale: 1.4,
      background: 'rgba(255,255,255,.5)',
    },
    style,
  };

  return (
    <div style={{ background, height: `${size}px`, width: `${size}px` }}>
      <motion.div {...motionProps}>
        <IconAnimated>
          <div>{children}</div>
        </IconAnimated>
      </motion.div>
    </div>
  );
};

export default Personal;
