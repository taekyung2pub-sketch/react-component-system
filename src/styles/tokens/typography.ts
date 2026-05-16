// =========================
// Typography Tokens
// =========================

// Font Size & Line Height
export const fontSize = {
  title01: '32px',
  title02: '24px',
  title03: '20px',
  body01:  '18px',
  body02:  '16px',
  body03:  '14px',
  body04:  '13px',
  caption01: '12px',
  caption02: '11px',
} as const;

export const lineHeight = {
  title01: '44px',
  title02: '34px',
  title03: '30px',
  body01:  '30px',
  body02:  '26px',
  body03:  '22px',
  body04:  '20px',
  caption01: '18px',
  caption02: '16px',
} as const;

// Font Weight
export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;

export type FontWeightKey = keyof typeof fontWeight;
