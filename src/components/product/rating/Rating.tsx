import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { spacing } from '../../../styles/tokens/spacing';
import { gray } from '../../../styles/tokens/color';
import { body03, body04, caption01 } from '../../../styles/mixins/typography';
import { Icon } from '../../common/icon/Icon';

// =========================
// Types
// =========================

export type RatingVariant = 'input' | 'display' | 'summary';
export type RatingSize    = 'sm' | 'md' | 'lg';

export interface RatingProps {
    /** input — 클릭 입력 / display — 읽기 전용 / summary — 평점+텍스트 */
    variant?: RatingVariant;
    /** 사이즈 */
    size?: RatingSize;
    /** 현재 평점 (0 ~ 5) */
    value?: number;
    /** 총 리뷰 수 (summary variant에서 사용) */
    reviewCount?: number;
    /** 총점 (summary variant, 기본 5) */
    outOf?: number;
    /** 평점 변경 핸들러 (input variant) */
    onChange?: (value: number) => void;
    /** 텍스트 클릭 핸들러 (summary variant — 있으면 underline + pointer) */
    onPress?: () => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Constants
// =========================

const STAR_COUNT = 5;

const STAR_COLOR = {
    filled: '#FFA928',
    empty:  gray[300],
};

const iconSizeMap: Record<RatingSize, 'xs' | 'sm' | 'md' | 'lg'> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const StarsWrapper = styled.div<{ $gap: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $gap }) => $gap};
`;

const StarButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const SummaryText = styled.span<{ $size: RatingSize; $clickable: boolean }>`
  ${({ $size }) => $size === 'sm' ? caption01('medium') : body04('medium')}
  color: ${gray[600]};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  text-decoration: ${({ $clickable }) => $clickable ? 'underline' : 'none'};
  text-underline-offset: 2px;
`;

const ReviewCountText = styled.span<{ $size: RatingSize }>`
  ${({ $size }) => $size === 'sm' ? caption01('regular') : body03('regular')}
  color: ${gray[400]};
`;

// =========================
// Helpers
// =========================

const starGapMap: Record<RatingSize, string> = {
    sm: spacing.xs,
    md: spacing.xs,
    lg: spacing.sm,
};

// =========================
// Stars renderer
// =========================

const Stars = ({
                   value,
                   size,
                   onHover,
                   onClick,
                   hovered,
                   interactive,
               }: {
    value: number;
    size: RatingSize;
    onHover?: (i: number) => void;
    onClick?: (i: number) => void;
    hovered?: number;
    interactive?: boolean;
}) => {
    const displayValue = hovered || value;

    return (
        <StarsWrapper $gap={starGapMap[size]}>
            {Array.from({ length: STAR_COUNT }, (_, i) => {
                const filled = i < displayValue;
                const color = filled ? STAR_COLOR.filled : STAR_COLOR.empty;

                if (interactive) {
                    return (
                        <StarButton
                            key={i}
                            type="button"
                            onMouseEnter={() => onHover?.(i + 1)}
                            onMouseLeave={() => onHover?.(0)}
                            onClick={() => onClick?.(i + 1)}
                        >
                            <Icon name="star" size={iconSizeMap[size]} color={color} />
                        </StarButton>
                    );
                }

                return (
                    <Icon key={i} name="star" size={iconSizeMap[size]} color={color} />
                );
            })}
        </StarsWrapper>
    );
};

// =========================
// Component
// =========================

export const Rating = ({
                           variant = 'display',
                           size = 'md',
                           value = 0,
                           reviewCount,
                           outOf = 5,
                           onChange,
                           onPress,
                           className,
                       }: RatingProps) => {

    // input variant 내부 상태
    const [internalValue, setInternalValue] = useState(value);
    const [hovered, setHovered] = useState(0);

    const handleClick = (v: number) => {
        setInternalValue(v);
        onChange?.(v);
    };

    // summary variant
    if (variant === 'summary') {
        return (
            <Wrapper className={className}>
                <Icon name="star" size={iconSizeMap[size]} color={STAR_COLOR.filled} />
                <SummaryText $size={size} $clickable={!!onPress} onClick={onPress}>
                    {value}/{outOf}
                </SummaryText>
                {reviewCount !== undefined && (
                    <ReviewCountText $size={size}>({reviewCount.toLocaleString()} reviews)</ReviewCountText>
                )}
            </Wrapper>
        );
    }

    // input variant
    if (variant === 'input') {
        return (
            <Stars
                value={internalValue}
                size={size}
                hovered={hovered || undefined}
                interactive
                onHover={(v) => setHovered(v)}
                onClick={handleClick}
            />
        );
    }

    // display variant
    return (
        <Stars
            value={value}
            size={size}
        />
    );
};

export default Rating;