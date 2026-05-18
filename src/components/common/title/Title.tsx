import *as React from 'react';
import styled, { css } from 'styled-components';
import { FontWeightKey } from '../../../styles/tokens/typography';
import {
    title01,
    title02,
    title03,
} from '../../../styles/mixins/typography';
import { ColorToken } from '../../../styles/tokens/color';

// =========================
// Types
// =========================

export type TitleVariant = 'title01' | 'title02' | 'title03';

export type TitleAs = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export interface TitleProps {
    variant?: TitleVariant;
    weight?: FontWeightKey;
    as?: TitleAs;
    color?: ColorToken;
    ellipsis?: boolean;
    maxLines?: number;
    align?: 'left' | 'center' | 'right';
    className?: string;
    children?: React.ReactNode;
}

// =========================
// Style helpers
// =========================

const variantStyleMap: Record<TitleVariant, (weight?: FontWeightKey) => ReturnType<typeof css>> = {
    title01,
    title02,
    title03,
};

const defaultWeightMap: Record<TitleVariant, FontWeightKey> = {
    title01: 'bold',
    title02: 'bold',
    title03: 'semibold',
};

const defaultTagMap: Record<TitleVariant, TitleAs> = {
    title01: 'h1',
    title02: 'h2',
    title03: 'h3',
};

// =========================
// Styled component
// =========================

interface StyledTitleProps {
    $variant: TitleVariant;
    $weight?: FontWeightKey;
    $color?: ColorToken;
    $ellipsis?: boolean;
    $maxLines?: number;
    $align?: TitleProps['align'];
}

const StyledTitle = styled.span<StyledTitleProps>`
  display: block;
  margin: 0;
  padding: 0;

  /* variant + weight */
  ${({ $variant, $weight }) => {
    const resolvedWeight = $weight ?? defaultWeightMap[$variant];
    return variantStyleMap[$variant](resolvedWeight);
  }}

    /* 색상 */
  ${({ $color }) => $color && `color: ${$color};`}

    /* 정렬 */
  ${({ $align }) => $align && `text-align: ${$align};`}

    /* 말줄임표 */
  ${({ $ellipsis, $maxLines }) => {
    if (!$ellipsis) return '';
    const lines = $maxLines ?? 1;
    if (lines === 1) {
      return `
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `;
    }
    return `
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
    `;
  }}
`;

// =========================
// Component
// =========================

export const Title = ({
                          variant = 'title01',
                          weight,
                          as,
                          color,
                          ellipsis = false,
                          maxLines,
                          align,
                          className,
                          children,
                      }: TitleProps) => {
    const tag = as ?? defaultTagMap[variant];

    return (
        <StyledTitle
            as={tag}
            $variant={variant}
            $weight={weight}
            $color={color}
            $ellipsis={ellipsis}
            $maxLines={maxLines}
            $align={align}
            className={className}
        >
            {children}
        </StyledTitle>
    );
};

export default Title;