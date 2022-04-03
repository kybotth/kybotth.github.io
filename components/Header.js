import { useState } from 'react';
import styled from 'styled-components';
import { scrollTo } from '../utils';

const HeaderContainer = styled.header`
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 10;

  > div {
    border-radius: 40px;
    margin: 0 auto;
    height: inherit;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    background: #eb9a26;
    width: 90%;
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

  &.active {
    color: white;
    /* border-bottom: 4px solid blue; */
  }
`;

const SubNavLinkButton = styled.button`
  font-size: 34px;
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

const Header = ({ currentSection, sectionsRefs }) => {
  const scrollToTarget = (refName) => () => {
    if (refName && sectionsRefs[refName] && sectionsRefs[refName].current)
      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
      sectionsRefs[refName].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  };

  return (
    <HeaderContainer className="navigation">
      <div className="wrapper">
        <NavLinkUl>
          {sectionsRefs &&
            Object.keys(sectionsRefs).map((el, i) => (
              <NavLinkLi key={el}>
                <NavLinkButton
                  className={`${currentSection === el ? 'active' : ''}`}
                  onClick={scrollToTarget(el)}
                >
                  {el.replace(/-/g, ' ')}
                </NavLinkButton>
                {/* {el === 'PORTFOLIO' && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#EB9A26',
                    }}
                  >
                    <SubNavLinkButton
                      className={`${currentSection === el ? 'active' : ''}`}
                      onClick={scrollToTarget(el)}
                    >
                      Posters
                    </SubNavLinkButton>
                    <SubNavLinkButton
                      className={`${currentSection === el ? 'active' : ''}`}
                      onClick={scrollToTarget(el)}
                    >
                      Videos
                    </SubNavLinkButton>
                    <SubNavLinkButton
                      className={`${currentSection === el ? 'active' : ''}`}
                      onClick={scrollToTarget(el)}
                    >
                      Pictures
                    </SubNavLinkButton>
                  </div>
                )} */}
              </NavLinkLi>
            ))}
        </NavLinkUl>
      </div>
    </HeaderContainer>
  );
};

export default Header;
