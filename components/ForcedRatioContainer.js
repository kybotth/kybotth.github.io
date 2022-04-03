import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  border-radius: 50%;
  overflow: hidden;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const FixedRatioContainer = ({ children, ...props }) => {
  return (
    <Box {...props}>
      <div>{children}</div>
    </Box>
  );
};
