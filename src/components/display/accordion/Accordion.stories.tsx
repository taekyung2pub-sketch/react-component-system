import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Accordion',
        desc: '클릭으로 콘텐츠를 펼치고 접을 수 있는 토글 리스트 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: 'FAQ, 설정, 필터 등 여러 항목을 공간 효율적으로 보여줄 때 사용합니다.',
            bulletList: [
                'FAQ 페이지의 질문/답변 목록',
                '설정 화면의 카테고리별 옵션',
                '상품 상세의 배송/반품 안내 등 접이식 정보',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'single 모드',
                    desc: 'single={true}(기본값)이면 하나가 열릴 때 나머지가 자동으로 닫힙니다. single={false}이면 각 항목이 독립적으로 동작합니다.',
                },
                {
                    title: 'content 없는 항목',
                    desc: 'content prop이 없으면 해당 항목은 opacity 0.4로 흐리게 표시되고 클릭이 비활성화됩니다. 숨기지 않고 비활성화로 처리해 레이아웃 일관성을 유지합니다.',
                },
                {
                    title: '열림 애니메이션',
                    desc: 'grid-template-rows 트랜지션으로 높이를 부드럽게 전환합니다. 화살표 아이콘은 열림 상태에서 180도 rotate됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Sample items
// =========================

const faqItems = [
    {
        id: '1',
        title: 'How do I make a purchase?',
        content: 'When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options (if applicable), and then tap the "Add to Cart" button.',
    },
    {
        id: '2',
        title: 'What payment methods are accepted?',
        content: 'We accept major credit cards, debit cards, and digital payment methods including Apple Pay and Google Pay.',
    },
    {
        id: '3',
        title: 'How do I track my orders?',
        content: 'You can track your order from the My Orders section in your account. Tap on any order to see real-time tracking information.',
    },
    {
        id: '4',
        title: 'Can I cancel or return an order?',
        content: 'Yes, you can cancel an order within 24 hours of placing it. Returns are accepted within 30 days of delivery.',
    },
    {
        id: '5',
        title: 'How can I contact customer support for assistance?',
        content: 'You can reach our customer support team through the Help Center in the app, or email us at support@example.com.',
    },
];

const itemsWithDisabled = [
    ...faqItems.slice(0, 3),
    { id: 'empty-1', title: '콘텐츠 없는 항목 (disabled)', content: undefined },
    { id: 'empty-2', title: '콘텐츠 없는 항목 (disabled)', content: undefined },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Accordion',
    component: Accordion,
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
            options: ['box', 'line'],
            description: 'box — 카드형 / line — 상하 border형',
            table: { defaultValue: { summary: 'box' } },
        },
        single: {
            control: 'boolean',
            description: 'true — 하나 열리면 나머지 닫힘 / false — 독립적으로 열고 닫힘',
            table: { defaultValue: { summary: 'true' } },
        },
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'box',
        items: faqItems,
        single: true,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: 320 }}>
            <Accordion variant="box"  items={faqItems.slice(0, 3)} />
            <Accordion variant="line" items={faqItems.slice(0, 3)} />
        </div>
    ),
};

// =========================
// Single / Multiple
// =========================

export const SingleMultiple: Story = {
    name: 'single / multiple',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: 320 }}>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>single — 하나 열리면 나머지 닫힘</p>
                <Accordion variant="box" items={faqItems.slice(0, 3)} single={true} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>multiple — 독립적으로 열고 닫힘</p>
                <Accordion variant="box" items={faqItems.slice(0, 3)} single={false} />
            </div>
        </div>
    ),
};

// =========================
// Disabled (content 없음)
// =========================

export const Disabled: Story = {
    name: 'disabled — 콘텐츠 없는 항목',
    render: () => (
        <div style={{ width: 320 }}>
            <Accordion variant="box" items={itemsWithDisabled} />
        </div>
    ),
};