import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

// =========================
// Sample options
// =========================

const addressOptions = [
    { label: 'Home',   value: 'home' },
    { label: 'Office', value: 'office' },
    { label: 'Other',  value: 'other' },
];

const sortOptions = [
    { label: '최신순',     value: 'latest' },
    { label: '인기순',     value: 'popular' },
    { label: '낮은 가격순', value: 'price_asc' },
    { label: '높은 가격순', value: 'price_desc' },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['box', 'text'],
            description: 'box — TextField 스타일 / text — 텍스트 + 화살표',
            table: { defaultValue: { summary: 'box' } },
        },
        placeholder: {
            control: 'text',
            description: 'placeholder 텍스트',
            table: { defaultValue: { summary: '선택하세요' } },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'box',
        placeholder: 'Choose one',
        options: addressOptions,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
            <Select variant="box"  placeholder="Choose one" options={addressOptions} />
            <Select variant="text" placeholder="정렬" options={sortOptions} />
        </div>
    ),
};

// =========================
// Box
// =========================

export const Box: Story = {
    name: 'box',
    render: () => (
        <div style={{ width: 320 }}>
            <Select variant="box" placeholder="Choose one" options={addressOptions} />
        </div>
    ),
};

// =========================
// Text
// =========================

export const Text: Story = {
    name: 'text',
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Select variant="text" placeholder="정렬"     options={sortOptions} />
            <Select variant="text" placeholder="카테고리카테고리카테고리" options={addressOptions} />
        </div>
    ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320, alignItems: 'flex-start' }}>
            <Select variant="box"  placeholder="Choose one" options={addressOptions} disabled />
            <Select variant="text" placeholder="정렬"       options={sortOptions}    disabled />
        </div>
    ),
};