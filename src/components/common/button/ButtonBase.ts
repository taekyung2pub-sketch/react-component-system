import { css } from 'styled-components';
import { transition } from '@/styles/tokens/spacing';

export const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background-color ${transition.fast}, color ${transition.fast}, border-color ${transition.fast}, opacity ${transition.fast};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:active:not(:disabled) {
    opacity: 0.85;
  }
`;