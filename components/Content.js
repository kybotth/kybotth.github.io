import styled from 'styled-components';

const Wrapper = styled.article`
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 20px;
  width: 100%;
  position: relative;
`;

export const Content = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};
