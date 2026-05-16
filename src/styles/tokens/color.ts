// =========================
// Color Tokens
// =========================

// Gray Scale
export const gray = {
  900: '#18181b',
  800: '#27272a',
  700: '#3f3f46',
  600: '#52525b',
  500: '#71717a',
  400: '#a1a1aa',
  300: '#d4d4d8',
  200: '#e4e4e7',
  100: '#f4f4f5',
} as const;

export const black = '#000000';
export const white = '#ffffff';

// Primary
export const primary = {
  1: '#7c8ea3',
  2: '#62748a',
  3: '#4a5b70',
} as const;

// Secondary
export const secondary = {
  1: '#b08b6b',
  2: '#9a7658',
  3: '#7e6047',
} as const;

// Surface
export const surface = {
  1: '#ffffff',
  2: '#f8f8f8',
  3: '#f1f1f1',
} as const;

// Border
export const border = {
  1: '#e4e4e7',
  2: '#d4d4d8',
  3: '#a1a1aa',
} as const;

// Semantic
export const semantic = {
  success: '#6f8a7a',
  warning: '#d6a45d',
  error:   '#c46b6b',
  info:    '#7c8ea3',
} as const;

// Gradient
export const gradient = {
  1: 'linear-gradient(135deg, #7c8ea3 0%, #b0bccb 100%)',
  2: 'linear-gradient(135deg, #b08b6b 0%, #e2d1bf 100%)',
} as const;
