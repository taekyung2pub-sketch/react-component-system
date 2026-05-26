import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'TextArea',
        desc: '여러 줄 텍스트를 입력받는 컴포넌트. 고정 높이와 글자 수 카운터를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '한 줄 이상의 자유 형식 텍스트가 필요한 입력 영역에 사용합니다.',
            bulletList: [
                '리뷰 작성 화면의 본문 입력',
                '문의, 요청사항 등 긴 텍스트 입력',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '상태 관리',
                    desc: '입력값은 내부 useState로 관리합니다. 외부 controlled 방식은 지원하지 않습니다.',
                },
                {
                    title: 'height 고정',
                    desc: 'height prop(px)으로 높이를 고정하며 resize는 비활성화되어 있습니다. 기본값은 120px입니다.',
                },
                {
                    title: 'maxLength 카운터',
                    desc: 'maxLength를 지정하면 우측 하단에 현재/최대 글자 수 카운터가 표시됩니다. 미지정 시 카운터가 노출되지 않습니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'placeholder 텍스트',
        },
        height: {
            control: { type: 'number', min: 80, max: 400, step: 8 },
            description: '고정 높이 (px)',
            table: { defaultValue: { summary: '120' } },
        },
        maxLength: {
            control: { type: 'number', min: 10, max: 1000 },
            description: '최대 글자수 (지정 시 카운터 표시)',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        placeholder: 'Write your review...',
        height: 120,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Height
// =========================

export const Height: Story = {
    name: 'height',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <TextArea placeholder="height 80" height={80} />
            <TextArea placeholder="height 120 (default)" height={120} />
            <TextArea placeholder="height 200" height={200} />
        </div>
    ),
};

// =========================
// Counter
// =========================

export const Counter: Story = {
    name: 'counter',
    render: () => (
        <div style={{ width: 320 }}>
            <TextArea placeholder="최대 200자까지 입력 가능합니다." maxLength={200} />
        </div>
    ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ width: 320 }}>
            <TextArea disabled placeholder="disabled" />
        </div>
    ),
};