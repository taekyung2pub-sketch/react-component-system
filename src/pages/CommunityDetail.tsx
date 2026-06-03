import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { Ratio } from '@/components/display/ratio/Ratio';
import { Title } from '@/components/common/title/Title';
import { Icon } from '@/components/common/icon/Icon';
import { Button } from '@/components/common/button/Button';
import { Textarea } from '@/components/form/textArea/Textarea';
import { EmptyState } from '@/components/common/emptyState/EmptyState';
import { getPostById } from '@/data/mockPosts';
import { spacing, radius, transition } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';
import { body03, body04, caption01 } from '@/styles/mixins/typography';

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
  width: fit-content;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const Avatar = styled.img<{ $size?: number }>`
  width: ${({ $size }) => $size ?? 28}px;
  height: ${({ $size }) => $size ?? 28}px;
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

const Divider = styled.div`
  height: 1px;
  background: ${gray[100]};
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
`;

const ActionBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ $active }) => $active ? '#c46b6b' : gray[500]};
  transition: color ${transition.fast};
`;

const ActionCount = styled.span`
  ${body04('medium')}
  color: inherit;
`;

const ContentText = styled.p`
  ${body03('regular')}
  color: ${gray[700]};
  line-height: 1.85;
  margin: 0;
  white-space: pre-line;
`;

// 댓글
const CommentItem = styled.div`
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${gray[50]};

  &:last-of-type { border-bottom: none; }
`;

const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xs};
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const CommentAuthor = styled.span`
  ${body04('medium')}
  color: ${gray[900]};
`;

const CommentText = styled.p`
  ${body04('regular')}
  color: ${gray[700]};
  margin: 0;
  line-height: 1.6;
`;

const CommentLikeBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  ${caption01('regular')}
  color: ${({ $active }) => $active ? '#c46b6b' : gray[400]};
  transition: color ${transition.fast};
  flex-shrink: 0;
`;

// 댓글 입력
const CommentInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${gray[50]};
  border-radius: ${radius.lg};
`;

const CommentInputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${spacing.sm};
`;

// =========================
// Component
// =========================

function CommunityDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const post = getPostById(Number(id));

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post?.likes ?? 0);
    const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({});
    const [comments, setComments] = useState(post?.comments ?? []);
    const [commentInput, setCommentInput] = useState('');

    if (!post) {
        return (
            <AppLayout
                headerProps={{
                    variant: 'back',
                    title: '커뮤니티',
                    onBack: () => navigate('/community'),
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
                <EmptyState type="empty" title="게시글을 찾을 수 없어요" description="존재하지 않거나 삭제된 게시글입니다." />
            </AppLayout>
        );
    }

    const handleLike = () => {
        setLiked(v => !v);
        setLikeCount(c => liked ? c - 1 : c + 1);
    };

    const handleCommentLike = (commentId: number) => {
        setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    const handleSubmitComment = () => {
        if (!commentInput.trim()) return;
        setComments(prev => [...prev, {
            id: Date.now(),
            author: '나',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            text: commentInput.trim(),
            date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
            likes: 0,
        }]);
        setCommentInput('');
    };

    return (
        <AppLayout
            headerProps={{
                variant: 'back',
                title: post.title,
                onBack: () => navigate('/community'),
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
            {/* 커버 이미지 */}
            <Ratio ratio="16/9">
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Ratio>

            {/* 본문 */}
            <Section variant="default" spacing="md">
                <Stack direction="vertical" gap="md">
                    <Tag>{post.category}</Tag>
                    <Title variant="title02" weight="bold" as="h1">{post.title}</Title>
                    <AuthorRow>
                        <Avatar src={post.avatar} alt={post.author} $size={36} />
                        <div>
                            <AuthorName style={{ display: 'block' }}>{post.author}</AuthorName>
                            <DateText>{post.date}</DateText>
                        </div>
                    </AuthorRow>
                    <Divider />
                    <ContentText>{post.content}</ContentText>
                    <Divider />
                    <ActionRow>
                        <ActionBtn type="button" $active={liked} onClick={handleLike}>
                            <Icon name="heart" size="md" color={liked ? '#c46b6b' : gray[400]} />
                            <ActionCount>{likeCount}</ActionCount>
                        </ActionBtn>
                        <ActionBtn type="button">
                            <Icon name="chat" size="md" color={gray[400]} />
                            <ActionCount style={{ color: gray[500] }}>{comments.length}개 댓글</ActionCount>
                        </ActionBtn>
                    </ActionRow>
                </Stack>
            </Section>

            {/* 댓글 섹션 */}
            <Section variant="divider" spacing="md">
                <Title variant="title03" weight="semibold" as="p" mb="md">
                    댓글 {comments.length}
                </Title>

                {comments.map(comment => (
                    <CommentItem key={comment.id}>
                        <Avatar src={comment.avatar} alt={comment.author} $size={36} />
                        <CommentBody>
                            <CommentHeader>
                                <CommentMeta>
                                    <CommentAuthor>{comment.author}</CommentAuthor>
                                    <DateText>{comment.date}</DateText>
                                </CommentMeta>
                                <CommentLikeBtn
                                    type="button"
                                    $active={commentLikes[comment.id]}
                                    onClick={() => handleCommentLike(comment.id)}
                                >
                                    <Icon name="heart" size="sm" color={commentLikes[comment.id] ? '#c46b6b' : gray[300]} />
                                    {comment.likes + (commentLikes[comment.id] ? 1 : 0)}
                                </CommentLikeBtn>
                            </CommentHeader>
                            <CommentText>{comment.text}</CommentText>
                        </CommentBody>
                    </CommentItem>
                ))}

                {/* 댓글 입력 */}
                <CommentInputWrap style={{ marginTop: spacing.md }}>
                    <Textarea
                        placeholder="댓글을 남겨보세요... (최대 100자)"
                        maxLength={100}
                    />
                    <CommentInputRow style={{ justifyContent: 'flex-end' }}>
                        <Button
                            size="sm"
                            color="gray-dark"
                            onClick={handleSubmitComment}
                        >
                            댓글 달기
                        </Button>
                    </CommentInputRow>
                </CommentInputWrap>
            </Section>
        </AppLayout>
    );
}

export default CommunityDetail;