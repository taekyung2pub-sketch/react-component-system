import * as React from 'react';
import styled, { css } from 'styled-components';
import { spacing, radius } from '@/styles/tokens/spacing.ts';
import { Skeleton } from '@/components/overlay/skeleton/Skeleton.tsx';

// =========================
// Types
// =========================

export interface FeedItem {
    id: number;
    avatarUrl?: string;
    badgeText: string;
    content: string;
    date: string;
}

export interface FeedListProps {
    /** 로딩 상태 여부 */
    isLoading?: boolean;
    /** 피드 데이터 리스트 */
    feeds?: FeedItem[];
}

const body02 = (type: 'regular' | 'medium' | 'bold' = 'medium') => css`
  font-size: 14px;
  line-height: 1.5;
  font-weight: ${type === 'medium' ? 500 : type === 'bold' ? 700 : 400};
`;

// =========================
// Styled Components
// =========================

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: ${spacing.md};
  width: 100%;
  max-width: 420px; /* 앱 너비 기준 */
  margin: 0 auto;
  background-color: #ffffff;
`;

const FeedCard = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background-color: #f8f8f8; /* surface[2] */
  border-radius: ${radius.lg};
  position: relative;
  overflow: hidden;
`;

// 왼쪽 원형 썸네일 영역
const AvatarBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e4e4e7; /* gray[200] */
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  
  /* 하드웨어 가속 및 안티앨리어싱 버그 차단 */
  transform: translateZ(0);
  mask-image: -webkit-radial-gradient(white, black);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

// 오른쪽 텍스트 영역 래퍼
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
  position: relative;
`;

const Badge = styled.span`
  display: inline-block;
  color: #7c8ea3; /* info */
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 2px;
`;

const MainContent = styled.p`
  color: #18181b; /* gray[900] */
  margin: 0;
  min-height: 42px; /* 2줄 높이 고정 (14px * 1.5 * 2 = 42px) */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  ${body02('regular')}
`;

const DateText = styled.span`
  color: #a1a1aa; /* gray[400] */
  font-size: 12px;
  margin-top: 4px;
`;

// 💡 원형 스켈레톤을 위한 절대좌표 오버레이
const AbsCircleSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 50% !important;
`;

// =========================
// Component
// =========================

export const FeedList = ({
                             isLoading = false,
                             feeds = [],
                         }: FeedListProps) => {

    // 로딩 상태일 때 가짜 데이터 개수 확보 (3개 렌더링)
    const displayFeeds = feeds.length > 0
        ? feeds
        : Array.from({ length: 3 }).map((_, i) => ({ id: i, badgeText: '', content: '', date: '' }));

    return (
        <ListContainer>
            {displayFeeds.map((feed) => (
                <FeedCard key={feed.id}>

                    {/* 1. 왼쪽 원형 아바타 영역 */}
                    <AvatarBox>
                        {feed.avatarUrl && <img src={feed.avatarUrl} alt="avatar" />}
                        {isLoading && <AbsCircleSkeleton $variant="circle" />}
                    </AvatarBox>

                    {/* 2. 오른쪽 컨텐츠 영역 */}
                    <ContentBox>
                        <Badge>{feed.badgeText}</Badge>
                        <MainContent>{feed.content}</MainContent>
                        <DateText>{feed.date}</DateText>

                        {/* 💡 로딩 중일 때 오른쪽 텍스트 영역 전체를 덮어씌울 스켈레톤 구조 */}
                        {isLoading && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f8f8f8' }}>
                                {/* 배지 자리 스켈레톤 */}
                                <Skeleton $width="30%" $height="12px" />
                                {/* 본문 2줄 자리 스켈레톤 */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <Skeleton $width="95%" $height="14px" />
                                    <Skeleton $width="70%" $height="14px" />
                                </div>
                                {/* 날짜 자리 스켈레톤 */}
                                <Skeleton $width="20%" $height="12px" style={{ marginTop: '4px' }} />
                            </div>
                        )}
                    </ContentBox>

                </FeedCard>
            ))}
        </ListContainer>
    );
};

export default FeedList;