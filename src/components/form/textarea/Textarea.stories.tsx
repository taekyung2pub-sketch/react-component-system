import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
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