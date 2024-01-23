import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-area: f;
  background-color: ${(props) => props.theme.color.grayLight};
`;
