import {
  gray, black, white,
  primary, secondary,
  surface, border,
  semantic, gradient,
} from './tokens/color';

import { fontSize, lineHeight, fontWeight } from './tokens/typography';
import { spacing, radius, shadow, transition } from './tokens/spacing';
import { breakpoints } from './tokens/breakpoints';

const theme = {
  color: {
    gray,
    black,
    white,
    primary,
    secondary,
    surface,
    border,
    semantic,
    gradient,
  },
  typography: {
    fontSize,
    lineHeight,
    fontWeight,
  },
  spacing,
  radius,
  shadow,
  transition,
  breakpoints,
} as const;

export type Theme = typeof theme;
export default theme;
