import styled from 'styled-components';

const H4Title = styled.h4`
  font-family: 'Cinzel', serif;
  color: #ea9a27;
  font-size: 30px;
  font-weight: 100;
  text-align: center;
  letter-spacing: 10px;
`;

const SubTitle = ({ children }) => {
  return <H4Title>{children}</H4Title>;
};

export default SubTitle;
