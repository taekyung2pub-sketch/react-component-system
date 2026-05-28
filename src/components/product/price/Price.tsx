import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { gray, black, semantic } from '@/styles/tokens/color';
import {
    title03,
    body02,
    body03,
    body04,
    caption01,
} from '@/styles/mixins/typography';

// =========================
// Types
// =========================

export type PriceSize     = 'sm' | 'md' | 'lg';
export type PriceVariant  = 'default' | 'discount';
export type PriceCurrency = 'USD' | 'KRW';

export interface PriceProps {
    /** 사이즈 */
    size?: PriceSize;
    /** 기본형 / 할인형 */
    variant?: PriceVariant;
    /** 현재 가격 */
    price: number;
    /** 원가 (discount variant에서 사용) */
    originalPrice?: number;
    /** 할인율 (미전달 시 price / originalPrice로 자동 계산) */
    discountRate?: number;
    /** 통화 */
    currency?: PriceCurrency;
    /** 추가 className */
    className?: string;
}

// =========================
// Currency config
// =========================

const currencyConfig: Record<PriceCurrency, {
    locale: string;
    symbol: string;
    position: 'before' | 'after';
}> = {
    USD: { locale: 'en-US', symbol: '$',  position: 'before' },
    KRW: { locale: 'ko-KR', symbol: '원', position: 'after'  },
};

const formatPrice = (value: number, currency: PriceCurrency) => {
    const { locale, symbol, position } = currencyConfig[currency];
    const formatted = value.toLocaleString(locale);
    return position === 'before' ? `${symbol}${formatted}` : `${formatted}${symbol}`;
};

const calcDiscountRate = (price: number, original: number) =>
    Math.round(((original - price) / original) * 100);

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const TopRow = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;

const DiscountRate = styled.span<{ $size: PriceSize }>`
  ${({ $size }) => {
    if ($size === 'lg') return body03('medium');
    if ($size === 'md') return body04('medium');
    return caption01('medium');
  }}
  color: ${semantic.error};
  white-space: nowrap;
`;

const CurrentPrice = styled.span<{ $size: PriceSize }>`
  ${({ $size }) => {
    if ($size === 'lg') return title03('bold');
    if ($size === 'md') return body02('bold');
    return body03('bold');
  }}
  color: ${black};
  white-space: nowrap;
`;

const OriginalPrice = styled.span<{ $size: PriceSize }>`
  ${({ $size }) => {
    if ($size === 'lg') return body03('regular');
    if ($size === 'md') return body04('regular');
    return caption01('regular');
  }}
  color: ${gray[400]};
  text-decoration: line-through;
  white-space: nowrap;
`;

// =========================
// Component
// =========================

export const Price = ({
                          size = 'md',
                          variant = 'default',
                          price,
                          originalPrice,
                          discountRate,
                          currency = 'USD',
                          className,
                      }: PriceProps) => {
    const rate = discountRate ?? (originalPrice ? calcDiscountRate(price, originalPrice) : 0);

    if (variant === 'discount' && originalPrice) {
        return (
            <Wrapper className={className}>
                <TopRow>
                    <DiscountRate $size={size}>{rate}%</DiscountRate>
                    <CurrentPrice $size={size}>{formatPrice(price, currency)}</CurrentPrice>
                </TopRow>
                <OriginalPrice $size={size}>{formatPrice(originalPrice, currency)}</OriginalPrice>
            </Wrapper>
        );
    }

    return (
        <Wrapper className={className}>
            <CurrentPrice $size={size}>{formatPrice(price, currency)}</CurrentPrice>
        </Wrapper>
    );
};

export default Price;