import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { Swiper } from '@/components/display/swiper/Swiper';
import { Ratio } from '@/components/display/ratio/Ratio';
import { Title } from '@/components/common/title/Title';
import { Button } from '@/components/common/button/Button';
import { Icon } from '@/components/common/icon/Icon';
import { allPosts, mdsPicks } from '@/data/mockPosts';
import { spacing, radius } from '@/styles/tokens/spacing';
import { gray, white } from '@/styles/tokens/color';
import { body03, body04, caption01 } from '@/styles/mixins/typography';

const PAGE_SIZE = 4;

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

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 ${spacing.sm};
  border-radius: ${radius.full};
  background: ${gray[100]};
  ${caption01('medium')}
  color: ${gray[600]};
  align-self: flex-start;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const AuthorName = styled.span`
  ${caption01('medium')}
  color: ${gray[600]};
`;

const DateText = styled.span`
  ${caption01('regular')}
  color: ${gray[400]};
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  ${caption01('medium')}
  color: ${gray[500]};
`;

const ActionCount = styled.span`
  ${caption01('medium')}
`;

// MD's Pick 슬라이드
const MdsSlide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

const MdsOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${spacing.lg};
  gap: ${spacing.xs};
`;

const MdsTag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 ${spacing.sm};
  border-radius: ${radius.full};
  background: rgba(255,255,255,0.2);
  ${caption01('medium')}
  color: ${white};
  width: fit-content;
`;

const MdsDesc = styled.p`
  ${body04('regular')}
  color: rgba(255,255,255,0.75);
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

// 띠배너
const EventBanner = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.lg} ${spacing.md};
  background: #3d4f61;
  cursor: pointer;
  text-decoration: none;
`;

const EventLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const EventLabel = styled.span`
  ${caption01('medium')}
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const EventTitle = styled.span`
  ${body03('bold')}
  color: ${white};
`;

// 일반 카드
const PostCard = styled.div`
  cursor: pointer;
`;

const PostCardThumb = styled.div`
  border-radius: ${radius.md};
  overflow: hidden;
  margin-bottom: ${spacing.sm};
`;

const PostCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const PostTitle = styled.p`
  ${body04('semibold')}
  color: ${gray[900]};
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// =========================
// Component
// =========================

function Community() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    // MD's Pick 제외한 나머지
    const gridPosts = allPosts.slice(4);
    const paged = gridPosts.slice(0, page * PAGE_SIZE);
    const hasMore = paged.length < gridPosts.length;

    return (
        <AppLayout
            headerProps={{
                variant: 'default',
                title: 'Community',
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
                activeNav: 'community',
                onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
            }}
        >
            {/* ① MD's Pick — 풀 스와이퍼 */}
            <Section variant="default" spacing="md">
                <Title variant="title03" weight="bold" as="p">MD's Pick</Title>
            </Section>
            <Swiper
                variant="dot"
                slides={mdsPicks.map(post => (
                    <MdsSlide key={post.id} onClick={() => navigate(`/community/${post.id}`)}>
                        <Ratio ratio="4/3">
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Ratio>
                        <MdsOverlay>
                            <MdsTag>{post.category}</MdsTag>
                            <Title variant="title02" weight="bold" as="span" color={white}>
                                {post.title}
                            </Title>
                            <MdsDesc>{post.desc}</MdsDesc>
                            <AuthorRow style={{ marginTop: spacing.xs }}>
                                <Avatar src={post.avatar} alt={post.author} />
                                <AuthorName style={{ color: 'rgba(255,255,255,0.75)' }}>{post.author}</AuthorName>
                                <DateText style={{ color: 'rgba(255,255,255,0.5)' }}>· {post.date}</DateText>
                            </AuthorRow>
                        </MdsOverlay>
                    </MdsSlide>
                ))}
            />

            {/* ② 이벤트 띠배너 */}
            <Section variant="divider" noPadX>
                <EventBanner href="/event" onClick={(e) => { e.preventDefault(); }}>
                    <EventLeft>
                        <EventLabel>Limited Event</EventLabel>
                        <EventTitle>여름 시즌 특별 기획전 진행중</EventTitle>
                    </EventLeft>
                    <Icon name="arrow" size="sm" color={white} rotate={-180} />
                </EventBanner>
            </Section>

            {/* ③ 일반 매거진 — 2열 그리드 */}
            <Section variant="default" spacing="md">
                <Stack direction="vertical" gap="md">
                    <Title variant="title03" weight="bold" as="p">매거진</Title>
                    <Stack direction="horizontal" columns={2} gap="md">
                        {paged.map(post => (
                            <PostCard key={post.id} onClick={() => navigate(`/community/${post.id}`)}>
                                <PostCardThumb>
                                    <Ratio ratio="4/3">
                                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Ratio>
                                </PostCardThumb>
                                <PostCardBody>
                                    <Tag>{post.category}</Tag>
                                    <PostTitle>{post.title}</PostTitle>
                                    <ActionRow>
                                        <ActionBtn type="button">
                                            <Icon name="heart" size="sm" color={gray[400]} />
                                            <ActionCount>{post.likes}</ActionCount>
                                        </ActionBtn>
                                        <ActionBtn type="button">
                                            <Icon name="chat" size="sm" color={gray[400]} />
                                            <ActionCount>{post.comments.length}</ActionCount>
                                        </ActionBtn>
                                    </ActionRow>
                                </PostCardBody>
                            </PostCard>
                        ))}
                    </Stack>
                    {hasMore && (
                        <Button
                            size="md"
                            variant="outline"
                            color="gray-dark"
                            fullWidth
                            onClick={() => setPage(p => p + 1)}
                            style={{ marginTop: spacing.lg }}
                        >
                            더보기
                        </Button>
                    )}
                </Stack>
            </Section>
        </AppLayout>
    );
}

export default Community;