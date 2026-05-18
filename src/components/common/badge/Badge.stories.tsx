import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Badge } from './Badge';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Common/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md'],
            description: '사이즈 (padding으로 세로 중앙 정렬)',
            table: { defaultValue: { summary: 'md' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg', 'full'],
            description: '모서리 둥글기',
            table: { defaultValue: { summary: 'sm' } },
        },
        variant: {
            control: 'inline-radio',
            options: ['filled', 'soft', 'outline'],
            description: 'filled — 배경 채움 / soft — 연한 배경 / outline — 테두리만',
            table: { defaultValue: { summary: 'filled' } },
        },
        color: {
            control: 'inline-radio',
            options: ['gray-dark', 'gray-light', 'primary', 'secondary'],
            description: '색상 테마',
            table: { defaultValue: { summary: 'primary' } },
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        size: 'md',
        rounded: 'sm',
        variant: 'filled',
        color: 'primary',
        children: 'Badge',
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(['gray-dark', 'gray-light', 'primary', 'secondary'] as const).map((color) => (
                <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge variant="filled"  color={color}>Badge</Badge>
                    <Badge variant="soft"    color={color}>Badge</Badge>
                    <Badge variant="outline" color={color}>Badge</Badge>
                </div>
            ))}
        </div>
    ),
};

// =========================
// Color
// =========================

export const Color: Story = {
    name: 'color',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge color="gray-dark">Badge</Badge>
            <Badge color="gray-light">Badge</Badge>
            <Badge color="primary">Badge</Badge>
            <Badge color="secondary">Badge</Badge>
        </div>
    ),
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge size="sm">Badge</Badge>
            <Badge size="md">Badge</Badge>
        </div>
    ),
};

// =========================
// Rounded
// =========================

export const Rounded: Story = {
    name: 'rounded',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge rounded="sm">Badge</Badge>
            <Badge rounded="md">Badge</Badge>
            <Badge rounded="lg">Badge</Badge>
            <Badge rounded="full">Badge</Badge>
        </div>
    ),
};