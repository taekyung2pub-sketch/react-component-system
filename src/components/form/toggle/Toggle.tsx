import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { transition } from '@/styles/tokens/spacing';
import { gray, white, primary, secondary } from '@/styles/tokens/color';

// =========================
// Types
// =========================

export type ToggleSize  = 'xs' | 'sm';
export type ToggleColor = 'gray' | 'primary' | 'secondary';

export interface ToggleProps {
    /** 사이즈 (xs — 24px / sm — 32px) */
    size?: ToggleSize;
    /** 색상 */
    color?: ToggleColor;
    /** 초기 on/off 여부 */
    defaultChecked?: boolean;
    /** 비활성화 */
    disabled?: boolean;
    /** 변경 핸들러 */
    onChange?: (checked: boolean) => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Size map
// 버튼 xs(24px), sm(32px) 높이 기준
// =========================

const sizeMap: Record<ToggleSize, { height: number; width: number; thumb: number }> = {
    xs: { height: 24, width: 42, thumb: 20 },
    sm: { height: 32, width: 56, thumb: 26 },
};

// =========================
// Color map
// =========================

const colorMap: Record<ToggleColor, string> = {
    gray:      gray[700],
    primary:   primary[2],
    secondary: secondary[2],
};

// =========================
// Styled components
// =========================

const Track = styled.button<{
    $size: ToggleSize;
    $color: ToggleColor;
    $checked: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  width: ${({ $size }) => sizeMap[$size].width}px;
  height: ${({ $size }) => sizeMap[$size].height}px;
  border-radius: 9999px;
  border: none;
  padding: 0;
  cursor: pointer;

  background-color: ${({ $checked, $color }) => $checked ? colorMap[$color] : gray[300]};
  transition: background-color ${transition.fast};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Thumb = styled.span<{ $size: ToggleSize; $checked: boolean }>`
  position: absolute;
  left: ${({ $checked, $size }) =>
    $checked ? `${sizeMap[$size].width - sizeMap[$size].thumb - 2}px` : '2px'};

  width: ${({ $size }) => sizeMap[$size].thumb}px;
  height: ${({ $size }) => sizeMap[$size].thumb}px;
  border-radius: 50%;
  background-color: ${white};

  transition: left ${transition.fast};
`;

// =========================
// Component
// =========================

export const Toggle = ({
                           size = 'sm',
                           color = 'primary',
                           defaultChecked = false,
                           disabled = false,
                           onChange,
                           className,
                       }: ToggleProps) => {
    const [checked, setChecked] = useState(defaultChecked);

    const handleClick = () => {
        const next = !checked;
        setChecked(next);
        onChange?.(next);
    };

    return (
        <Track
            type="button"
            role="switch"
            aria-checked={checked}
            $size={size}
            $color={color}
            $checked={checked}
            disabled={disabled}
            onClick={handleClick}
            className={className}
        >
            <Thumb $size={size} $checked={checked} />
        </Track>
    );
};

export default Toggle;