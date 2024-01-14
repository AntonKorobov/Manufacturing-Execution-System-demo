import styled from 'styled-components';

export const Main = styled.main`
  text-align: center;
`;

export const H1 = styled.h1`
  font-family: ${(props) => props.theme.fontFamily.secondary};
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
`;
