import { useRef } from 'react';
import { Header } from './';
import styled from 'styled-components';
import CurrentScrolledSection from './CurrentScrolledSection';

const Wrapper = styled.main`
  position: relative;
  width: 90%;
  margin: 0 auto;
`;

const Layout = ({ children, ...props }) => {
  return (
    <Wrapper>
      <Header {...props} />
      {children}
    </Wrapper>
  );
};

export default Layout;
