import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { Swiper } from '@/components/display/swiper/Swiper';
import { Ratio } from '@/components/display/ratio/Ratio';
import { Title } from '@/components/common/title/Title';
import { Badge } from '@/components/common/badge/Badge';
import { Price } from '@/components/product/price/Price';
import { Table } from '@/components/display/table/Table';
import { Accordion } from '@/components/display/accordion/Accordion';
import { EmptyState } from '@/components/common/emptyState/EmptyState';
import { Icon } from '@/components/common/icon/Icon';
import { PopAddCart } from '@/pages/popup/PopAddCart';
import type { CartItem } from '@/pages/popup/PopAddCart';
import { getProductById } from '@/data/mockProducts';
import { spacing, transition, radius } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';
import { body03 } from '@/styles/mixins/typography';

// =========================
// Styled
// =========================

const ImageSlide = styled.div`
  width: 100%;
  height: 100%;
`;

const ProductInfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
`;

const ProductInfoLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};

  .badge--inline {
    align-self: flex-start;
  }
`;

const WishBtn = styled.button<{ $wished: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: ${spacing.lg};
  border: 1px solid ${gray[300]};
  border-radius: ${radius.md};
  background: none;
  cursor: pointer;
  flex-shrink: 0;
  color: ${({ $wished }) => $wished ? '#c46b6b' : gray[400]};
  transition: color ${transition.fast}, transform ${transition.fast};

  &:active { transform: scale(0.88); }
`;

const Desc = styled.p`
  ${body03('regular')}
  color: ${gray[500]};
  line-height: 1.7;
  margin: 0;
`;

const NAV_ROUTES: Record<string, string> = {
    home:      '/',
    search:    '/search',
    shop:      '/products',
    community: '/community',
    my:        '/mypage',
};

// =========================
// Component
// =========================

function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const product = getProductById(Number(id));
    const [wished, setWished] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const handleConfirm = (items: CartItem[]) => {
        setCartOpen(false);
        alert(`장바구니에 ${items.reduce((sum, i) => sum + i.quantity, 0)}개 담겼어요.`);
    };

    if (!product) {
        return (
            <AppLayout
                headerProps={{
                    variant: 'back',
                    title: '상품 상세',
                    onBack: () => navigate(-1),
                }}
                dockerProps={{
                    variant: 'nav',
                    navItems: [
                        { icon: 'home',   label: '홈',      value: 'home' },
                        { icon: 'search', label: '검색',    value: 'search' },
                        { icon: 'bag',    label: '쇼핑',    value: 'shop' },
                        { icon: 'chat',   label: '커뮤니티', value: 'community' },
                        { icon: 'user',   label: '마이',    value: 'my' },
                    ],
                    activeNav: 'shop',
                    onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
                }}
            >
                <EmptyState
                    type="empty"
                    title="상품을 찾을 수 없어요"
                    description="존재하지 않거나 삭제된 상품입니다."
                />
            </AppLayout>
        );
    }

    return (
        <AppLayout
            headerProps={{
                variant: 'back',
                title: product.name,
                onBack: () => navigate(-1),
                actions: [{ icon: 'search', onClick: () => navigate('/search') }],
            }}
            dockerProps={{
                variant: 'product',
                price: product.price,
                originalPrice: product.originalPrice,
                currency: 'KRW',
                onAddToCart: () => setCartOpen(true),
            }}
        >
            {/* 상품 이미지 스와이퍼 */}
            <Swiper
                variant="dot"
                slides={product.images.map((src, i) => (
                    <ImageSlide key={i}>
                        <Ratio ratio="1/1">
                            <img src={src} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Ratio>
                    </ImageSlide>
                ))}
            />

            {/* 상품 정보 + 우측 wish 토글 */}
            <Section variant="default" spacing="md">
                <ProductInfoRow>
                    <ProductInfoLeft>
                        <Badge variant="soft" color="primary" size="sm" className="badge--inline">{product.category}</Badge>
                        <Title variant="title02" weight="bold" as="h1">{product.name}</Title>
                        <Price
                            size="lg"
                            variant={product.originalPrice ? 'discount' : 'default'}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            currency="KRW"
                        />
                        <Desc>{product.description}</Desc>
                    </ProductInfoLeft>

                    <WishBtn
                        type="button"
                        $wished={wished}
                        onClick={() => setWished(v => !v)}
                        aria-label={wished ? '찜 해제' : '찜하기'}
                    >
                        <Icon name="heart" size="lg" color={wished ? '#c46b6b' : gray[400]} />
                    </WishBtn>
                </ProductInfoRow>
            </Section>

            {/* 상품 정보 테이블 */}
            <Section variant="divider" spacing="md">
                <Title variant="title03" weight="semibold" as="p" mb="md">상품 정보</Title>
                <Table rows={product.tableRows.map(r => ({ label: r.label, value: r.value }))} />
            </Section>

            {/* 아코디언 */}
            <Section variant="default" spacing="md">
                <Accordion
                    single={false}
                    items={product.accordionItems.map((a, i) => ({
                        id: String(i),
                        title: a.title,
                        content: a.content,
                    }))}
                />
            </Section>

            {/* 장바구니 팝업 */}
            {cartOpen && (
                <PopAddCart
                    product={product}
                    onClose={() => setCartOpen(false)}
                    onConfirm={handleConfirm}
                />
            )}

        </AppLayout>
    );
}

export default ProductDetail;