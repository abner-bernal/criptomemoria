import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
    text-decoration: none;
  }

  button {
    background-color: transparent;
  }
  
  html {
    font-size: 62.5%;
  }

  a, button {
    color: ${props => props.theme.colors.highlight};
    cursor: pointer;
  }
  
  body {
    font-size: 1.6rem;
    color: ${props => props.theme.colors.highlight};
    background-color: ${props => props.theme.colors.gray90};
    //font-family: 'Roboto', 'sans-serif';
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`