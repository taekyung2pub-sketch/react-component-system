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
import { allProducts } from '@/data/mockProducts';
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
    { label: 'Etc.',    value: 'etc' },
];

const sortOptions = [
    { label: '추천순',     value: 'recommend' },
    { label: '신상품순',   value: 'newest' },
    { label: '낮은가격순', value: 'price_asc' },
    { label: '높은가격순', value: 'price_desc' },
    { label: '리뷰많은순', value: 'review' },
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
        <AppLayout
            headerProps={{
                variant: 'back',
                title: 'Products',
                onBack: () => navigate(-1),
                actions: [{ icon: 'filter', onClick: () => setFilterOpen(true) }],
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
                        type="empty"
                        title="상품이 없어요"
                        description="해당 카테고리에 등록된 상품이 없습니다."
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
                            }))}
                            onItemClick={(id) => navigate(`/products/${id}`)}
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

            {/* 3. PopFilter — Portal 통해 PortalContainer에 렌더링 */}
            {filterOpen && (
                <PopFilter
                    onClose={() => setFilterOpen(false)}
                    onApply={handleFilterApply}
                    initialFilter={filter}
                />
            )}
        </AppLayout>
    );
}

export default ProductListPage;