import { useEffect, useRef, useCallback, useState } from 'react';
import _ from 'lodash';
import Head from 'next/head';
import Image from 'next/image';
import {
  About,
  Contact,
  Events,
  Logos,
  Personal,
  Posters,
  Splash,
} from '../components/Pages';
import styles from '../styles/Home.module.css';

export default function Home({
  pages,
  currentSection,
  sectionsRefs,
  sectionsWrapperRef,
}) {
  const Section = useCallback(
    ({ children, name, ...rest }) => (
      <section ref={sectionsRefs[name]} {...rest}>
        <div className="sideSectionContent">{children}</div>
      </section>
    ),
    []
  );

  return (
    <>
      <Section
        name={pages[0]}
        data-name={pages[0]}
        className={currentSection === pages[0] ? 'active' : ''}
      >
        <Splash page={pages[0]} />
      </Section>
      <Section
        name={pages[1]}
        data-name={pages[1]}
        className={currentSection === pages[1] ? 'active' : ''}
      >
        <Posters page={pages[1]} />
      </Section>
      <Section>
        <Logos />
      </Section>
      <Section>
        <Events />
      </Section>
      <Section>
        <Personal page={pages[1]} />
      </Section>
      <Section
        name={pages[2]}
        data-name={pages[2]}
        className={currentSection === pages[2] ? 'active' : ''}
      >
        <About page={pages[2]} />
      </Section>
      <Section
        name={pages[3]}
        data-name={pages[3]}
        className={currentSection === pages[3] ? 'active' : ''}
      >
        <Contact page={pages[3]} />
      </Section>
    </>
  );
}

