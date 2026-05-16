import { createGlobalStyle } from 'styled-components';
import { resetStyles } from './reset.ts';

const GlobalStyle = createGlobalStyle`
  ${resetStyles}
`;

export default GlobalStyle;
