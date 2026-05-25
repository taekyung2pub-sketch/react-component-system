import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Button } from './Button';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Button',
        desc: '사용자의 주요 액션을 트리거하는 버튼 컴포넌트. variant / color / size 조합으로 시각적 우선순위를 표현합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '화면 내 주요 액션과 보조 액션을 구분해 표현합니다.',
            bulletList: [
                '주문하기, 결제하기 등 핵심 CTA (filled)',
                '취소, 닫기 등 보조 액션 (soft / outline)',
                '아이콘 단독 버튼으로 툴바, 헤더 액션 영역 사용',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'size로 높이 결정 (xs:24 / sm:32 / md:40 / lg:48)',
                'variant로 시각적 강조 수준 결정',
                'color로 의미 부여 (primary / error 등)',
                'leftIcon / rightIcon으로 아이콘 조합',
                'children 없이 아이콘만 있으면 정사각형 아이콘 버튼으로 렌더링',
            ],
            diagram: [
                { label: 'Page / Dock' },
                { label: 'Button', active: true },
                {
                    nodes: [
                        { label: 'leftIcon' },
                        { label: 'children', active: true },
                        { label: 'rightIcon' },
                    ],
                },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '아이콘 전용 버튼',
                    desc: 'children 없이 leftIcon 또는 rightIcon만 전달하면 width가 height와 동일한 정사각형 버튼으로 자동 전환됩니다.',
                },
                {
                    title: 'variant 선택 기준',
                    desc: '한 화면에서 filled는 최대 1~2개로 제한하고, 보조 액션은 soft / outline을 사용합니다.',
                    bulletList: [
                        'filled — 핵심 CTA, 가장 강한 강조',
                        'soft — 보조 액션, 배경 있지만 부드러운 강조',
                        'outline — 최소 강조, 취소나 닫기 등에 사용',
                    ],
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Common/Button',
    component: Button,
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
            options: ['xs', 'sm', 'md', 'lg'],
            description: '버튼 사이즈 (높이 기준 xs:24 / sm:32 / md:40 / lg:48)',
            table: { defaultValue: { summary: 'md' } },
        },
        variant: {
            control: 'inline-radio',
            options: ['filled', 'soft', 'outline'],
            description: 'filled — 배경 채움 / soft — 연한 배경 / outline — 테두리만',
            table: { defaultValue: { summary: 'filled' } },
        },
        color: {
            control: 'inline-radio',
            options: ['gray-dark', 'gray-light', 'primary', 'secondary', 'error'],
            description: '색상 테마',
            table: { defaultValue: { summary: 'primary' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg', 'full'],
            description: '모서리 둥글기',
            table: { defaultValue: { summary: 'md' } },
        },
        leftIcon: {
            control: 'text',
            description: '왼쪽 아이콘 (IconName)',
        },
        rightIcon: {
            control: 'text',
            description: '오른쪽 아이콘 (IconName)',
        },
        fullWidth: {
            control: 'boolean',
            description: '너비 꽉 채우기',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        size: 'md',
        variant: 'filled',
        color: 'primary',
        rounded: 'md',
        children: 'Button',
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(['gray-dark', 'gray-light', 'primary', 'secondary', 'error'] as const).map((color) => (
                <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button variant="filled"  color={color}>Button</Button>
                    <Button variant="soft"    color={color}>Button</Button>
                    <Button variant="outline" color={color}>Button</Button>
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
            <Button color="gray-dark">Button</Button>
            <Button color="gray-light">Button</Button>
            <Button color="primary">Button</Button>
            <Button color="secondary">Button</Button>
            <Button color="error">Button</Button>
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
            <Button size="xs">Button</Button>
            <Button size="sm">Button</Button>
            <Button size="md">Button</Button>
            <Button size="lg">Button</Button>
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
            <Button rounded="sm">Button</Button>
            <Button rounded="md">Button</Button>
            <Button rounded="lg">Button</Button>
            <Button rounded="full">Button</Button>
        </div>
    ),
};

// =========================
// Icon
// =========================

export const WithIcon: Story = {
    name: 'icon',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button leftIcon="heart">Button</Button>
                <Button rightIcon="arrow">Button</Button>
                <Button leftIcon="heart" rightIcon="arrow">Button</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size="sm" leftIcon="heart">Button</Button>
                <Button size="md" leftIcon="heart">Button</Button>
                <Button size="lg" leftIcon="heart">Button</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size="sm" leftIcon="heart" />
                <Button size="md" leftIcon="heart" />
                <Button size="lg" leftIcon="heart" />
            </div>
        </div>
    ),
};

// =========================
// FullWidth
// =========================

export const FullWidth: Story = {
    name: 'fullWidth',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px' }}>
            <Button fullWidth>Button</Button>
            <Button fullWidth variant="soft">Button</Button>
            <Button fullWidth variant="outline">Button</Button>
        </div>
    ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button disabled variant="filled">Button</Button>
            <Button disabled variant="soft">Button</Button>
            <Button disabled variant="outline">Button</Button>
        </div>
    ),
};