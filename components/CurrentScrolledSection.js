import _ from 'lodash';
import { spyScroll, useScrollSpy } from '../utils/spyScroll';

/**
 * Given a parent element ref, this render-props function returns
 * which of the parent's sections is currently scrolled into view
 * @param {Object} sectionsWrapperRef [Scrollable parent node React ref Object]
 */
const CurrentScrolledSection = ({
  sectionsWrapperRef,
  sectionsRefs,
  children,
}) => {
  const throttledOnScroll = _.throttle((e) => {
    setCurrentSection(spyScroll(e.target));
  }, 100);

  // adding the scroll event listener inside this component, and NOT the parent component, to prevent re-rendering of the parent component when
  // the scroll listener is fired and the state is updated, which causes noticable lag.
  /*
  useEffect(() => {
    const wrapperElm = sectionsWrapperRef.current;
    if (wrapperElm) {
      document.addEventListener('scroll', throttledOnScroll);
      setCurrentSection(spyScroll(wrapperElm));
    }

    // unbind
    return () => window.removeEventListener('scroll', throttledOnScroll);
  }, []);
 */

  const { current } = useScrollSpy(sectionsRefs);
  const currentSection = current?.getAttribute('data-name')
    ? current?.getAttribute('data-name')
    : 'WELCOME';

  return children(currentSection);
};

export default CurrentScrolledSection;
