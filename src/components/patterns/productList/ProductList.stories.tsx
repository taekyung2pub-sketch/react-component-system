import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductList, ProductItem } from './ProductList.tsx';
import { Button } from '../../common/button/Button.tsx';
import { Tab } from '../../display/tab/Tab.tsx';
import { ProdItem } from '../../product/prodItem/ProdItem.tsx';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'ProductList',
        desc: 'ProdItem을 그리드로 나열하는 상품 목록 패턴 컴포넌트. 로딩 상태에서는 Skeleton으로 대체됩니다.',
    },
    sections: [
        {
            type: 'role',
            description: '상품 목록 페이지, 검색 결과, 카테고리 페이지 등에서 ProdItem을 일정한 레이아웃으로 나열합니다.',
            bulletList: [
                '상품 목록 페이지의 2열 그리드 (vertical)',
                '주문 내역, 장바구니 등의 가로형 리스트 (horizontal)',
                '데이터 로딩 중 스켈레톤 UI 표시',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'products 배열을 받아 ProdItem 컴포넌트로 렌더링',
                'isLoading이 true이면 ProdItem 대신 Skeleton 카드 표시',
                'skeletonCount로 로딩 중 표시할 placeholder 개수 지정',
                'layout은 외부에서 ProdItem에 직접 전달',
            ],
            diagram: [
                { label: 'Page' },
                { label: 'ProductList', active: true },
                {
                    nodes: [
                        { label: 'ProdItem ×n', active: true },
                        { label: 'Skeleton ×n (loading)' },
                    ],
                },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'isLoading 처리',
                    desc: 'isLoading이 true이면 products 데이터 유무와 관계없이 Skeleton 카드를 skeletonCount만큼 표시합니다. API 응답 전 빈 화면 없이 자연스러운 로딩 UX를 제공합니다.',
                },
                {
                    title: 'layout 전환',
                    desc: 'ProductList 자체는 layout prop을 갖지 않습니다. 가로형/세로형 전환은 ProdItem에 직접 layout prop을 전달하고 부모에서 그리드/플렉스 레이아웃을 조정해 구현합니다.',
                },
            ],
        },
    ],
};

// =========================
// Mock data
// =========================

const mockProducts: ProductItem[] = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        name: 'Regular Fit Slogan',
        price: 1190,
        originalPrice: 1700,
        currency: 'KRW',
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        name: 'Regular Fit Polo',
        price: 1100,
        currency: 'KRW',
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80',
        name: 'Regular Fit Black',
        price: 1690,
        originalPrice: 2000,
        currency: 'KRW',
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
        name: 'Regular Fit V-Neck',
        price: 1290,
        currency: 'KRW',
    },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Patterns/ProductList',
    component: ProductList,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isLoading: {
            control: 'boolean',
            description: '로딩 상태',
            table: { defaultValue: { summary: 'false' } },
        },
        skeletonCount: {
            control: { type: 'number', min: 1, max: 12 },
            description: '로딩 시 스켈레톤 개수',
            table: { defaultValue: { summary: '4' } },
        },
    },
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        isLoading: false,
        products: mockProducts,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Layout 토글
// =========================

const LayoutStory = () => {
    const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
            <Tab
                variant="equal"
                items={[
                    { label: '세로형', value: 'vertical' },
                    { label: '가로형', value: 'horizontal' },
                ]}
                defaultValue="vertical"
                onChange={(v) => setLayout(v as 'vertical' | 'horizontal')}
            />
            {layout === 'vertical' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {mockProducts.map((p) => (
                        <ProdItem
                            key={p.id}
                            layout="vertical"
                            name={p.name}
                            price={p.price}
                            originalPrice={p.originalPrice}
                            currency={p.currency}
                            imageSrc={p.imageUrl}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mockProducts.map((p) => (
                        <ProdItem
                            key={p.id}
                            layout="horizontal"
                            name={p.name}
                            price={p.price}
                            originalPrice={p.originalPrice}
                            currency={p.currency}
                            imageSrc={p.imageUrl}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const LayoutToggle: Story = {
    name: 'layout — 탭 토글',
    render: () => <LayoutStory />,
};

// =========================
// Loading
// =========================

export const Loading: Story = {
    name: 'loading — 스켈레톤',
    args: {
        isLoading: true,
        skeletonCount: 4,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Live demo
// =========================

const LiveDemoStory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoad = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
            <Button size="md" color="gray-dark" fullWidth onClick={handleLoad} disabled={isLoading}>
                {isLoading ? '로딩 중...' : '3초 로딩 테스트'}
            </Button>
            <ProductList isLoading={isLoading} products={mockProducts} />
        </div>
    );
};

export const LiveDemo: Story = {
    name: 'live demo — 로딩 전환',
    render: () => <LiveDemoStory />,
};