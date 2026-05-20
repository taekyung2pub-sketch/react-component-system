import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';

// =========================
// Sample items
// =========================

const orderItems = [
    { label: 'Ongoing',   value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
];

const categoryItems = [
    { label: 'All',       value: 'all' },
    { label: 'T-Shirts',  value: 'tshirts' },
    { label: 'Pants',     value: 'pants' },
    { label: 'Shoes',     value: 'shoes' },
    { label: 'Bags',      value: 'bags' },
    { label: 'Hats',      value: 'hats' },
    { label: 'Jackets',   value: 'jackets' },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Tab',
    component: Tab,
    parameters: { layout: 'centered' },
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
            {/* 균등형 */}
            <Tab variant="equal" items={orderItems} defaultValue="ongoing" />

            {/* 스와이프 일반형 — 페이지 좌우 여백 16px 시뮬레이션 */}
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