import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { scrollTo } from '../utils';
import { useMedia } from '../hooks/useMedia';
import PortfolioIcon from './Pages/images/mobile_portfolio_icon.png';
import WelcomeIcon from './Pages/images/mobile_welcome_icon.png';
import ContactIcon from './Pages/images/mobile_contact_icon.png';
import AboutIcon from './Pages/images/mobile_about_me_icon.png';

import 'hamburgers/dist/hamburgers.css';

const HeaderContainer = styled.header`
  position: fixed;
  top: 20px;
  right: 0;
  width: 100%;
  height: 80px;
  z-index: 10;

  &.mobile > div {
    border-radius: 40px;
    margin: 0px 5% 0 auto;
    height: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80px;
    transition: height 0.2s ease-in-out;
    padding-top: 13px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    &.mobile-open {
      height: 320px;
      overflow: hidden;
    }
  }

  &.mobile > div button {
    display: flex;
  }

  &.no-mobile > div {
    border-radius: 40px;
    margin: 0 auto;
    height: inherit;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    width: 90%;
    background: #eb9a26;
  }
`;

const NavLinkUl = styled.ul`
  height: inherit;
`;

const NavLinkLi = styled.li`
  list-style: none;
  float: left;
  height: inherit;
`;

const NavLinkButton = styled.button`
  height: inherit;
  font-size: 34px;
  font-weight: 500;
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: 0 20px;
  cursor: pointer;
`;

const NavLinkButtonIcon = styled.button`
  background: transparent;
  border: 0;
  box-shadow: none;
  cursor: pointer;

  &.active {
    color: white;
    /* border-bottom: 4px solid blue; */
  }
`;

const SubNavLinkButton = styled.button`
  font-size: 29px;
  font-weight: 500;
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: 0 20px;
  cursor: pointer;

  &.active {
    color: white;
    /* border-bottom: 4px solid blue; */
  },
`;

const MobileWrapper = styled.div`
  background: #eb9a26;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
`;

const Hamburgers = ({ active, handleClick }) => {
  return (
    <button
      className={`hamburger hamburger--spin ${active ? 'is-active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

const Header = ({ currentSection, sectionsRefs }) => {
  const [active, setActive] = useState(false);
  const clear = useRef();

  const handleClickHamburger = () => setActive((cur) => !cur);

  const scrollToTarget = useCallback(
    (refName) => () => {
      window.clearTimeout(clear.current);

      if (refName && sectionsRefs[refName] && sectionsRefs[refName].current)
        // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        sectionsRefs[refName].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      clear.current = window.setTimeout(() => setActive(false), 700);
    },
    [sectionsRefs]
  );

  const showMobile = useMedia('(max-width: 1100px)');

  return (
    <HeaderContainer
      className={`navigation ${showMobile ? 'mobile' : 'no-mobile'}`}
    >
      {!showMobile && (
        <div className="wrapper">
          <NavLinkUl>
            {sectionsRefs &&
              Object.keys(sectionsRefs).map((el, i) => (
                <NavLinkLi key={el}>
                  <NavLinkButton
                    className={`${currentSection === el ? 'active' : ''}`}
                    onClick={() => scrollToTarget(el)()}
                  >
                    {el.replace(/-/g, ' ')}
                  </NavLinkButton>
                </NavLinkLi>
              ))}
          </NavLinkUl>
        </div>
      )}
      {showMobile && (
        <MobileWrapper className={`${active ? 'mobile-open' : ''}`}>
          <Hamburgers active={active} handleClick={handleClickHamburger} />
          {active && (
            <>
              <NavLinkButtonIcon onClick={() => scrollToTarget('WELCOME')()}>
                <Image src={WelcomeIcon} alt="" height="60px" width="60px" />
              </NavLinkButtonIcon>
              <NavLinkButtonIcon onClick={() => scrollToTarget('PORTFOLIO')()}>
                <Image src={PortfolioIcon} alt="" height="60px" width="60px" />
              </NavLinkButtonIcon>
              <NavLinkButtonIcon onClick={() => scrollToTarget('ABOUT-ME')()}>
                <Image src={AboutIcon} alt="" height="60px" width="60px" />
              </NavLinkButtonIcon>
              <NavLinkButtonIcon onClick={() => scrollToTarget('CONTACT')()}>
                <Image src={ContactIcon} alt="" height="60px" width="60px" />
              </NavLinkButtonIcon>
            </>
          )}
        </MobileWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
