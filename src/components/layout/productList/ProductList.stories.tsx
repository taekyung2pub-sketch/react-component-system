import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductList, ProductItem } from './ProductList';
import { Button } from '../../common/button/Button';
import { Tab } from '../../display/tab/Tab';
import { ProdItem } from '../../product/prodItem/ProdItem';

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
    parameters: { layout: 'centered' },
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