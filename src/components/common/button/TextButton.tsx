import * as React from 'react';
import styled from 'styled-components';
import { buttonBase } from './buttonBase';
import { fontWeight } from '../../../styles/tokens/typography';
import { gray, primary, secondary, semantic, ColorToken } from '../../../styles/tokens/color';
import { Icon } from '../icon/Icon';
import { IconName } from '../icon/iconMap';

// =========================
// Types
// =========================

export type TextButtonSize  = 'sm' | 'md' | 'lg';
export type TextButtonColor = 'gray-dark' | 'gray-light' | 'primary' | 'secondary' | 'error';

export interface TextButtonProps {
  /** 텍스트 버튼 사이즈 */
  size?: TextButtonSize;
  /** 색상 */
  color?: TextButtonColor;
  /** 밑줄 여부 */
  underline?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: IconName;
  /** 오른쪽 아이콘 */
  rightIcon?: IconName;
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
// 아이콘 사이즈 = 각 fontSize의 line-height 근사값
// sm: caption01(12px) line-height 18px → xs(12px)
// md: body03(14px)    line-height 22px → sm(16px)
// lg: body02(16px)    line-height 26px → sm(16px)
// =========================

const sizeMap: Record<TextButtonSize, {
  fontSize: string;
  iconSize: 'xs' | 'sm';
}> = {
  sm: { fontSize: '12px', iconSize: 'xs' },
  md: { fontSize: '14px', iconSize: 'sm' },
  lg: { fontSize: '16px', iconSize: 'sm' },
};

// =========================
// Color map
// =========================

type TextColorSet = { text: ColorToken; hoverText: ColorToken };

const colorMap: Record<TextButtonColor, TextColorSet> = {
  'gray-dark':  { text: gray[700],      hoverText: gray[900] },
  'gray-light': { text: gray[400],      hoverText: gray[600] },
  primary:      { text: primary[2],     hoverText: primary[3] },
  secondary:    { text: secondary[2],   hoverText: secondary[3] },
  error:        { text: semantic.error, hoverText: '#b05f5f' as ColorToken },
};

// =========================
// Styled component
// =========================

interface StyledTextButtonProps {
  $size: TextButtonSize;
  $colorSet: TextColorSet;
  $underline: boolean;
}

const StyledTextButton = styled.button<StyledTextButtonProps>`
  ${buttonBase}

  background: none;
  border: none;
  padding: 2px 0;
  font-size: ${({ $size }) => sizeMap[$size].fontSize};
  font-weight: ${fontWeight.medium};
  color: ${({ $colorSet }) => $colorSet.text};
  text-decoration: ${({ $underline }) => $underline ? 'underline' : 'none'};
  text-underline-offset: 2px;

  &:hover:not(:disabled) {
    color: ${({ $colorSet }) => $colorSet.hoverText};
  }
`;

// =========================
// Component
// =========================

export const TextButton = ({
                             size = 'md',
                             color = 'primary',
                             underline = false,
                             leftIcon,
                             rightIcon,
                             disabled = false,
                             onClick,
                             children,
                             className,
                           }: TextButtonProps) => {
  const colorSet = colorMap[color];
  const { iconSize } = sizeMap[size];

  return (
      <StyledTextButton
          $size={size}
          $colorSet={colorSet}
          $underline={underline}
          disabled={disabled}
          onClick={onClick}
          className={className}
      >
        {leftIcon  && <Icon name={leftIcon}  size={iconSize} color={colorSet.text} />}
        {children}
        {rightIcon && <Icon name={rightIcon} size={iconSize} color={colorSet.text} />}
      </StyledTextButton>
  );
};

export default TextButton;