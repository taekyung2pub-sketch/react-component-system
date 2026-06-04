import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';

// =========================
// Types
// =========================

export type SectionVariant = 'default' | 'line' | 'divider';
export type SectionSpacing = 'md' | 'lg';

export interface SectionProps {
    /** default — 여백만 / line — 상단 border / divider — 전체 너비 회색 구분선 */
    variant?: SectionVariant;
    /** 상하 여백 (md — 16px / lg — 24px) */
    spacing?: SectionSpacing;
    /** 좌우 padding 제거 */
    noPadX?: boolean;
    /** 상하 padding 제거 */
    noPadY?: boolean;
    /** 콘텐츠 */
    children?: React.ReactNode;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components
// =========================

const spacingMap: Record<SectionSpacing, string> = {
    md: spacing.md,
    lg: spacing.lg,
};

const Base = styled.div<{ $spacing: SectionSpacing; $noPadX: boolean; $noPadY: boolean }>`
  padding: ${({ $spacing, $noPadY }) => $noPadY ? '0' : spacingMap[$spacing]} ${({ $noPadX }) => $noPadX ? '0' : spacing.md};
`;

const LineSection = styled(Base)`
  border-top: 1px solid ${gray[200]};
`;

const DividerSection = styled(Base)`
  border-top: ${spacing.sm} solid ${gray[100]};
`;

// =========================
// Component
// =========================

export const Section = ({
                            variant = 'default',
                            spacing: spacingProp = 'md',
                            noPadX = false,
                            noPadY = false,
                            children,
                            className,
                        }: SectionProps) => {
    if (variant === 'line') return (
        <LineSection $spacing={spacingProp} $noPadX={noPadX} $noPadY={noPadY} className={className}>
            {children}
        </LineSection>
    );
    if (variant === 'divider') return (
        <DividerSection $spacing={spacingProp} $noPadX={noPadX} $noPadY={noPadY} className={className}>
            {children}
        </DividerSection>
    );
    return (
        <Base $spacing={spacingProp} $noPadX={noPadX} $noPadY={noPadY} className={className}>
            {children}
        </Base>
    );
};

export default Section;