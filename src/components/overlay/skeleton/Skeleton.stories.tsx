import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Skeleton',
        desc: '데이터 로딩 중 콘텐츠 자리를 채우는 플레이스홀더 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: 'API 응답을 기다리는 동안 빈 화면 대신 콘텐츠 형태를 미리 보여줍니다.',
            bulletList: [
                'ProductList의 isLoading 상태에서 상품 카드 플레이스홀더',
                '프로필 이미지, 이름 등 사용자 정보 로딩 대기',
                '텍스트 라인 단위 로딩 표시',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '조합해서 사용',
                    desc: 'Skeleton 단독보다 여러 개를 조합해 실제 UI 구조를 모방하면 효과적입니다. 실제 콘텐츠와 너비/높이를 최대한 맞춰 레이아웃 점프를 줄입니다.',
                },
                {
                    title: '$variant',
                    desc: 'rect는 사각형, circle은 원형입니다. 아바타, 프로필 이미지에는 circle을 사용합니다.',
                },
                {
                    title: 'shimmer 애니메이션',
                    desc: '좌에서 우로 흐르는 shimmer 애니메이션이 기본 적용되어 있습니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Overlay/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        $width: {
            control: 'text',
            description: '가로 너비 (px, % 등)',
            table: { defaultValue: { summary: '100%' } },
        },
        $height: {
            control: 'text',
            description: '세로 높이 (px, % 등)',
            table: { defaultValue: { summary: '16px' } },
        },
        $variant: {
            control: 'inline-radio',
            options: ['rect', 'circle'],
            description: '형태 (rect — 사각형 / circle — 원형)',
            table: { defaultValue: { summary: 'rect' } },
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        $width: '300px',
        $height: '16px',
        $variant: 'rect',
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Skeleton $width="120px" $height="16px" $variant="rect" />
            <Skeleton $width="48px" $height="48px" $variant="circle" />
        </div>
    ),
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
            <Skeleton $height="12px" />
            <Skeleton $height="16px" />
            <Skeleton $height="20px" />
            <Skeleton $width="200px" $height="120px" />
        </div>
    ),
};

// =========================
// Combination — 상품 카드
// =========================

export const ProductCard: Story = {
    name: 'combination — 상품 카드',
    render: () => (
        <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton $width="160px" $height="160px" />
            <Skeleton $width="80%" $height="14px" />
            <Skeleton $width="50%" $height="14px" />
            <Skeleton $width="60%" $height="16px" />
        </div>
    ),
};

// =========================
// Combination — 목록 아이템
// =========================

export const ListItem: Story = {
    name: 'combination — 목록 아이템',
    render: () => (
        <div style={{ width: '343px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Skeleton $width="48px" $height="48px" $variant="circle" />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Skeleton $width="60%" $height="14px" />
                        <Skeleton $width="90%" $height="12px" />
                    </div>
                </div>
            ))}
        </div>
    ),
};