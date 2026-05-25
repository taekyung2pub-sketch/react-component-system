import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Docker } from './Docker';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Docker',
        desc: '앱 하단에 고정되는 영역 컴포넌트. 네비게이션 탭바, 상품 CTA, 페이지 액션 버튼 3가지 variant를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '모바일 앱의 하단 고정 영역으로, 화면 유형에 따라 다른 UI를 제공합니다.',
            bulletList: [
                'nav — 메인 탭바, 전체 화면에서 항상 고정',
                'product — 상품 상세 화면의 가격 + 장바구니 버튼',
                'action — 주문서, 주소 등록 등의 하단 확인/취소 버튼',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'position: fixed',
                    desc: '실제 앱에서는 하단에 고정됩니다. 스토리북에서는 position: relative 컨테이너 안에서 확인합니다.',
                },
                {
                    title: 'actions 배열',
                    desc: 'action variant에서 버튼 개수에 따라 레이아웃이 달라집니다.',
                    bulletList: [
                        '1개 — fullWidth로 가득 채움',
                        '2개 — 균등 분할, 첫 번째는 outline, 두 번째는 filled',
                    ],
                },
                {
                    title: 'iOS safe area',
                    desc: 'padding-bottom: env(safe-area-inset-bottom)으로 노치 디바이스 대응이 적용되어 있습니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Layout/Docker',
    component: Docker,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['nav', 'product', 'action'],
            description: 'nav — 탭바 / product — 상품 상세 / action — 하단 버튼',
            table: { defaultValue: { summary: 'nav' } },
        },
    },
} satisfies Meta<typeof Docker>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
    { icon: 'home'   as const, label: 'Home',    value: 'home' },
    { icon: 'search' as const, label: 'Search',  value: 'search' },
    { icon: 'heart'  as const, label: 'Saved',   value: 'saved' },
    { icon: 'cart'   as const, label: 'Cart',    value: 'cart' },
    { icon: 'user'   as const, label: 'Account', value: 'account' },
];

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'nav',
        navItems,
        activeNav: 'home',
    },
    decorators: [(Story) => (
        <div style={{ width: 375, height: 120, position: 'relative' }}>
            <Story />
        </div>
    )],
};

// =========================
// Nav
// =========================

const NavStory = () => {
    const [active, setActive] = useState('home');
    return (
        <div style={{ width: 375, height: 120, position: 'relative' }}>
            <Docker variant="nav" navItems={navItems} activeNav={active} onNavChange={setActive} />
        </div>
    );
};

export const Nav: Story = {
    name: 'nav — 탭바',
    render: () => <NavStory />,
};

// =========================
// Product
// =========================

export const Product: Story = {
    name: 'product — 상품 상세',
    render: () => (
        <div style={{ width: 375, height: 100, position: 'relative' }}>
            <Docker
                variant="product"
                price={119000}
                currency="KRW"
                onAddToCart={() => alert('장바구니 추가')}
            />
        </div>
    ),
};

// =========================
// Action — 1개
// =========================

export const ActionSingle: Story = {
    name: 'action — 버튼 1개',
    render: () => (
        <div style={{ width: 375, height: 100, position: 'relative' }}>
            <Docker variant="action" actions={[{ label: 'Place Order' }]} />
        </div>
    ),
};

// =========================
// Action — 2개
// =========================

export const ActionDouble: Story = {
    name: 'action — 버튼 2개',
    render: () => (
        <div style={{ width: 375, height: 100, position: 'relative' }}>
            <Docker
                variant="action"
                actions={[
                    { label: 'Cancel', variant: 'outline' },
                    { label: 'Apply' },
                ]}
            />
        </div>
    ),
};