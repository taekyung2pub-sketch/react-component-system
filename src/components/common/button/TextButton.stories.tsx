import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TextButton } from './TextButton';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'TextButton',
        desc: '배경 없이 텍스트만으로 구성된 인라인 버튼. 보조 액션이나 링크성 요소에 사용합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '강조가 필요 없는 보조 액션, 링크성 텍스트, 인라인 액션 영역에 사용합니다.',
            bulletList: [
                '더보기, 전체보기 등 인라인 액션',
                'Rating summary의 리뷰 수 클릭 유도',
                '폼 하단의 비밀번호 찾기, 회원가입 등 보조 링크',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'Button과의 구분',
                    desc: '배경과 테두리가 없어 텍스트처럼 보이지만 클릭 가능한 요소임을 표현합니다. underline prop으로 링크성 강조를 추가할 수 있습니다.',
                },
                {
                    title: '아이콘 조합',
                    desc: 'leftIcon / rightIcon을 통해 아이콘과 함께 사용할 수 있습니다. 아이콘 크기는 size에 따라 자동 조정됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Common/TextButton',
    component: TextButton,
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
            options: ['sm', 'md', 'lg'],
            description: '텍스트 버튼 사이즈 (sm:12px / md:14px / lg:16px)',
            table: { defaultValue: { summary: 'md' } },
        },
        color: {
            control: 'inline-radio',
            options: ['gray-dark', 'gray-light', 'primary', 'secondary', 'error'],
            description: '색상 테마',
            table: { defaultValue: { summary: 'primary' } },
        },
        underline: {
            control: 'boolean',
            description: '밑줄 여부',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        size: 'md',
        color: 'primary',
        underline: false,
        children: 'TextButton',
    },
};

// =========================
// Color
// =========================

export const Color: Story = {
    name: 'color',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TextButton color="gray-dark">TextButton</TextButton>
            <TextButton color="gray-light">TextButton</TextButton>
            <TextButton color="primary">TextButton</TextButton>
            <TextButton color="secondary">TextButton</TextButton>
            <TextButton color="error">TextButton</TextButton>
        </div>
    ),
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TextButton size="sm">TextButton</TextButton>
            <TextButton size="md">TextButton</TextButton>
            <TextButton size="lg">TextButton</TextButton>
        </div>
    ),
};

// =========================
// Underline
// =========================

export const Underline: Story = {
    name: 'underline',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TextButton underline={false}>TextButton</TextButton>
            <TextButton underline>TextButton</TextButton>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <TextButton leftIcon="heart">TextButton</TextButton>
                <TextButton rightIcon="arrow">TextButton</TextButton>
                <TextButton leftIcon="heart" rightIcon="arrow">TextButton</TextButton>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <TextButton size="sm" leftIcon="heart">TextButton</TextButton>
                <TextButton size="md" leftIcon="heart">TextButton</TextButton>
                <TextButton size="lg" leftIcon="heart">TextButton</TextButton>
            </div>
        </div>
    ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TextButton disabled color="primary">TextButton</TextButton>
            <TextButton disabled color="gray-dark">TextButton</TextButton>
            <TextButton disabled color="error">TextButton</TextButton>
        </div>
    ),
};