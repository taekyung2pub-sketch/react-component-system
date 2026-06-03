import * as React from 'react';
import styled from 'styled-components';
import { iconMap, IconName } from './IconMap';
import { ColorToken } from '@/styles/tokens/color';

// =========================
// Types
// =========================

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
    /** 아이콘 이름 */
    name: IconName;
    /** 아이콘 사이즈 */
    size?: IconSize;
    /** 아이콘 색상 — currentColor 방식 (SVG fill/stroke가 currentColor여야 적용됨) */
    color?: ColorToken;
    /** 아이콘 회전 각도 (deg) — 예: 90, -90, 180 */
    rotate?: number;
    /** 추가 className */
    className?: string;
}

// =========================
// Size map
// =========================

const sizeMap: Record<IconSize, string> = {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
};

// =========================
// Styled component
// =========================

const StyledIcon = styled.span<{ $size: IconSize; $color?: ColorToken; $rotate?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => sizeMap[$size]};
  height: ${({ $size }) => sizeMap[$size]};
  color: ${({ $color }) => $color ?? 'inherit'};
  ${({ $rotate }) => $rotate !== undefined && `transform: rotate(${$rotate}deg);`}

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

// =========================
// Component
// =========================

export const Icon = ({ name, size = 'md', color, rotate, className }: IconProps) => {
    const SvgIcon = iconMap[name];

    if (!SvgIcon) return null;

    return (
        <StyledIcon $size={size} $color={color} $rotate={rotate} className={className}>
            <SvgIcon />
        </StyledIcon>
    );
};

export default Icon;