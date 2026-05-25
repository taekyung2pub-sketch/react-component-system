import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProdItem } from './ProdItem';
import { Tab } from '../../display/tab/Tab';

// =========================
// Mock images
// =========================

const mockImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
];

const mockProducts = [
    { name: 'Regular Fit Slogan',  price: 1190, originalPrice: 1700, imageUrl: mockImages[0] },
    { name: 'Regular Fit Polo',    price: 1100, imageUrl: mockImages[1] },
    { name: 'Regular Fit Black',   price: 1690, originalPrice: 2000, imageUrl: mockImages[2] },
    { name: 'Regular Fit V-Neck',  price: 1290, imageUrl: mockImages[3] },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Product/ProdItem',
    component: ProdItem,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        layout: {
            control: 'inline-radio',
            options: ['vertical', 'horizontal'],
            description: '세로형 / 가로형',
            table: { defaultValue: { summary: 'vertical' } },
        },
        currency: {
            control: 'inline-radio',
            options: ['USD', 'KRW'],
            description: '통화',
            table: { defaultValue: { summary: 'KRW' } },
        },
        wishDisabled: {
            control: 'boolean',
            description: '찜 버튼 비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof ProdItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        layout: 'vertical',
        name: 'Regular Fit Slogan',
        price: 1190,
        currency: 'KRW',
        imageSrc: mockImages[0],
    },
    decorators: [(Story) => <div style={{ width: 160 }}><Story /></div>],
};

// =========================
// Layout — 탭 토글
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
                    {mockProducts.map((p, i) => (
                        <ProdItem
                            key={i}
                            layout="vertical"
                            name={p.name}
                            price={p.price}
                            originalPrice={p.originalPrice}
                            currency="KRW"
                            imageSrc={p.imageUrl}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mockProducts.map((p, i) => (
                        <ProdItem
                            key={i}
                            layout="horizontal"
                            name={p.name}
                            price={p.price}
                            originalPrice={p.originalPrice}
                            currency="KRW"
                            imageSrc={p.imageUrl}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Layout: Story = {
    name: 'layout — 탭 토글',
    render: () => <LayoutStory />,
};

// =========================
// Wish
// =========================

export const Wish: Story = {
    name: 'wish — 찜 토글',
    render: () => (
        <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: 150 }}>
                <span style={{ fontSize: '11px', color: '#71717a', display: 'block', marginBottom: '4px' }}>기본 (토글 가능)</span>
                <ProdItem layout="vertical" name="Regular Fit Slogan" price={1190} currency="KRW" imageSrc={mockImages[0]} />
            </div>
            <div style={{ width: 150 }}>
                <span style={{ fontSize: '11px', color: '#71717a', display: 'block', marginBottom: '4px' }}>wishDisabled</span>
                <ProdItem layout="vertical" name="Regular Fit Slogan" price={1190} currency="KRW" imageSrc={mockImages[0]} wishDisabled />
            </div>
        </div>
    ),
};

// =========================
// Discount
// =========================

export const Discount: Story = {
    name: 'discount',
    render: () => (
        <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: 150 }}>
                <ProdItem layout="vertical" name="Regular Fit Slogan" price={1190} originalPrice={1700} currency="KRW" imageSrc={mockImages[0]} />
            </div>
            <div style={{ width: 150 }}>
                <ProdItem layout="vertical" name="Regular Fit Polo" price={1100} originalPrice={1500} currency="KRW" imageSrc={mockImages[1]} />
            </div>
        </div>
    ),
};