import { useRef } from 'react';
import '../styles/globals.css';
import { Layout } from '../components/';
import CurrentScrolledSection from '../components/CurrentScrolledSection';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

export const links = ['WELCOME', 'PORTFOLIO', 'ABOUT-ME', 'CONTACT'];

function MyApp({ Component, pageProps }) {
  const sectionsWrapperRef = useRef();

  // prepare DOM refs
  const sectionsRefs = {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  links.forEach((section) => (sectionsRefs[section] = useRef()));

  return (
    <>
      <ScrollToTop />
      <CurrentScrolledSection
        sectionsRefs={sectionsRefs}
        sectionsWrapperRef={sectionsWrapperRef}
      >
        {(currentSection) => {
          return (
            <div className="asideContent" ref={sectionsWrapperRef}>
              <Layout
                currentSection={currentSection}
                sectionsRefs={sectionsRefs}
                links={links}
              >
                <Component
                  pages={links}
                  {...pageProps}
                  {...{ currentSection, sectionsRefs }}
                />
              </Layout>
            </div>
          );
        }}
      </CurrentScrolledSection>
    </>
  );
}

export default MyApp;

