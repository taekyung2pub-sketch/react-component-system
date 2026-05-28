import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Button } from '@/components/common/button/Button';
import { ProductList } from '@/components/patterns/productList/ProductList';
import { StepList } from '@/components/patterns/stepList/StepList';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout.tsx';

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
                'ProductList isLoading 상태의 상품 카드 플레이스홀더',
                'StepList 로딩 대기 상태',
                '프로필 이미지, 이름 등 사용자 정보 로딩 대기',
                '텍스트 라인 단위 로딩 표시',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                '실제 콘텐츠 레이아웃 구조를 Skeleton으로 동일하게 구성',
                'isLoading 조건에 따라 실제 컴포넌트와 Skeleton을 교체',
                'width / height는 실제 콘텐츠 크기와 최대한 맞춤',
                '$variant로 rect(기본) / circle 형태 선택',
            ],
            diagram: [
                { label: 'isLoading === true' },
                {
                    nodes: [
                        { label: 'Skeleton (placeholder)', active: true },
                        { label: 'ActualComponent' },
                    ],
                },
                { label: 'isLoading === false' },
                {
                    nodes: [
                        { label: 'Skeleton' },
                        { label: 'ActualComponent', active: true },
                    ],
                },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '구조 모방이 핵심',
                    desc: '실제 콘텐츠의 레이아웃 구조를 그대로 모방해야 로딩 전후 레이아웃 점프가 없습니다. 각 요소의 너비/높이를 실제 컴포넌트와 맞춰 사용합니다.',
                },
                {
                    title: 'shimmer 애니메이션',
                    desc: '좌에서 우로 흐르는 shimmer 애니메이션이 기본 적용되어 있습니다.',
                },
                {
                    title: '$variant',
                    desc: 'rect는 사각형(기본), circle은 원형입니다. 아바타, 프로필 이미지에는 circle을 사용합니다.',
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
// ProductList 적용 예시
// =========================

const mockProducts = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', name: 'Regular Fit Slogan', price: 1190, originalPrice: 1700, currency: 'KRW' as const },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', name: 'Regular Fit Polo',   price: 1100, currency: 'KRW' as const },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80', name: 'Regular Fit Black',  price: 1690, originalPrice: 2000, currency: 'KRW' as const },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80', name: 'Regular Fit V-Neck', price: 1290, currency: 'KRW' as const },
];

const ProductListSkeletonStory = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
            <Button size="sm" color="gray-dark" variant="outline" fullWidth onClick={() => setIsLoading((v) => !v)}>
                {isLoading ? '콘텐츠 보기' : '로딩 상태 보기'}
            </Button>
            <ProductList isLoading={isLoading} products={mockProducts} />
        </div>
    );
};

export const ProductListSkeleton: Story = {
    name: 'ProductList 적용 예시',
    render: () => <ProductListSkeletonStory />,
};

// =========================
// StepList 적용 예시
// =========================

const trackingItems = [
    { title: 'Packing',    desc: '2336 Jack Warren Rd, Delta Junction' },
    { title: 'Picked',     desc: '2417 Tongass Ave #111, Ketchikan' },
    { title: 'In Transit', desc: '16 Rr 2, Ketchikan, Alaska 99901' },
    { title: 'Delivered',  desc: '925 S Chugach St #APT 10, Alaska' },
];

const StepListSkeletonStory = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
            <Button size="sm" color="gray-dark" variant="outline" fullWidth onClick={() => setIsLoading((v) => !v)}>
                {isLoading ? '콘텐츠 보기' : '로딩 상태 보기'}
            </Button>
            <StepList variant="vertical" items={trackingItems} current={2} isLoading={isLoading} />
        </div>
    );
};

export const StepListSkeleton: Story = {
    name: 'StepList 적용 예시',
    render: () => <StepListSkeletonStory />,
};