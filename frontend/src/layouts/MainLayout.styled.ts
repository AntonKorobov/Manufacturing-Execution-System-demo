import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.primary};

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: 100px auto;
    grid-template-rows: 100px auto 100px;
    grid-template-areas:
      'n h'
      'n m'
      'n m';
    height: 100%;
  }
`;

export const Main = styled.main`
  grid-area: m;
  height: calc(100vh - 200px);
  background-color: ${(props) => props.theme.color.mainWhite};
`;
