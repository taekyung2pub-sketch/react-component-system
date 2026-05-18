import * as React from 'react';
import styled from 'styled-components';
import { buttonBase } from './buttonBase';
import { radius } from '../../../styles/tokens/spacing';
import { fontWeight } from '../../../styles/tokens/typography';
import { gray, white, primary, secondary, semantic, ColorToken } from '../../../styles/tokens/color';
import { Icon } from '../icon/Icon';
import { IconName } from '../icon/iconMap';

// =========================
// Types
// =========================

export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'filled' | 'soft' | 'outline';
export type ButtonColor   = 'gray-dark' | 'gray-light' | 'primary' | 'secondary' | 'error';
export type ButtonRounded = keyof typeof radius;

export interface ButtonProps {
  /** 버튼 사이즈 (높이 기준) */
  size?: ButtonSize;
  /** 스타일 variant */
  variant?: ButtonVariant;
  /** 색상 */
  color?: ButtonColor;
  /** 모서리 둥글기 */
  rounded?: ButtonRounded;
  /** 왼쪽 아이콘 */
  leftIcon?: IconName;
  /** 오른쪽 아이콘 */
  rightIcon?: IconName;
  /** 버튼 너비 꽉 채우기 */
  fullWidth?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 텍스트 */
  children?: React.ReactNode;
  /** 추가 className */
  className?: string;
}

// =========================
// Size map
// line-height 기준으로 아이콘 사이즈 맞춤
// body03(14px) line-height: 22px → sm/md iconSize: 16px(sm)
// body02(16px) line-height: 26px → lg iconSize: 20px(md)
// =========================

const sizeMap: Record<ButtonSize, {
  height: string;
  padding: string;
  fontSize: string;
  iconSize: 'sm' | 'md';
}> = {
  sm: { height: '32px', padding: '0 12px', fontSize: '13px', iconSize: 'sm' },
  md: { height: '40px', padding: '0 16px', fontSize: '14px', iconSize: 'sm' },
  lg: { height: '48px', padding: '0 20px', fontSize: '16px', iconSize: 'md' },
};

// =========================
// Color map
// =========================

type ColorSet = {
  bg: string;
  border: string;
  text: ColorToken;
  hoverBg: string;
  hoverBorder: string;
};

const colorMap: Record<ButtonColor, Record<ButtonVariant, ColorSet>> = {
  'gray-dark': {
    filled:  { bg: gray[700],     border: gray[700],     text: white,          hoverBg: gray[800],    hoverBorder: gray[800] },
    soft:    { bg: gray[100],     border: gray[100],     text: gray[700],      hoverBg: gray[200],    hoverBorder: gray[200] },
    outline: { bg: 'transparent', border: gray[700],     text: gray[700],      hoverBg: gray[100],    hoverBorder: gray[700] },
  },
  'gray-light': {
    filled:  { bg: gray[400],     border: gray[400],     text: white,          hoverBg: gray[500],    hoverBorder: gray[500] },
    soft:    { bg: gray[100],     border: gray[100],     text: gray[500],      hoverBg: gray[200],    hoverBorder: gray[200] },
    outline: { bg: 'transparent', border: gray[300],     text: gray[500],      hoverBg: gray[100],    hoverBorder: gray[300] },
  },
  primary: {
    filled:  { bg: primary[2],    border: primary[2],    text: white,          hoverBg: primary[3],   hoverBorder: primary[3] },
    soft:    { bg: '#eef1f4',     border: '#eef1f4',     text: primary[2],     hoverBg: '#dde4eb',    hoverBorder: '#dde4eb' },
    outline: { bg: 'transparent', border: primary[2],    text: primary[2],     hoverBg: '#eef1f4',    hoverBorder: primary[2] },
  },
  secondary: {
    filled:  { bg: secondary[2],  border: secondary[2],  text: white,          hoverBg: secondary[3], hoverBorder: secondary[3] },
    soft:    { bg: '#f5ede6',     border: '#f5ede6',     text: secondary[2],   hoverBg: '#ecddd1',    hoverBorder: '#ecddd1' },
    outline: { bg: 'transparent', border: secondary[2],  text: secondary[2],   hoverBg: '#f5ede6',    hoverBorder: secondary[2] },
  },
  error: {
    filled:  { bg: semantic.error, border: semantic.error, text: white,         hoverBg: '#b05f5f',    hoverBorder: '#b05f5f' },
    soft:    { bg: '#faeaea',      border: '#faeaea',      text: semantic.error, hoverBg: '#f5d5d5',   hoverBorder: '#f5d5d5' },
    outline: { bg: 'transparent',  border: semantic.error, text: semantic.error, hoverBg: '#faeaea',   hoverBorder: semantic.error },
  },
};

// =========================
// Styled component
// =========================

interface StyledButtonProps {
  $size: ButtonSize;
  $colorSet: ColorSet;
  $rounded: ButtonRounded;
  $fullWidth: boolean;
  $iconOnly: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${buttonBase}

  height: ${({ $size }) => sizeMap[$size].height};
  padding: ${({ $size, $iconOnly }) => $iconOnly ? '0' : sizeMap[$size].padding};
  width: ${({ $fullWidth, $size, $iconOnly }) =>
    $fullWidth ? '100%' : $iconOnly ? sizeMap[$size].height : 'auto'};
  font-size: ${({ $size }) => sizeMap[$size].fontSize};
  font-weight: ${fontWeight.semibold};
  border-radius: ${({ $rounded }) => radius[$rounded]};

  background-color: ${({ $colorSet }) => $colorSet.bg};
  border-color: ${({ $colorSet }) => $colorSet.border};
  color: ${({ $colorSet }) => $colorSet.text};

  &:hover:not(:disabled) {
    background-color: ${({ $colorSet }) => $colorSet.hoverBg};
    border-color: ${({ $colorSet }) => $colorSet.hoverBorder};
  }
`;

// =========================
// Component
// =========================

export const Button = ({
                         size = 'md',
                         variant = 'filled',
                         color = 'primary',
                         rounded = 'md',
                         leftIcon,
                         rightIcon,
                         fullWidth = false,
                         disabled = false,
                         onClick,
                         children,
                         className,
                       }: ButtonProps) => {
  const colorSet = colorMap[color][variant];
  const { iconSize } = sizeMap[size];
  const iconOnly = !children && (!!leftIcon || !!rightIcon);

  return (
      <StyledButton
          $size={size}
          $colorSet={colorSet}
          $rounded={rounded}
          $fullWidth={fullWidth}
          $iconOnly={iconOnly}
          disabled={disabled}
          onClick={onClick}
          className={className}
      >
        {leftIcon  && <Icon name={leftIcon}  size={iconSize} color={colorSet.text} />}
        {children}
        {rightIcon && <Icon name={rightIcon} size={iconSize} color={colorSet.text} />}
      </StyledButton>
  );
};

export default Button;