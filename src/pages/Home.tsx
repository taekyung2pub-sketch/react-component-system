import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Swiper } from '@/components/display/swiper/Swiper';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { Tab } from '@/components/display/tab/Tab'
import { Ratio } from '@/components/display/ratio/Ratio';
import { ProdItem } from '@/components/product/prodItem/ProdItem';
import { Title } from '@/components/common/title/Title';
import { Icon } from '@/components/common/icon/Icon';
import { Skeleton } from '@/components/overlay/skeleton/Skeleton';
import { spacing } from '@/styles/tokens/spacing';
import { gray, white } from '@/styles/tokens/color';
import { body04 } from '@/styles/mixins/typography';
import { allProducts } from '@/data/mockProducts';

// =========================
// Mock Data
// =========================

const heroBanners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', label: 'New Collection', sub: '2026 S/S' },
    { id: 2, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Summer Sale',    sub: 'Up to 50% off' },
    { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', label: 'Best Picks',    sub: "Editor's choice" },
];

const categoryItems = [
    { label: 'All',     value: 'all' },
    { label: 'Tops',    value: 'tops' },
    { label: 'Bottoms', value: 'bottoms' },
    { label: 'Outer',   value: 'outer' },
    { label: 'Acc',     value: 'acc' },
    { label: 'Shoes',   value: 'shoes' },
    { label: 'Etc.',    value: 'etc' },
];

// 3. 탭 대신 섹션 3개로 분리
const productSections = [
    { label: 'Best',  value: 'best',  products: allProducts.slice(0, 4) },
    { label: 'New',   value: 'new',   products: allProducts.slice(4, 8) },
    { label: 'Sale',  value: 'sale',  products: allProducts.filter(p => p.originalPrice) },
];

// 5. feedList → mockPosts id와 일치하도록
const feedList = [
    { id: 1, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', title: '봄 코디 추천 5선',   desc: '따뜻한 봄날을 위한 스타일링 가이드' },
    { id: 2, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', title: '린넨 소재 완전 정복', desc: '여름을 시원하게 보내는 소재 이야기' },
    { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80', title: '미니멀 코디의 기본',  desc: '적게 입고 더 멋지게 보이는 법' },
    { id: 4, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', title: '아우터 레이어링 팁',  desc: '겹겹이 입는 스타일의 핵심 포인트' },
];

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
  padding: ${spacing.xxl} ${spacing.lg};
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

const FeedCard = styled.div`
  cursor: pointer;
`;

const FeedCardInfo = styled.div`
  width: 100%;
  margin-top: ${spacing.sm};
`

const FeedDesc = styled.p`
  ${body04('regular')}
  color: ${gray[500]};
  margin-top: ${spacing.xs};
`;

// Skeleton
const SkeletonSlide = styled.div`
  flex-shrink: 0;
  width: 160px;
`;

const SkeletonTrack = styled.div`
  display: flex;
  gap: ${spacing.sm};
  overflow: hidden;
`;

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
    const [isFeedLoading, setIsFeedLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setIsFeedLoading(false), 1800);
        return () => clearTimeout(t);
    }, []);

    const handleCategoryChange = (value: string) => {
        navigate('/products', { state: { category: value } });
    };

    return (
        <AppLayout
            headerProps={{
                variant: 'main',
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
                navItems: [
                    { icon: 'home',   label: '홈',      value: 'home' },
                    { icon: 'search', label: '검색',    value: 'search' },
                    { icon: 'bag',    label: '쇼핑',    value: 'shop' },
                    { icon: 'chat',   label: '커뮤니티', value: 'community' },
                    { icon: 'user',   label: '마이',    value: 'my' },
                ],
                activeNav: 'home',
                onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
            }}
            floatingProps={{}}
        >
            {/* ① Hero Banner Swiper */}
            <Swiper
                variant="dot"
                autoPlay
                loop
                slides={heroBanners.map((banner) => (
                    <HeroBanner key={banner.id} href="javascript:">
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

            {/* ② 카테고리 — 타이틀 + 칩 스크롤 */}
            <Section variant="default" spacing="md">
                <Title variant="title03" weight="bold" as="p" mb="sm">카테고리</Title>
                <Tab
                    variant="scroll"
                    items={categoryItems}
                    defaultValue="all"
                    onChange={handleCategoryChange}
                />
            </Section>

            {/* ③ 상품 섹션 3개 — 탭 없이 각 섹션으로 */}
            {productSections.map(section => (
                <Section key={section.value} variant="line" spacing="md">
                    <Title variant="title03" weight="bold" as="p" mb="md">{section.label}</Title>
                    <Swiper
                        variant="basic"
                        slideWidth={160}
                        gap="sm"
                        slides={section.products.map(product => (
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
                </Section>
            ))}

            {/* ④ 프로모션 띠배너 */}
            <PromoBanner href="javascript:">
                <Stack direction="vertical" gap="xs">
                    <Title variant="title03" weight="semibold" as="p" color="rgba(255,255,255,0.6)">
                        Limited Offer
                    </Title>
                    <Title variant="title03" weight="bold" as="p" color={white}>
                        신규 가입 시 10% 할인
                    </Title>
                </Stack>
                <Icon name="arrow" size="md" color={white} rotate={-180} />
            </PromoBanner>

            {/* ⑤ 매거진 */}
            <Section variant="divider" spacing="lg">
                <SectionHeader href="/community" onClick={(e) => { e.preventDefault(); navigate('/community'); }}>
                    <Title variant="title03" weight="bold" as="span">매거진</Title>
                    <Icon name="chevron" size="md" color={gray[400]} rotate={-90} />
                </SectionHeader>
                {isFeedLoading ? (
                    <FeedSkeleton />
                ) : (
                    <Stack direction="horizontal" columns={2} gap="lg">
                        {feedList.map((feed) => (
                            <FeedCard key={feed.id} onClick={() => navigate(`/community/${feed.id}`)}>
                                <Ratio ratio="4/3" rounded="md">
                                    <img src={feed.image} alt={feed.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Ratio>
                                <FeedCardInfo>
                                    <Title variant="title03" weight="semibold" as="p">
                                        {feed.title}
                                    </Title>
                                    <FeedDesc>{feed.desc}</FeedDesc>
                                </FeedCardInfo>
                            </FeedCard>
                        ))}
                    </Stack>
                )}
            </Section>
        </AppLayout>
    );
}

export default Home;