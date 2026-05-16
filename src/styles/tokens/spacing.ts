// =========================
// Spacing Tokens
// =========================

export const spacing = {
  xs:  '4px',
  sm:  '8px',
  md:  '16px',
  lg:  '24px',
  xl:  '32px',
  '2xl': '48px',
} as const;

// Border Radius
export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '16px',
  full: '9999px',
} as const;

// Shadow
export const shadow = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
} as const;

// Transition
export const transition = {
  fast:   '0.15s ease',
  normal: '0.25s ease',
} as const;
