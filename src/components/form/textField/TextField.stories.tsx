import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'TextField',
        desc: '텍스트 입력을 받는 기본 폼 컴포넌트. 상태, 타입, 삭제 버튼을 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '사용자로부터 텍스트 입력을 받는 모든 폼 상황에서 사용됩니다.',
            bulletList: [
                '로그인 / 회원가입 폼의 이메일, 비밀번호 입력',
                '검색 페이지의 검색어 입력',
                '주문서, 주소 등록 등 각종 정보 입력 폼',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'type prop으로 입력 유형 결정 (text / email / password / search / number)',
                'status prop으로 유효성 상태 표현 (default / focus / success / error)',
                '값과 상태는 내부 useState로 관리 (uncontrolled)',
                'error 상태일 때 message prop으로 에러 문구 표시',
            ],
            diagram: [
                { label: 'Form / Page' },
                { label: 'TextField', active: true },
                {
                    nodes: [
                        { label: 'Left Icon (search)' },
                        { label: 'Input', active: true },
                        { label: 'Right Slot' },
                    ],
                },
                { label: 'ErrorMessage' },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '상태 관리',
                    desc: '입력값은 내부 useState로 관리합니다. 외부에서 value / onChange를 주입하는 controlled 방식은 지원하지 않습니다.',
                },
                {
                    title: 'deleteBtn 노출 조건',
                    desc: 'deleteBtn prop이 true(기본값)이더라도 아래 조건을 모두 만족할 때만 노출됩니다.',
                    bulletList: [
                        '값이 입력되어 있을 것 (!!value)',
                        'disabled 상태가 아닐 것',
                        'password 타입이 아닐 것',
                    ],
                },
                {
                    title: 'password 타입',
                    desc: 'eye / eye_off 아이콘으로 비밀번호 표시 토글을 지원합니다. success / error 상태 아이콘과 함께 우측에 나란히 표시됩니다.',
                },
                {
                    title: 'search 타입',
                    desc: 'status prop이 무시되며, 좌측 search 아이콘 + 우측 mic 아이콘이 고정으로 표시됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
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