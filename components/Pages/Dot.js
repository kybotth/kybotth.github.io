import styled from 'styled-components';

export const Dot = styled.span`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid white;
  border-radius: 50%;
  min-height: 10px;
  min-width: 10px;
  margin: 0 10px;
  cursor: pointer;
  content: '';

  &.active {
    background: white;
    cursor: unset;
  }
`;
