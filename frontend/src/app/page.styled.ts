import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const H1 = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xl};
`;
