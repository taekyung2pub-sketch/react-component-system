import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { ProdItem } from '@/components/product/prodItem/ProdItem';
import type { PriceCurrency } from '@/components/product/price/Price';
import { Skeleton } from '@/components/overlay/skeleton/Skeleton';

// =========================
// Types
// =========================

export interface ProductItem {
    id: number;
    imageUrl?: string;
    name: string;
    price: number;
    originalPrice?: number;
    currency?: PriceCurrency;
}

export type ProductListLayout = 'vertical' | 'horizontal';

export interface ProductListProps {
    /** 로딩 상태 */
    isLoading?: boolean;
    /** 상품 목록 */
    products?: ProductItem[];
    /** 스켈레톤 개수 (isLoading 시 표시할 placeholder 수) */
    skeletonCount?: number;
    /** vertical — 2열 그리드 / horizontal — 1열 리스트 */
    layout?: ProductListLayout;
    /** 상품 클릭 콜백 */
    onItemClick?: (id: number) => void;
}

// =========================
// Styled
// =========================

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md};
  width: 100%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  width: 100%;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: flex-start;
`;

// =========================
// Component
// =========================

export const ProductList = ({
                                isLoading = false,
                                products = [],
                                skeletonCount = 4,
                                layout = 'vertical',
                                onItemClick,
                            }: ProductListProps) => {

    if (isLoading) {
        if (layout === 'horizontal') {
            return (
                <List>
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                        <SkeletonRow key={i}>
                            <Skeleton $variant="rect" $width="100px" $height="100px" />
                            <SkeletonCard style={{ flex: 1 }}>
                                <Skeleton $width="80%" $height="14px" />
                                <Skeleton $width="50%" $height="14px" />
                                <Skeleton $width="40%" $height="16px" />
                            </SkeletonCard>
                        </SkeletonRow>
                    ))}
                </List>
            );
        }

        return (
            <Grid>
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <SkeletonCard key={i}>
                        <Skeleton $variant="rect" $height="200px" />
                        <Skeleton $width="90%" $height="14px" />
                        <Skeleton $width="60%" $height="14px" />
                        <Skeleton $width="45%" $height="16px" />
                    </SkeletonCard>
                ))}
            </Grid>
        );
    }

    const Wrapper = layout === 'horizontal' ? List : Grid;

    return (
        <Wrapper>
            {products.map((product) => (
                <ProdItem
                    key={product.id}
                    layout={layout}
                    imageSrc={product.imageUrl}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    currency={product.currency ?? 'KRW'}
                    onClick={onItemClick ? () => onItemClick(product.id) : undefined}
                />
            ))}
        </Wrapper>
    );
};

export default ProductList;