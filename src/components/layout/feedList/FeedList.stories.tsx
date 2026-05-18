import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeedList, FeedItem } from './FeedList';

const mockFeeds: FeedItem[] = [
    {
        id: 1,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
        badgeText: 'NOTICE',
        content: '시스템 정기 점검 안내 (05/20 02:00 ~ 06:00) 서비스 이용에 참고해 주시기 바랍니다.',
        date: '2시간 전',
    },
    {
        id: 2,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        badgeText: 'EVENT',
        content: '가정의 달 기념 팩 오픈! 최대 50% 할인 쿠폰과 스페셜 굿즈 증정 이벤트를 놓치지 마세요.',
        date: '1일 전',
    },
    {
        id: 3,
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        badgeText: 'UPDATE',
        content: 'v2.4.0 버전 업데이트 노트: 피드 화면 UX 개선 및 신규 토스트 알림 기능이 추가되었습니다.',
        date: '3일 전',
    },
];

const meta = {
    title: 'Component/Patterns/FeedList',
    component: FeedList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isLoading: { control: 'boolean' },
    },
} satisfies Meta<typeof FeedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isLoading: false,
        feeds: mockFeeds,
    },
};

export const LiveTransitionDemo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <button
                onClick={toggleLoading}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                }}
            >
                🔄 피드 목록 3초 비동기 로딩 테스트
            </button>

            <div style={{ border: '1px solid #e4e4e7', borderRadius: '16px', overflow: 'hidden' }}>
                <FeedList isLoading={isLoading} feeds={mockFeeds} />
            </div>
        </div>
    );
};