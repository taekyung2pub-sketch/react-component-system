import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Tab',
        desc: '화면 내 콘텐츠를 카테고리별로 전환하는 탭 컴포넌트. 균등형과 스와이프형 두 가지 variant를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '한 화면 안에서 콘텐츠를 카테고리로 나눠 전환할 때 사용합니다.',
            bulletList: [
                '주문 목록의 진행중 / 완료 탭 전환 (equal)',
                '상품 목록의 카테고리 필터 탭 (scroll)',
                '마이페이지 섹션 탭 전환',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'equal variant',
                    desc: '탭이 컨테이너 너비를 균등 분할합니다. 탭 수가 2~4개일 때 적합하며, 너무 많으면 텍스트가 잘릴 수 있습니다.',
                },
                {
                    title: 'scroll variant',
                    desc: '탭이 고정 너비로 가로 스크롤됩니다. pageSpacing prop으로 페이지 좌우 여백을 지정하면 음수 마진으로 화면 끝까지 영역이 확장됩니다. 마우스 드래그와 터치 스와이프를 모두 지원합니다.',
                },
                {
                    title: '상태 관리',
                    desc: '선택된 탭은 내부 useState로 관리합니다. defaultValue로 초기 탭을 지정하고, onChange로 변경 이벤트를 외부에서 수신합니다.',
                },
            ],
        },
    ],
};

// =========================
// Sample items
// =========================

const orderItems = [
    { label: 'Ongoing',   value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
];

const categoryItems = [
    { label: 'All',      value: 'all' },
    { label: 'T-Shirts', value: 'tshirts' },
    { label: 'Pants',    value: 'pants' },
    { label: 'Shoes',    value: 'shoes' },
    { label: 'Bags',     value: 'bags' },
    { label: 'Hats',     value: 'hats' },
    { label: 'Jackets',  value: 'jackets' },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Tab',
    component: Tab,
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
            options: ['equal', 'scroll'],
            description: 'equal — 균등형 / scroll — 스와이프 일반형',
            table: { defaultValue: { summary: 'equal' } },
        },
    },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'equal',
        items: orderItems,
        defaultValue: 'ongoing',
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: 320 }}>
            <Tab variant="equal" items={orderItems} defaultValue="ongoing" />
            <div style={{ overflow: 'hidden' }}>
                <Tab variant="scroll" items={categoryItems} defaultValue="all" pageSpacing="16px" />
            </div>
        </div>
    ),
};

// =========================
// Equal
// =========================

export const Equal: Story = {
    name: 'equal — 균등형',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <Tab variant="equal" items={orderItems} defaultValue="ongoing" />
            <Tab variant="equal" items={[
                { label: 'One',   value: '1' },
                { label: 'Two',   value: '2' },
                { label: 'Three', value: '3' },
            ]} defaultValue="1" />
        </div>
    ),
};

// =========================
// Scroll
// =========================

export const Scroll: Story = {
    name: 'scroll — 스와이프 일반형',
    render: () => (
        <div style={{ overflow: 'hidden', width: 320 }}>
            <Tab variant="scroll" items={categoryItems} defaultValue="all" pageSpacing="16px" />
        </div>
    ),
};