import { injectGlobal } from 'styled-components';

//eslint-disable-next-line
injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  * {
   box-sizing: inherit;
  }
`;
