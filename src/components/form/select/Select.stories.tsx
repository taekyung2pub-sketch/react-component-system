import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Select',
        desc: '시스템 기본 드롭다운으로 옵션을 선택하는 컴포넌트. box형과 text형 두 가지 variant를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '미리 정의된 옵션 중 하나를 선택할 때 사용합니다.',
            bulletList: [
                '주소 닉네임, 카테고리 등 폼 내 선택 필드 (box)',
                '상품 목록의 정렬 기준, 필터 선택 (text)',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'variant 선택 기준',
                    desc: '사용 위치에 따라 variant를 선택합니다.',
                    bulletList: [
                        'box — TextField와 동일한 스타일, 폼 내 입력 필드로 사용',
                        'text — 배경 없이 텍스트+화살표만, 정렬/필터 등 인라인 선택에 사용',
                    ],
                },
                {
                    title: 'text variant 너비',
                    desc: 'text variant는 width: 120px으로 고정되어 있습니다. 텍스트가 넘치면 말줄임으로 처리됩니다.',
                },
                {
                    title: '시스템 드롭다운',
                    desc: '브라우저/OS 기본 select 드롭다운을 사용합니다. 커스텀 드롭다운 UI가 필요한 경우에는 별도 구현이 필요합니다.',
                },
            ],
        },
    ],
};

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
        docs: {
            page: createDocsPage(docs),
        },
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
            <Select variant="text" placeholder="정렬"             options={sortOptions} />
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