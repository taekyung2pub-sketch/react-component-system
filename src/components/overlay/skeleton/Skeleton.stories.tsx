import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
    title: 'Component/Overlay/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        $width: {
            control: 'text',
            description: '스켈레톤의 가로 너비를 지정합니다. (px, % 등)',
        },
        $height: {
            control: 'text',
            description: '스켈레톤의 세로 높이를 지정합니다. (px, % 등)',
        },
        $variant: {
            control: 'inline-radio',
            options: ['rect', 'circle'],
            description: '스켈레톤의 형태를 결정합니다. (사각형 / 원형)',
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본형 스토리 (가장 자주 쓰이는 텍스트 라인 형태)
export const Default: Story = {
    args: {
        $width: '300px',
        $height: '16px',
        $variant: 'rect',
    },
};

// 2. 원형 스토리 (아바타, 원형 버튼, 아이콘 자리를 대체할 때 사용)
export const Circle: Story = {
    args: {
        $width: '64px',
        $height: '64px',
        $variant: 'circle',
    },
};

// 3. 큰 사각형 스토리 (상품 썸네일이나 배너 자리를 대체할 때 사용)
export const BoxRectangle: Story = {
    args: {
        $width: '343px',
        $height: '180px',
        $variant: 'rect',
    },
};

// 4. 단독 조합 예시 스토리 (실제 목록 컴포넌트를 만들기 전에, 타이포그래피 형태로 쌓아서 애니메이션 흐름을 테스트하는 용도)
export const TypographyCombinationList = () => {
    return (
        <div style={{
            width: '343px',
            padding: '16px',
            border: '1px solid #e4e4e7',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#ffffff'
        }}>
            {/* 타이틀 영역 느낌 */}
            <Skeleton $width="40%" $height="20px" />

            {/* 본문 영역 느낌 (줄마다 길이를 다르게 해야 자연스러움) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Skeleton $width="100%" $height="14px" />
                <Skeleton $width="95%" $height="14px" />
                <Skeleton $width="60%" $height="14px" />
            </div>
        </div>
    );
};