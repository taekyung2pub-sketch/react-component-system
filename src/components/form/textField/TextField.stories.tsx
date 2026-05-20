import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'inline-radio',
            options: ['text', 'email', 'password', 'search', 'number'],
            description: 'input 타입',
            table: { defaultValue: { summary: 'text' } },
        },
        status: {
            control: 'inline-radio',
            options: ['default', 'focus', 'success', 'error'],
            description: '입력 상태 (search 타입은 무시됨)',
            table: { defaultValue: { summary: 'default' } },
        },
        placeholder: {
            control: 'text',
            description: 'placeholder 텍스트',
        },
        message: {
            control: 'text',
            description: '에러 메시지 (error 상태일 때 표시)',
        },
        deleteBtn: {
            control: 'boolean',
            description: '삭제 버튼 (!disabled && !!value && type !== password 일 때 노출)',
            table: { defaultValue: { summary: 'true' } },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        type: 'text',
        status: 'default',
        placeholder: 'placeholder',
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Status
// =========================

export const Status: Story = {
    name: 'status',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <TextField status="default" placeholder="default" />
            <TextField status="focus"   placeholder="focus" />
            <TextField status="success" placeholder="success" />
            <TextField status="error"   placeholder="error" message="에러 메시지입니다." />
        </div>
    ),
};

// =========================
// Type
// =========================

export const Type: Story = {
    name: 'type',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <TextField type="text"     placeholder="text" />
            <TextField type="email"    placeholder="email" />
            <TextField type="password" placeholder="password" />
            <TextField type="number"   placeholder="number" />
            <TextField type="search"   placeholder="Search for clothes..." />
        </div>
    ),
};

// =========================
// Password
// =========================

export const Password: Story = {
    name: 'password — 토글',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <TextField type="password" placeholder="비밀번호를 입력하세요" />
            <TextField type="password" status="success" placeholder="비밀번호를 입력하세요" />
            <TextField type="password" status="error"   placeholder="비밀번호를 입력하세요" message="비밀번호가 일치하지 않습니다." />
        </div>
    ),
};

// =========================
// Search
// =========================

export const Search: Story = {
    name: 'search',
    render: () => (
        <div style={{ width: 320 }}>
            <TextField type="search" placeholder="Search for clothes..." />
        </div>
    ),
};

// =========================
// Delete button
// =========================

export const DeleteBtn: Story = {
    name: 'deleteBtn',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <TextField placeholder="입력하면 삭제 버튼이 나타납니다." />
            <TextField placeholder="deleteBtn false" deleteBtn={false} />
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
            <TextField disabled placeholder="disabled" />
        </div>
    ),
};