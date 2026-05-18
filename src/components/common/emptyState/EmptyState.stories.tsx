import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { EmptyState } from './EmptyState';
import { iconMap } from '../icon/IconMap';

// =========================
// Meta
// =========================

const allIconNames = Object.keys(iconMap) as Array<keyof typeof iconMap>;

const meta = {
    title: 'Component/Common/EmptyState',
    component: EmptyState,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'inline-radio',
            options: ['empty', 'success', 'fail'],
            description: '상태 타입 (아이콘 · 색상 · 기본 텍스트 자동 결정)',
            table: { defaultValue: { summary: 'empty' } },
        },
        icon: {
            control: 'select',
            options: allIconNames,
            description: '아이콘 오버라이드 (미지정 시 type 기본값 사용)',
        },
        title: {
            control: 'text',
            description: '타이틀 텍스트 (미지정 시 type 기본값 사용)',
        },
        description: {
            control: 'text',
            description: '서브텍스트 (미지정 시 type 기본값 사용)',
        },
    },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        type: 'empty',
    },
};

// =========================
// Type
// =========================

export const Type: Story = {
    name: 'type',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px' }}>
            <EmptyState type="empty" />
            <EmptyState type="success" />
            <EmptyState type="fail" />
        </div>
    ),
};

// =========================
// Custom text
// =========================

export const CustomText: Story = {
    name: 'custom text',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px' }}>
            <EmptyState
                type="empty"
                title="주문 내역이 없어요"
                description="첫 주문을 시작해보세요."
            />
            <EmptyState
                type="success"
                title="결제가 완료되었어요"
                description="주문이 접수되었습니다."
            />
            <EmptyState
                type="fail"
                title="결제에 실패했어요"
                description="카드 정보를 확인하고 다시 시도해 주세요."
            />
        </div>
    ),
};

// =========================
// Custom icon
// =========================

export const CustomIcon: Story = {
    name: 'custom icon',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px' }}>
            <EmptyState type="empty" icon="cart" title="장바구니가 비어있어요" description="원하는 상품을 담아보세요." />
            <EmptyState type="empty" icon="heart" title="찜한 상품이 없어요" description="마음에 드는 상품을 찜해보세요." />
            <EmptyState type="empty" icon="search" title="검색 결과가 없어요" description="다른 키워드로 검색해보세요." />
        </div>
    ),
};