import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Swiper } from '@/components/display/swiper/Swiper';
import { Tab } from '@/components/display/tab/Tab';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { Ratio } from '@/components/display/ratio/Ratio';
import { ProdItem } from '@/components/product/prodItem/ProdItem';
import { Button } from '@/components/common/button/Button';
import { Title } from '@/components/common/title/Title';
import { Icon } from '@/components/common/icon/Icon';
import { Skeleton } from '@/components/overlay/skeleton/Skeleton';
import { spacing } from '@/styles/tokens/spacing';
import { gray, white } from '@/styles/tokens/color';
import { body04 } from '@/styles/mixins/typography';

// =========================
// Mock Data
// =========================

const heroBanners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', label: 'New Collection', sub: '2026 S/S',     href: '/event/new-collection' },
    { id: 2, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Summer Sale',    sub: 'Up to 50% off', href: '/event/summer-sale' },
    { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', label: 'Best Picks',    sub: "Editor's choice", href: '/event/best-picks' },
];

const categoryItems = [
    { label: 'All',     value: 'all' },
    { label: 'Tops',    value: 'tops' },
    { label: 'Bottoms', value: 'bottoms' },
    { label: 'Outer',   value: 'outer' },
    { label: 'Acc',     value: 'acc' },
    { label: 'Shoes',   value: 'shoes' },
];

const productTabItems = [
    { label: 'Best', value: 'best' },
    { label: 'New',  value: 'new' },
    { label: 'Sale', value: 'sale' },
];

const products: Record<string, { id: number; name: string; price: number; originalPrice?: number; image: string }[]> = {
    best: [
        { id: 1, name: 'Classic Linen Shirt', price: 89000,  originalPrice: 120000, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
        { id: 2, name: 'Slim Chino Pants',    price: 72000,                         image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80' },
        { id: 3, name: 'Cotton Crew Tee',     price: 35000,                         image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
        { id: 4, name: 'Wool Blend Coat',     price: 245000, originalPrice: 320000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80' },
    ],
    new: [
        { id: 5, name: 'Stripe Oxford Shirt', price: 95000,  image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400&q=80' },
        { id: 6, name: 'Cargo Wide Pants',    price: 88000,  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
        { id: 7, name: 'Ribbed Knit Vest',    price: 62000,  image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80' },
        { id: 8, name: 'Denim Jacket',        price: 135000, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80' },
    ],
    sale: [
        { id: 9,  name: 'Summer Linen Set',  price: 55000, originalPrice: 110000, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' },
        { id: 10, name: 'Basic Polo Shirt',  price: 28000, originalPrice: 49000,  image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80' },
        { id: 11, name: 'Relaxed Jogger',    price: 42000, originalPrice: 68000,  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80' },
        { id: 12, name: 'Canvas Tote Bag',   price: 18000, originalPrice: 35000,  image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80' },
    ],
};

const feedList = [
    { id: 1, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', title: '봄 코디 추천 5선',   desc: '따뜻한 봄날을 위한 스타일링 가이드' },
    { id: 2, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', title: '린넨 소재 완전 정복', desc: '여름을 시원하게 보내는 소재 이야기' },
    { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80', title: '미니멀 코디의 기본',  desc: '적게 입고 더 멋지게 보이는 법' },
    { id: 4, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', title: '아우터 레이어링 팁',  desc: '겹겹이 입는 스타일의 핵심 포인트' },
];

// 7. Docker 메뉴 구성
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

const LogoLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const HeroBanner = styled.a`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: block;
  cursor: pointer;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding:  ${spacing.xxl} ${spacing.md};
  gap: ${spacing.xs};
`;

const HeroSub = styled.span`
  ${body04('medium')}
  color: rgba(255,255,255,0.7);
`;

const PromoBanner = styled.a`
  width: 100%;
  background: #4a5b70;
  padding: ${spacing.lg} ${spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-decoration: none;
`;

const SectionHeader = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.md};
  cursor: pointer;
  text-decoration: none;
`;

const FeedCard = styled.a`
  display: block;
  cursor: pointer;
  text-decoration: none;
`;

const FeedDesc = styled.p`
  ${body04('regular')}
  color: ${gray[500]};
  margin: 0;
`;

// 4. Skeleton을 Swiper 슬라이드와 동일한 형태로
const SkeletonSlide = styled.div`
  flex-shrink: 0;
  width: 160px;
`;

const SkeletonTrack = styled.div`
  display: flex;
  gap: ${spacing.sm};
  overflow: hidden;
`;

// =========================
// Skeleton — 상품 스와이퍼 (Swiper 레이아웃과 동일)
// =========================
const ProductSwiperSkeleton = () => (
    <SkeletonTrack>
        {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonSlide key={i}>
                <Stack direction="vertical" gap="sm">
                    <Skeleton $variant="rect" $width="160px" $height="200px" />
                    <Skeleton $width="80%" $height="14px" />
                    <Skeleton $width="50%" $height="14px" />
                    <Skeleton $width="40%" $height="16px" />
                </Stack>
            </SkeletonSlide>
        ))}
    </SkeletonTrack>
);

// =========================
// Skeleton — 매거진
// =========================
const FeedSkeleton = () => (
    <Stack direction="horizontal" columns={2} gap="md">
        {Array.from({ length: 4 }).map((_, i) => (
            <Stack key={i} direction="vertical" gap="sm">
                <Skeleton $variant="rect" $height="120px" />
                <Skeleton $width="90%" $height="13px" />
                <Skeleton $width="70%" $height="12px" />
            </Stack>
        ))}
    </Stack>
);

// =========================
// Component
// =========================

function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('best');
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [isFeedLoading, setIsFeedLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setIsProductLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setIsFeedLoading(false), 1800);
        return () => clearTimeout(t);
    }, []);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setIsProductLoading(true);
        setTimeout(() => setIsProductLoading(false), 800);
    };

    // 3. 카테고리 선택 시 ProductList 페이지로 이동 + category state 전달
    const handleCategoryChange = (value: string) => {
        navigate('/products', { state: { category: value } });
    };

    const currentProducts = products[activeTab] ?? [];

    return (
        <AppLayout
            headerProps={{
                variant: 'main',
                // 1. 로고 클릭 시 메인 이동
                logo: (
                    <LogoLink onClick={() => navigate('/')}>
                        <Title variant="title03" weight="bold" as="span">SHOP</Title>
                    </LogoLink>
                ),
                actions: [
                    { icon: 'search', onClick: () => navigate('/search') },
                    { icon: 'bag',    onClick: () => navigate('/products') },
                ],
            }}
            dockerProps={{
                variant: 'nav',
                // 7. docker 메뉴 구성
                navItems: [
                    { icon: 'home',      label: '홈',      value: 'home' },
                    { icon: 'search',    label: '검색',    value: 'search' },
                    { icon: 'bag',       label: '쇼핑',    value: 'shop' },
                    { icon: 'chat',      label: '커뮤니티', value: 'community' },
                    { icon: 'user',      label: '마이',    value: 'my' },
                ],
                activeNav: 'home',
                onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
            }}
            floatingProps={{}}
        >

            {/* ① Hero Banner Swiper */}
            <Swiper
                variant="paging-control"
                autoPlay
                loop
                slides={heroBanners.map((banner) => (
                    // 2. 배너 각 아이템 링크
                    <HeroBanner key={banner.id} href={banner.href} onClick={(e) => { e.preventDefault(); navigate(banner.href); }}>
                        <Ratio ratio="3/4">
                            <img src={banner.image} alt={banner.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Ratio>
                        <HeroOverlay>
                            <HeroSub>{banner.sub}</HeroSub>
                            <Title variant="title01" weight="bold" as="span" color={white}>
                                {banner.label}
                            </Title>
                        </HeroOverlay>
                    </HeroBanner>
                ))}
            />

            {/* ② 카테고리 내비게이션 — 3. 선택 시 ProductList로 이동 */}
            <Section variant="default" spacing="md">
                <Tab
                    variant="scroll"
                    items={categoryItems}
                    defaultValue="all"
                    onChange={handleCategoryChange}
                />
            </Section>

            {/* ③ 상품 스와이퍼 */}
            <Section variant="default" spacing="md">
                <Title variant="title03" weight="bold" as="p" mb="sm">Pick for you</Title>
                <Tab
                    variant="line"
                    items={productTabItems}
                    defaultValue="best"
                    onChange={handleTabChange}
                />
                <div style={{ marginTop: spacing.md }}>
                    {/* 4. Skeleton이 Swiper와 동일한 레이아웃 */}
                    {isProductLoading ? (
                        <ProductSwiperSkeleton />
                    ) : (
                        <Swiper
                            variant="basic"
                            slideWidth={160}
                            gap="sm"
                            slides={currentProducts.map((product) => (
                                // 8. 상품 클릭 시 ProductDetail로 이동
                                <ProdItem
                                    key={product.id}
                                    layout="vertical"
                                    imageSrc={product.image}
                                    name={product.name}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    currency="KRW"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                />
                            ))}
                        />
                    )}
                </div>
            </Section>

            {/* ④ 프로모션 띠배너 — 5. 링크 기능 */}
            <PromoBanner href="/event/promo" onClick={(e) => { e.preventDefault(); navigate('/event/promo'); }}>
                <Stack direction="vertical" gap="xs">
                    <Title variant="title03" weight="semibold" as="p" color="rgba(255,255,255,0.6)">
                        Limited Offer
                    </Title>
                    <Title variant="title03" weight="bold" as="p" color={white}>
                        신규 가입 시 10% 할인
                    </Title>
                </Stack>
                <Button size="sm" variant="soft" color="gray-light" rounded="full">
                    받기
                </Button>
            </PromoBanner>

            {/* ⑤ 커뮤니티 목록 (매거진) */}
            <Section variant="divider" spacing="lg">
                {/* 6. 타이틀 영역 전체 클릭 범위 — 커뮤니티 이동 */}
                <SectionHeader href="/community" onClick={(e) => { e.preventDefault(); navigate('/community'); }}>
                    <Title variant="title03" weight="bold" as="span">매거진</Title>
                    <Icon name="chevron" size="md" color={gray[400]} />
                </SectionHeader>
                {isFeedLoading ? (
                    <FeedSkeleton />
                ) : (
                    <Stack direction="horizontal" columns={2} gap="md">
                        {feedList.map((feed) => (
                            // 6. 각 아이템 개별 링크
                            <FeedCard key={feed.id} href={`/community/${feed.id}`} onClick={(e) => { e.preventDefault(); navigate(`/community/${feed.id}`); }}>
                                <Ratio ratio="4/3" rounded="md">
                                    <img src={feed.image} alt={feed.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Ratio>
                                <Stack direction="vertical" gap="xs" style={{ marginTop: spacing.sm }}>
                                    <Title variant="title03" weight="semibold" as="p">
                                        {feed.title}
                                    </Title>
                                    <FeedDesc>{feed.desc}</FeedDesc>
                                </Stack>
                            </FeedCard>
                        ))}
                    </Stack>
                )}
            </Section>

        </AppLayout>
    );
}

export default Home;