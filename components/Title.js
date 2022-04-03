import styled from 'styled-components';

const H1Title = styled.h1`
  color: #ea9a27;
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  margin: 0;
  /* text-transform: uppercase; */
`;

const Title = ({ children, ...props }) => {
  return <H1Title {...props}>{children}</H1Title>;
};

export default Title;
