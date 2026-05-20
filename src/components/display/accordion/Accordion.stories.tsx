import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

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
    {
        id: 'empty-1',
        title: '콘텐츠 없는 항목 (disabled)',
        content: undefined,
    },
    {
        id: 'empty-2',
        title: '콘텐츠 없는 항목 (disabled)',
        content: undefined,
    },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Accordion',
    component: Accordion,
    parameters: { layout: 'centered' },
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