import { css } from 'styled-components';
import { breakpoints, BreakpointKey } from '../tokens/breakpoints';
import { primary, transition } from '../tokens';

export const responsive = (bp: BreakpointKey) =>
  (styles: TemplateStringsArray, ...args: unknown[]) =>
    css`
      @media (max-width: ${breakpoints[bp]}) {
        ${css(styles, ...args)}
      }
    `;

export const hover = (styles: TemplateStringsArray, ...args: unknown[]) => css`
  transition: ${transition.fast};
  &:hover {
    ${css(styles, ...args)}
  }
`;

export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${primary[1]};
    outline-offset: 2px;
  }
`;
