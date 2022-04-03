import { useState, useEffect, useRef } from 'react';
import { links } from '../pages/_app';

/**
 *
 * @param {Object} scrollParent [DOM node of scrollable element]
 * @param {Array} _targetElements [Array of nodes to spy on]
 */
export const spyScroll = (scrollParent, _targetElements) => {
  if (!scrollParent) return false;

  // create an Object with all children that has data-name attribute
  const targetElements =
    _targetElements ||
    [...scrollParent.children].reduce(
      (map, item) =>
        item.dataset.name ? { [item.dataset.name]: item, ...map } : map,
      {}
    );

  let bestMatch = {};

  for (const sectionName in targetElements) {
    if (Object.prototype.hasOwnProperty.call(targetElements, sectionName)) {
      const domElm = targetElements[sectionName];
      const delta = Math.abs(scrollParent.scrollTop - domElm.offsetTop); // check distance from top, takig scroll into account

      if (!bestMatch.sectionName) bestMatch = { sectionName, delta };

      // check which delet is closest to "0"
      if (delta < bestMatch.delta) {
        bestMatch = { sectionName, delta };
      }
    }
  }

  // update state with best-fit section
  return bestMatch.sectionName;
};

export const useScrollSpy = (elements) => {
  const [currentElement, setCurrentElement] = useState(
    elements[Object.keys(elements)[0]]
  );
  const lastKnownScrollPosition = useRef(0);
  const ticking = useRef(false);

  const handleFindCurrent = (needle) => {
    const closestToZero = (numbers) => {
      if (!numbers.length) {
        return 0;
      }

      let closest = { y: 0 };

      numbers = numbers.reduce((acc, o) => {
        if (o.y < window.innerHeight / 2) {
          return acc.concat([o]);
        }
        return acc;
      }, []);

      for (let i = 0; i < numbers.length; i++) {
        if (closest.y === 0) {
          closest = numbers[i];
        } else if (numbers[i].y > 0 && numbers[i].y <= Math.abs(closest.y)) {
          closest = numbers[i];
        } else if (numbers[i].y < 0 && -numbers[i].y < Math.abs(closest.y)) {
          closest = numbers[i];
        }
      }

      return closest
        ? closest
        : {
            key: 'WELCOME',
          };
    };

    const positions = Object.keys(elements).map((el) => {
      return {
        y: elements[el].current.getBoundingClientRect().y,
        key: el,
      };
    });

    const goToElement = elements[closestToZero(positions).key];

    console.log(goToElement);

    setCurrentElement(goToElement);
  };

  useEffect(() => {
    const handleScroll = (e) => {
      lastKnownScrollPosition.current = window.pageYOffset;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          handleFindCurrent(lastKnownScrollPosition.current);
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeElementListener('scroll', handleScroll);
  }, []);

  return currentElement;
};
