import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { spacing } from '../../../styles/tokens/spacing';
import { gray, black } from '../../../styles/tokens/color';
import { body02, body03 } from '../../../styles/mixins/typography';
import { Ratio, RatioValue, RatioRadius, RatioWidth } from '../../display/ratio/Ratio';
import { Price, PriceCurrency, PriceVariant, PriceSize } from '../price/Price';
import { Icon } from '../../common/icon/Icon';

// =========================
// Types
// =========================

export type ProdItemLayout = 'vertical' | 'horizontal';

export interface ProdItemProps {
    /** 레이아웃 */
    layout?: ProdItemLayout;
    /** 상품 이미지 src */
    imageSrc?: string;
    /** 상품명 */
    name: string;
    /** 현재 가격 */
    price: number;
    /** 원가 (할인형) */
    originalPrice?: number;
    /** 통화 */
    currency?: PriceCurrency;
    /** 찜 버튼 비활성화 */
    wishDisabled?: boolean;
    /** 상품 클릭 */
    onClick?: () => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Layout config
// =========================

const layoutConfig: Record<ProdItemLayout, {
    ratioValue: RatioValue;
    ratioWidth: RatioWidth;
    ratioRounded: RatioRadius;
    priceSize: PriceSize;
}> = {
    vertical: {
        ratioValue: '3/4',
        ratioWidth: 'full',
        ratioRounded: 'lg',
        priceSize: 'sm',
    },
    horizontal: {
        ratioValue: '1/1',
        ratioWidth: 'md',
        ratioRounded: 'lg',
        priceSize: 'sm',
    },
};

// =========================
// Styled components
// =========================

const Wrapper = styled.div<{ $layout: ProdItemLayout }>`
  display: flex;
  flex-direction: ${({ $layout }) => $layout === 'vertical' ? 'column' : 'row'};
  gap: ${spacing.sm};
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const WishButton = styled.button<{ $disabled: boolean }>`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0;

  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};
`;

const Info = styled.div<{ $layout: ProdItemLayout }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: ${({ $layout }) => $layout === 'horizontal' ? 1 : 'unset'};
  justify-content: ${({ $layout }) => $layout === 'horizontal' ? 'center' : 'flex-start'};
`;

const ProductName = styled.span<{ $layout: ProdItemLayout }>`
  ${({ $layout }) => $layout === 'horizontal' ? body02('medium') : body03('medium')}
  color: ${black};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// =========================
// Component
// =========================

export const ProdItem = ({
                             layout = 'vertical',
                             imageSrc,
                             name,
                             price,
                             originalPrice,
                             currency = 'USD',
                             wishDisabled = false,
                             onClick,
                             className,
                         }: ProdItemProps) => {
    const config = layoutConfig[layout];
    const priceVariant: PriceVariant = originalPrice ? 'discount' : 'default';
    const [wished, setWished] = useState(false);

    return (
        <Wrapper $layout={layout} className={className} onClick={onClick}>
            <ImageWrapper>
                <Ratio
                    ratio={config.ratioValue}
                    width={config.ratioWidth}
                    rounded={config.ratioRounded}
                >
                    {imageSrc
                        ? <img src={imageSrc} alt={name} />
                        : <div style={{ width: '100%', height: '100%', backgroundColor: gray[100] }} />
                    }
                </Ratio>

                <WishButton
                    type="button"
                    $disabled={wishDisabled}
                    disabled={wishDisabled}
                    onClick={(e) => {
                        e.stopPropagation();
                        setWished((prev) => !prev);
                    }}
                >
                    <Icon
                        name="heart"
                        size="sm"
                        color={wished ? '#EF4444' : gray[400]}
                    />
                </WishButton>
            </ImageWrapper>

            <Info $layout={layout}>
                <ProductName $layout={layout}>{name}</ProductName>
                <Price
                    size={config.priceSize}
                    variant={priceVariant}
                    price={price}
                    originalPrice={originalPrice}
                    currency={currency}
                />
            </Info>
        </Wrapper>
    );
};

export default ProdItem;