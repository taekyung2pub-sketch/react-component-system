import { css } from 'styled-components';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type AlignItems   = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export const flex = (
  direction: FlexDirection = 'row',
  align: AlignItems        = 'center',
  justify: JustifyContent  = 'flex-start',
  gap?: string,
) => css`
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
  ${gap ? `gap: ${gap};` : ''}
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const truncate = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
