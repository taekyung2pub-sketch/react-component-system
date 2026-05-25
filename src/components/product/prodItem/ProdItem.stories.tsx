import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProdItem } from './ProdItem';
import { Tab } from '../../display/tab/Tab';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'ProdItem',
        desc: '상품 썸네일 이미지, 상품명, 가격으로 구성된 상품 아이템 컴포넌트. 세로형과 가로형 레이아웃을 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '상품 목록, 검색 결과, 추천 상품 등 상품을 나열하는 모든 영역에서 사용합니다.',
            bulletList: [
                '상품 목록 2열 그리드 (vertical)',
                '장바구니, 주문 현황 등 가로형 리스트 (horizontal)',
                'ProductList 패턴 컴포넌트의 내부 단위',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'Ratio — 이미지 컨테이너 (비율 고정)',
                'WishButton — Ratio 우측 상단 absolute 위치',
                'ProductName — 최대 2줄 말줄임',
                'Price — size / currency / variant 자동 연동',
            ],
            diagram: [
                { label: 'ProdItem', active: true },
                {
                    nodes: [
                        { label: 'Ratio + WishButton', active: true },
                        { label: 'ProductName + Price', active: true },
                    ],
                },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'layout별 Ratio 설정',
                    desc: 'layout에 따라 Ratio 비율과 너비가 자동으로 달라집니다.',
                    bulletList: [
                        'vertical — ratio 3/4, width full',
                        'horizontal — ratio 1/1, width md(120px)',
                    ],
                },
                {
                    title: '찜 버튼',
                    desc: '내부 useState로 토글 관리합니다. wishDisabled={true}이면 opacity 0.4 + not-allowed 커서로 비활성화됩니다.',
                },
            ],
        },
    ],
};

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
    { name: 'Regular Fit Slogan', price: 1190, originalPrice: 1700, imageUrl: mockImages[0] },
    { name: 'Regular Fit Polo',   price: 1100, imageUrl: mockImages[1] },
    { name: 'Regular Fit Black',  price: 1690, originalPrice: 2000, imageUrl: mockImages[2] },
    { name: 'Regular Fit V-Neck', price: 1290, imageUrl: mockImages[3] },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Product/ProdItem',
    component: ProdItem,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
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
                        <ProdItem key={i} layout="vertical" name={p.name} price={p.price} originalPrice={p.originalPrice} currency="KRW" imageSrc={p.imageUrl} />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mockProducts.map((p, i) => (
                        <ProdItem key={i} layout="horizontal" name={p.name} price={p.price} originalPrice={p.originalPrice} currency="KRW" imageSrc={p.imageUrl} />
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