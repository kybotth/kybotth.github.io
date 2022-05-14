import Image from 'next/image';
import styled from 'styled-components';
import { useMedia } from '../../hooks/useMedia';

import { Content } from '../Content';
import Title from '../Title';

import Butt from './images/butt.png';
import CuteBoi from './images/cuteboi.png';

const About = ({ page: pageId }) => {
  const showMobile = useMedia('(max-width: 1100px)');
  const TextBox = styled.div`
    background: rgb(212, 212, 212);
    background: linear-gradient(
      157deg,
      rgba(212, 212, 212, 0.6) 0%,
      rgba(203, 203, 203, 0.6) 50%,
      rgba(70, 69, 69, 0.6) 51%,
      rgba(64, 63, 63, 0.6) 100%
    );
    padding: 60px;
    border-radius: 40px;
    color: white;
    border: 3px solid white;
    position: relative;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7);
  `;

  const buttStyle = {
    position: 'absolute',
    width: '50px',
    zIndex: 2,
  };

  const P = styled.p`
    font-weight: 300;
    /* color: #eb9a26; */
  `;

  return (
    <Content id={pageId} className={`${showMobile ? 'mobile' : ''}`}>
      <div style={{ transform: 'translateX(-80px)' }}>
        <Title>About Me</Title>
        <br />
        <hr style={{ maxWidth: 600, borderColor: '#ea9a27' }} />
        <br />
      </div>
      <div className="slider-container" style={{ overflow: 'unset' }}>
        <span
          style={{
            ...buttStyle,
            zIndex: 0,
            width: '300px',
            right: '-70px',
            top: '-200px',
          }}
        >
          <Image src={CuteBoi} layout="responsive" alt="" />
        </span>
        <TextBox>
          <span
            style={{
              ...buttStyle,
              left: '10px',
              top: '10px',
            }}
          >
            <Image src={Butt} layout="responsive" alt="" />
          </span>
          <span
            style={{
              ...buttStyle,
              right: '10px',
              bottom: '10px',
            }}
          >
            <Image src={Butt} layout="responsive" alt="" />
          </span>
          <span
            style={{
              ...buttStyle,
              left: '10px',
              bottom: '10px',
            }}
          >
            <Image src={Butt} layout="responsive" alt="" />
          </span>
          <h3
            style={{
              color: '#eb9a26',
              fontSize: '40px',
              margin: 0,
              padding: 0,
            }}
          >
            With a lot of AMBITION!
          </h3>

          <P style={{ marginTop: 0, maxWidth: '70%' }}>
            I have 4 years experience in designing Digital and Print projects
            which are high quality and make my clients satisfy.
          </P>

          <P style={{ maxWidth: '70%' }}>
            I&apos;m lucky enough to work with some of the most creative people
            in the world.
          </P>

          <P>
            I got my first Freelance Job experience as a graphic designer in
            2018 with Mrs. Hunter, who had given me a great opportinity to learn
            and obtain an entry level graphic design position where I improved
            my skills and knowledge.
          </P>

          <P>
            In 2020 I took some time off for my personal stuff but not
            forgetting to learn new things and stay trending everyday. Put out
            my UI goals and worked on my personal projects, self-taught Figma
            and Adobe XD to achieve them. Until iStudio offered me to join their
            team on May 2021 as a part-time job. Helping the company grow and
            develop as well as brand promotion abroad to attract foreign
            teachers to teach English to Vietnamese children with my designs.
          </P>
          <P>
            Check out my{' '}
            <a
              href="https://behance.net/kyboho"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ea9a27', textDecoration: 'underline' }}
            >
              Behance
            </a>{' '}
            content!
          </P>
        </TextBox>
      </div>
    </Content>
  );
};

export default About;
