import * as React from 'react';
import styled from 'styled-components';
import { radius } from '../../../styles/tokens/spacing';
import { gray, primary, secondary, white } from '../../../styles/tokens/color';

// =========================
// Types
// =========================

export type BadgeSize = 'sm' | 'md';
export type BadgeRounded = keyof typeof radius;
export type BadgeVariant = 'filled' | 'soft' | 'outline';
export type BadgeColor = 'gray-dark' | 'gray-light' | 'primary' | 'secondary';

export interface BadgeProps {
    /** 사이즈 (sm / md) */
    size?: BadgeSize;
    /** 모서리 둥글기 */
    rounded?: BadgeRounded;
    /** 배경 스타일 variant */
    variant?: BadgeVariant;
    /** 색상 */
    color?: BadgeColor;
    /** 텍스트 내용 */
    children?: React.ReactNode;
    /** 추가 className */
    className?: string;
}

// =========================
// Token maps
// =========================

// height 고정 없이 padding으로 세로 중앙 정렬
const sizeMap: Record<BadgeSize, { fontSize: string; padding: string }> = {
    sm: { fontSize: '11px', padding: '2px 8px' },
    md: { fontSize: '12px', padding: '4px 10px' },
};

type ColorSet = { bg: string; border: string; text: string };

const colorMap: Record<BadgeColor, Record<BadgeVariant, ColorSet>> = {
    'gray-dark': {
        filled:  { bg: gray[700],      border: gray[700],      text: white },
        soft:    { bg: gray[100],      border: gray[100],      text: gray[700] },
        outline: { bg: 'transparent',  border: gray[700],      text: gray[700] },
    },
    'gray-light': {
        filled:  { bg: gray[400],      border: gray[400],      text: white },
        soft:    { bg: gray[100],      border: gray[100],      text: gray[500] },
        outline: { bg: 'transparent',  border: gray[300],      text: gray[500] },
    },
    primary: {
        filled:  { bg: primary[2],     border: primary[2],     text: white },
        soft:    { bg: '#eef1f4',      border: '#eef1f4',      text: primary[2] },
        outline: { bg: 'transparent',  border: primary[2],     text: primary[2] },
    },
    secondary: {
        filled:  { bg: secondary[2],   border: secondary[2],   text: white },
        soft:    { bg: '#f5ede6',      border: '#f5ede6',      text: secondary[2] },
        outline: { bg: 'transparent',  border: secondary[2],   text: secondary[2] },
    },
};

// =========================
// Styled component
// =========================

interface StyledBadgeProps {
    $size: BadgeSize;
    $rounded: BadgeRounded;
    $colorSet: ColorSet;
}

const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.01em;

  font-size: ${({ $size }) => sizeMap[$size].fontSize};
  padding: ${({ $size }) => sizeMap[$size].padding};
  border-radius: ${({ $rounded }) => radius[$rounded]};

  background-color: ${({ $colorSet }) => $colorSet.bg};
  border: 1px solid ${({ $colorSet }) => $colorSet.border};
  color: ${({ $colorSet }) => $colorSet.text};
`;

// =========================
// Component
// =========================

export const Badge = ({
                          size = 'md',
                          rounded = 'sm',
                          variant = 'filled',
                          color = 'primary',
                          children = 'Badge',
                          className,
                      }: BadgeProps) => {
    const colorSet = colorMap[color][variant];

    return (
        <StyledBadge
            $size={size}
            $rounded={rounded}
            $colorSet={colorSet}
            className={className}
        >
            {children}
        </StyledBadge>
    );
};

export default Badge;