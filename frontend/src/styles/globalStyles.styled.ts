'use client';

import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export const GlobalStyles = styled.createGlobalStyle`
  :root {
    --backgroundColor: #ffffff;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100vh;
    width: 100vw;
  }

  body {
    background: var(--backgroundColor);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background-color: transparent;
  }
`;
