import * as React from 'react';
import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { Tab } from '@/components/display/tab/Tab';
import { Select } from '@/components/form/select/Select';
import { Button } from '@/components/common/button/Button';
import { ProductList } from '@/components/patterns/productList/ProductList';
import { EmptyState } from '@/components/common/emptyState/EmptyState';
import { PopFilter } from '@/pages/popup/PopFilter';
import type { FilterState } from '@/pages/popup/PopFilter';
import { gray } from '@/styles/tokens/color';
import { caption01 } from '@/styles/mixins/typography';

// =========================
// Mock Data
// =========================

const categoryTabs = [
    { label: 'All',     value: 'all' },
    { label: 'Tops',    value: 'tops' },
    { label: 'Bottoms', value: 'bottoms' },
    { label: 'Outer',   value: 'outer' },
    { label: 'Acc',     value: 'acc' },
    { label: 'Shoes',   value: 'shoes' },
];

const sortOptions = [
    { label: '추천순',     value: 'recommend' },
    { label: '신상품순',   value: 'newest' },
    { label: '낮은가격순', value: 'price_asc' },
    { label: '높은가격순', value: 'price_desc' },
    { label: '리뷰많은순', value: 'review' },
];

const allProducts = [
    { id: 1,  name: 'Classic Linen Shirt',  price: 89000,  originalPrice: 120000, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',  category: 'tops' },
    { id: 2,  name: 'Slim Chino Pants',     price: 72000,                          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',  category: 'bottoms' },
    { id: 3,  name: 'Cotton Crew Tee',      price: 35000,                          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',  category: 'tops' },
    { id: 4,  name: 'Wool Blend Coat',      price: 245000, originalPrice: 320000,  image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',  category: 'outer' },
    { id: 5,  name: 'Stripe Oxford Shirt',  price: 95000,                          image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400&q=80',  category: 'tops' },
    { id: 6,  name: 'Cargo Wide Pants',     price: 88000,                          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',  category: 'bottoms' },
    { id: 7,  name: 'Ribbed Knit Vest',     price: 62000,                          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',  category: 'tops' },
    { id: 8,  name: 'Denim Jacket',         price: 135000,                         image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80',  category: 'outer' },
    { id: 9,  name: 'Summer Linen Set',     price: 55000,  originalPrice: 110000,  image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',  category: 'tops' },
    { id: 10, name: 'Basic Polo Shirt',     price: 28000,  originalPrice: 49000,   image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80',  category: 'tops' },
    { id: 11, name: 'Relaxed Jogger',       price: 42000,  originalPrice: 68000,   image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80',  category: 'bottoms' },
    { id: 12, name: 'Canvas Tote Bag',      price: 18000,  originalPrice: 35000,   image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',  category: 'acc' },
    // 5. Shoes 상품 추가
    { id: 13, name: 'White Leather Sneakers', price: 129000, originalPrice: 165000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', category: 'shoes' },
    { id: 14, name: 'Classic Derby Shoes',    price: 185000,                         image: 'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=400&q=80', category: 'shoes' },
    { id: 15, name: 'Suede Chelsea Boots',    price: 215000, originalPrice: 260000,  image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80', category: 'shoes' },
    { id: 16, name: 'Canvas Slip-On',         price: 59000,                          image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80', category: 'shoes' },
];

const PAGE_SIZE = 6;

const NAV_ROUTES: Record<string, string> = {
    home:      '/',
    search:    '/search',
    shop:      '/products',
    community: '/community',
    my:        '/mypage',
};

// =========================
// Styled
// =========================

const FilterRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const ResultCount = styled.span`
  ${caption01('regular')}
  color: ${gray[500]};
`;

// =========================
// Component
// =========================

function ProductListPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // 8. 메인에서 넘어온 카테고리 state 적용
    const initialCategory = (location.state as { category?: string })?.category ?? 'all';

    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState('recommend');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState<FilterState>({ categories: [], priceRange: 'all', sort: '' });

    // 필터링
    const filtered = useMemo(() => {
        let list = allProducts;

        // 탭 카테고리
        if (category !== 'all') list = list.filter(p => p.category === category);

        // PopFilter 카테고리 (체크박스) — 탭과 별개로 추가 필터
        if (filter.categories.length > 0) {
            list = list.filter(p => filter.categories.includes(p.category));
        }

        // 가격대
        if (filter.priceRange === 'under_50k')  list = list.filter(p => p.price < 50000);
        if (filter.priceRange === '50k_100k')   list = list.filter(p => p.price >= 50000 && p.price < 100000);
        if (filter.priceRange === 'over_100k')  list = list.filter(p => p.price >= 100000);

        return list;
    }, [category, filter]);

    // 정렬
    const sorted = useMemo(() => {
        const list = [...filtered];
        if (sort === 'price_asc')  return list.sort((a, b) => a.price - b.price);
        if (sort === 'price_desc') return list.sort((a, b) => b.price - a.price);
        return list;
    }, [filtered, sort]);

    const paged = sorted.slice(0, page * PAGE_SIZE);
    const hasMore = paged.length < sorted.length;

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setPage(p => p + 1);
            setIsLoading(false);
        }, 800);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        setPage(1);
    };

    const handleFilterApply = (f: FilterState) => {
        setFilter(f);
        setPage(1);
    };

    return (
        <>
            <AppLayout
                headerProps={{
                    variant: 'back',
                    title: 'Products',
                    // 1. 뒤로가기
                    onBack: () => navigate(-1),
                    // 3. 필터 버튼 → PopFilter 열기
                    actions: [{ icon: 'filter', onClick: () => setFilterOpen(true) }],
                }}
                dockerProps={{
                    variant: 'nav',
                    // 4. 홈과 동일한 메뉴, shop 활성화
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
                {/* 카테고리 탭 — 8. initialCategory로 초기값 */}
                <Section variant="default" spacing="md">
                    <Tab
                        variant="scroll"
                        items={categoryTabs}
                        defaultValue={initialCategory}
                        onChange={handleCategoryChange}
                    />
                </Section>

                {/* 7. 총 n개 / 정렬 — space-between + align-items: flex-end */}
                <Section variant="line" spacing="md">
                    <FilterRow>
                        <ResultCount>총 {sorted.length}개</ResultCount>
                        <Select
                            variant="text"
                            options={sortOptions}
                            value={sort}
                            onChange={setSort}
                        />
                    </FilterRow>
                </Section>

                {/* 상품 목록 */}
                <Section variant="default" spacing="md">
                    {sorted.length === 0 ? (
                        <EmptyState
                            type="search"
                            title="검색 결과가 없어요"
                            description="다른 카테고리나 필터로 시도해보세요."
                        />
                    ) : (
                        <Stack direction="vertical" gap="md">
                            {/* 6. 상품 클릭 시 ProductDetail 이동 */}
                            <ProductList
                                layout="vertical"
                                products={paged.map(p => ({
                                    id: p.id,
                                    name: p.name,
                                    price: p.price,
                                    originalPrice: p.originalPrice,
                                    imageUrl: p.image,
                                    currency: 'KRW',
                                    onClick: () => navigate(`/products/${p.id}`),
                                }))}
                            />
                            {isLoading && (
                                <ProductList
                                    layout="vertical"
                                    isLoading
                                    skeletonCount={2}
                                    products={[]}
                                />
                            )}
                            {hasMore && !isLoading && (
                                <Button
                                    size="md"
                                    variant="outline"
                                    color="gray-dark"
                                    fullWidth
                                    onClick={handleLoadMore}
                                >
                                    더보기
                                </Button>
                            )}
                        </Stack>
                    )}
                </Section>
            </AppLayout>

            {/* 3. PopFilter */}
            {filterOpen && (
                <PopFilter
                    onClose={() => setFilterOpen(false)}
                    onApply={handleFilterApply}
                    initialFilter={filter}
                />
            )}
        </>
    );
}

export default ProductListPage;