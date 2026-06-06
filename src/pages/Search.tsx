import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { TextField } from '@/components/form/textField/TextField';
import { Title } from '@/components/common/title/Title';
import { TextButton } from '@/components/common/button/TextButton';
import { Icon } from '@/components/common/icon/Icon';
import { Swiper } from '@/components/display/swiper/Swiper';
import { ProdItem } from '@/components/product/prodItem/ProdItem';
import { EmptyState } from '@/components/common/emptyState/EmptyState';
import { allProducts } from '@/data/mockProducts';
import { spacing } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';
import { body02, body04 } from '@/styles/mixins/typography';

const INITIAL_KEYWORDS = ['Jeans', 'Casual clothes', 'Hoodie', 'Nike shoes black', 'V-neck tshirt'];

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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.md};
`;

const KeywordRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${gray[100]};
  cursor: pointer;
`;

const KeywordText = styled.p`
  ${body02('regular')}
  color: ${gray[700]};
  margin: 0;
  flex: 1;
`;

const DeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  flex-shrink: 0;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${gray[100]};
  cursor: pointer;

  &:first-child { border-top: 1px solid ${gray[100]}; }
`;

const ResultThumb = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: ${gray[100]};
`;

const ResultInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultName = styled.p`
  ${body02('medium')}
  color: ${gray[900]};
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const ResultPrice = styled.span`
  ${body04('regular')}
  color: ${gray[600]};
`;

const ResultDiscount = styled.span`
  ${body04('medium')}
  color: #e53e3e;
`;

const ArrowBtn = styled.div`
  flex-shrink: 0;
  transform: rotate(-45deg);
`;

// =========================
// Component
// =========================

function Search() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [keywords, setKeywords] = useState(INITIAL_KEYWORDS);

    const filtered = query.trim()
        ? allProducts.filter(p => p.name.toLowerCase().includes(query.trim().toLowerCase()))
        : [];

    const isSearching = query.trim().length > 0;
    const hasKeywords = keywords.length > 0;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            if (!keywords.includes(query.trim())) {
                setKeywords(prev => [query.trim(), ...prev].slice(0, 10));
            }
        }
    };

    const handleKeywordClick = (kw: string) => setQuery(kw);

    const handleDeleteKeyword = (e: React.MouseEvent, kw: string) => {
        e.stopPropagation();
        setKeywords(prev => prev.filter(k => k !== kw));
    };

    return (
        <AppLayout
            headerProps={{
                variant: 'back',
                title: 'Search',
                onBack: () => navigate(-1),
                actions: [{ icon: 'bag', onClick: () => navigate('/products') }],
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
                activeNav: 'search',
                onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
            }}
        >
            {/* 검색 입력 */}
            <Section variant="default" spacing="md">
                <TextField
                    type="search"
                    placeholder="Search for clothes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Section>

            {/* 입력 중 */}
            {isSearching && (
                <Section variant="default" spacing="md">
                    {filtered.length === 0 ? (
                        <EmptyState
                            type="empty"
                            icon="search"
                            title="No Results Found!"
                            description="Try a similar word or something more general."
                        />
                    ) : (
                        <div>
                            {filtered.map(p => (
                                <ResultRow key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
                                    <ResultThumb>
                                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </ResultThumb>
                                    <ResultInfo>
                                        <ResultName>{p.name}</ResultName>
                                        <ResultPriceRow>
                                            <ResultPrice>₩{p.price.toLocaleString()}</ResultPrice>
                                            {p.originalPrice && (
                                                <ResultDiscount>
                                                    -{Math.round((1 - p.price / p.originalPrice) * 100)}%
                                                </ResultDiscount>
                                            )}
                                        </ResultPriceRow>
                                    </ResultInfo>
                                    <ArrowBtn>
                                        <Icon name="arrow" size="sm" color={gray[400]} />
                                    </ArrowBtn>
                                </ResultRow>
                            ))}
                        </div>
                    )}
                </Section>
            )}

            {/* 기본 화면 */}
            {!isSearching && (
                <>
                    {hasKeywords && (
                        <Section variant="default" spacing="md">
                            <HeaderRow>
                                <Title variant="title03" weight="bold" as="p">Recent Searches</Title>
                                <TextButton color="gray-dark" size="md" underline onClick={() => setKeywords([])}>
                                    Clear all
                                </TextButton>
                            </HeaderRow>
                            <div>
                                {keywords.map(kw => (
                                    <KeywordRow key={kw} onClick={() => handleKeywordClick(kw)}>
                                        <KeywordText>{kw}</KeywordText>
                                        <DeleteBtn type="button" onClick={(e) => handleDeleteKeyword(e, kw)}>
                                            <Icon name="cancel_circle" size="sm" color={gray[400]} />
                                        </DeleteBtn>
                                    </KeywordRow>
                                ))}
                            </div>
                        </Section>
                    )}
                    {!hasKeywords && (
                        <Section variant="default" spacing="md">
                            <HeaderRow>
                                <Title variant="title03" weight="bold" as="p">Recent Searches</Title>
                            </HeaderRow>
                            <EmptyState
                                type="empty"
                                title="최근 검색어가 없어요"
                                description="검색어를 입력해보세요."
                            />
                        </Section>
                    )}

                    <Section variant={hasKeywords ? 'divider' : 'default'} spacing="md">
                        <Title variant="title03" weight="bold" as="p" mb="md">추천 상품</Title>
                        <Swiper
                            variant="basic"
                            slideWidth={160}
                            gap="sm"
                            slides={allProducts.slice(0, 8).map(p => (
                                <ProdItem
                                    key={p.id}
                                    layout="vertical"
                                    imageSrc={p.image}
                                    name={p.name}
                                    price={p.price}
                                    originalPrice={p.originalPrice}
                                    currency="KRW"
                                    onClick={() => navigate(`/products/${p.id}`)}
                                />
                            ))}
                        />
                    </Section>
                </>
            )}
        </AppLayout>
    );
}

export default Search;