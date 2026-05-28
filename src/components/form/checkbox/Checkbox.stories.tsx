import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Checkbox',
        desc: '단일 항목의 선택/해제를 처리하는 입력 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '사용자가 하나 이상의 항목을 독립적으로 선택할 때 사용합니다.',
            bulletList: [
                '주소 등록 화면의 기본 주소 설정',
                '약관 동의, 옵션 선택 등 단일 토글',
                '다중 선택 필터, 목록 선택',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '접근성',
                    desc: 'useId로 자동 생성된 id와 htmlFor로 label-input이 연결됩니다. label 클릭 시 체크박스가 토글됩니다.',
                },
                {
                    title: 'controlled / uncontrolled',
                    desc: 'checked + onChange로 controlled 방식, defaultChecked로 uncontrolled 방식을 선택할 수 있습니다. 시각적 상태 확인용 스토리에는 defaultChecked를 사용합니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
            description: 'input name',
        },
        label: {
            control: 'text',
            description: '라벨 텍스트',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

const DefaultStory = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Checkbox checked={checked} label="Label" onChange={() => setChecked((prev) => !prev)} />
    );
};

export const Default: Story = {
    render: () => <DefaultStory />,
};

// =========================
// Checked
// =========================

export const Checked: Story = {
    name: 'checked',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Checkbox defaultChecked={false} label="미선택" />
            <Checkbox defaultChecked={true}  label="선택됨" />
        </div>
    ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Checkbox defaultChecked={false} label="비활성 미선택" disabled />
            <Checkbox defaultChecked={true}  label="비활성 선택됨" disabled />
        </div>
    ),
};

// =========================
// Interactive
// =========================

const InteractiveStory = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Checkbox
            checked={checked}
            label="Make this as a default address"
            onChange={() => setChecked((prev) => !prev)}
        />
    );
};

export const Interactive: Story = {
    name: 'interactive — 토글',
    render: () => <InteractiveStory />,
};