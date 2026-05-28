import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing.ts';
import { ProdItem } from '@/components/product/prodItem/ProdItem.tsx';
import { PriceCurrency } from '@/components/product/price/Price.tsx';
import { Skeleton } from '@/components/overlay/skeleton/Skeleton.tsx';

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

export interface ProductListProps {
    /** 로딩 상태 */
    isLoading?: boolean;
    /** 상품 목록 */
    products?: ProductItem[];
    /** 스켈레톤 개수 (isLoading 시 표시할 placeholder 수) */
    skeletonCount?: number;
}

// =========================
// Styled Components
// =========================

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md};
  width: 100%;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

// =========================
// Component
// =========================

export const ProductList = ({
                                isLoading = false,
                                products = [],
                                skeletonCount = 4,
                            }: ProductListProps) => {
    if (isLoading) {
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

    return (
        <Grid>
            {products.map((product) => (
                <ProdItem
                    key={product.id}
                    layout="vertical"
                    imageSrc={product.imageUrl}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    currency={product.currency ?? 'KRW'}
                />
            ))}
        </Grid>
    );
};

export default ProductList;