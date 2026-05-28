import * as React from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';

// =========================
// Types
// =========================

export type StackDirection = 'horizontal' | 'vertical';
export type StackSpacing = keyof typeof spacing;
export type StackGapSize = 'sm' | 'md' | 'lg';

export interface StackProps {
    /** 정렬 방향 */
    direction?: StackDirection;
    /** 요소 간 여백 (spacing 토큰 키) */
    gap?: StackSpacing;
    /** 행 간 여백 — gap보다 우선 적용 (sm:8px / md:16px / lg:24px) */
    rowGap?: StackGapSize;
    /** 열 간 여백 — gap보다 우선 적용 (sm:8px / md:16px / lg:24px) */
    columnGap?: StackGapSize;
    /** grid 열 수 — 지정 시 grid layout으로 전환 */
    columns?: number;
    /** horizontal에서 넘칠 경우 줄바꿈 (columns 미지정 시) */
    wrap?: boolean;
    /** 자식 요소 */
    children?: React.ReactNode;
    className?: string;
}

// =========================
// Styled
// =========================

const gapSizeMap: Record<StackGapSize, string> = {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
};

const Container = styled.div<{
    $direction: StackDirection;
    $gap: StackSpacing;
    $rowGap?: StackGapSize;
    $columnGap?: StackGapSize;
    $columns?: number;
    $wrap: boolean;
}>`
  ${({ $columns, $direction, $gap, $rowGap, $columnGap, $wrap }) => {
    const gapValue = spacing[$gap];
    const rowGapValue = $rowGap ? gapSizeMap[$rowGap] : gapValue;
    const columnGapValue = $columnGap ? gapSizeMap[$columnGap] : gapValue;

    if ($columns) {
        return css`
        display: grid;
        grid-template-columns: repeat(${$columns}, 1fr);
        row-gap: ${rowGapValue};
        column-gap: ${columnGapValue};
      `;
    }

    return css`
      display: flex;
      flex-direction: ${$direction === 'horizontal' ? 'row' : 'column'};
      row-gap: ${rowGapValue};
      column-gap: ${columnGapValue};
      flex-wrap: ${$direction === 'horizontal' && $wrap ? 'wrap' : 'nowrap'};
    `;
}}
`;

// =========================
// Component
// =========================

export const Stack = ({
                          direction = 'vertical',
                          gap = 'md',
                          rowGap,
                          columnGap,
                          columns,
                          wrap = true,
                          children,
                          className,
                      }: StackProps) => {
    return (
        <Container
            $direction={direction}
            $gap={gap}
            $rowGap={rowGap}
            $columnGap={columnGap}
            $columns={columns}
            $wrap={wrap}
            className={className}
        >
            {children}
        </Container>
    );
};

export default Stack;