// =========================
// Breakpoint Tokens
// =========================

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export type BreakpointKey = keyof typeof breakpoints;
