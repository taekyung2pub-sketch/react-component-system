import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Badge } from './Badge';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Badge',
        desc: '상태, 카테고리, 라벨 등 짧은 정보를 강조해서 표시하는 인라인 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '텍스트나 아이템에 부가적인 정보를 시각적으로 덧붙일 때 사용합니다.',
            bulletList: [
                '상품 상태 표시 (Completed, In Transit, Picked 등)',
                '카테고리 태그, 필터 라벨',
                '알림 카운트, 상태 표시',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'variant와 color 조합',
                    desc: 'variant(filled/soft/outline)와 color(gray-dark/gray-light/primary/secondary)를 조합해 다양한 강조 수준을 표현합니다. 중요도가 높을수록 filled, 보조 정보는 soft나 outline을 권장합니다.',
                },
                {
                    title: 'rounded 선택 기준',
                    desc: '일반 태그는 sm, 상태 표시용은 full을 주로 사용합니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Common/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
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