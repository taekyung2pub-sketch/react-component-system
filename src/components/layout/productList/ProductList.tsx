import * as React from 'react';
import styled, { css } from 'styled-components';
import { spacing, radius } from '../../../styles/tokens/spacing';
import { Skeleton } from '../../overlay/skeleton/Skeleton';

// =========================
// Types
// =========================

export interface ProductItem {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

export interface ProductListProps {
    isLoading?: boolean;
    products?: ProductItem[];
}

const body02 = (type: 'regular' | 'medium' | 'bold' = 'medium') => css`
  font-size: 14px;
  line-height: 1.5;
  font-weight: ${type === 'medium' ? 500 : type === 'bold' ? 700 : 400};
`;

// =========================
// Styled Components
// =========================

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md};
  padding: ${spacing.md};
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background-color: #ffffff;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  position: relative;
`;

const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${radius.md};
  background-color: #f4f4f5;
  overflow: hidden;
  position: relative;
  
  transform: translateZ(0);
  mask-image: -webkit-radial-gradient(white, black);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${radius.md};
  }
`;

const TitleText = styled.div`
  color: #18181b;
  min-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  ${body02('regular')}
  position: relative;
`;

const PriceText = styled.div`
  color: #18181b;
  min-height: 21px;
  ${body02('bold')}
  position: relative;
`;

// 💡 핵심: 진짜 컨텐츠 위에 완벽히 핏하게 겹쳐서 가려줄 스켈레톤 덮개 레이어
const AbsSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: ${radius.md} !important;
`;

// =========================
// Component
// =========================

export const ProductList = ({
                                isLoading = false,
                                products = [],
                            }: ProductListProps) => {

    // 💡 가상 로딩용 임시 배열 (데이터가 아직 안 들어왔을 때 스켈레톤 개수 확보용)
    const displayProducts = products.length > 0
        ? products
        : Array.from({ length: 4 }).map((_, i) => ({ id: i, imageUrl: '', title: '', price: '' }));

    return (
        <GridContainer>
            {displayProducts.map((product) => (
                <Card key={product.id}>

                    {/* 1. 이미지 영역 */}
                    <ImageBox>
                        {product.imageUrl && <img src={product.imageUrl} alt={product.title} />}
                        {isLoading && <AbsSkeleton />} {/* 로딩 중일 때만 위에 덮개 씌움 */}
                    </ImageBox>

                    {/* 2. 타이틀 영역 */}
                    <TitleText>
                        {product.title}
                        {isLoading && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <Skeleton $width="90%" $height="14px" />
                                <Skeleton $width="60%" $height="14px" />
                            </div>
                        )}
                    </TitleText>

                    {/* 3. 가격 영역 */}
                    <PriceText>
                        {product.price}
                        {isLoading && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
                                <Skeleton $width="45%" $height="16px" />
                            </div>
                        )}
                    </PriceText>

                </Card>
            ))}
        </GridContainer>
    );
};

export default ProductList;