import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Radio',
        desc: '같은 그룹 내에서 하나만 선택할 수 있는 입력 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '여러 옵션 중 하나만 선택해야 하는 상황에서 사용합니다.',
            bulletList: [
                '저장된 주소 목록에서 배송지 선택',
                '결제 수단 선택',
                '옵션 단일 선택',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'name으로 그룹핑',
                    desc: '같은 name을 가진 Radio끼리 하나의 그룹으로 묶입니다. name이 다르면 독립적으로 동작하므로 그룹 단위로 동일한 name을 반드시 지정해야 합니다.',
                },
                {
                    title: '접근성',
                    desc: 'useId로 자동 생성된 id와 htmlFor로 label-input이 연결됩니다. label 클릭 시 해당 라디오가 선택됩니다.',
                },
                {
                    title: 'controlled 방식',
                    desc: 'checked + onChange로 상위 컴포넌트에서 선택 상태를 관리합니다. 스토리북에서는 name이 공유되어 그룹이 겹칠 수 있어 스토리별로 name을 다르게 지정합니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Radio',
    component: Radio,
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
            description: '라디오 그룹명 (같은 name끼리 단일 선택)',
        },
        value: {
            control: 'text',
            description: '라디오 값',
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

const DefaultStory = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Radio
            name="story-default"
            value="option"
            checked={checked}
            label="Label"
            onChange={() => setChecked((prev) => !prev)}
        />
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
            <Radio name="story-checked-a" value="a" defaultChecked={false} label="미선택" />
            <Radio name="story-checked-b" value="b" defaultChecked={true}  label="선택됨" />
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
            <Radio name="story-disabled-a" value="a" defaultChecked={false} label="비활성 미선택" disabled />
            <Radio name="story-disabled-b" value="b" defaultChecked={true}  label="비활성 선택됨" disabled />
        </div>
    ),
};

// =========================
// Interactive — 그룹 선택
// =========================

const InteractiveStory = () => {
    const options = [
        { label: 'Home',           value: 'home' },
        { label: 'Office',         value: 'office' },
        { label: 'Apartment',      value: 'apartment' },
        { label: "Parent's House", value: 'parents' },
    ];
    const [selected, setSelected] = useState('home');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((opt) => (
                <Radio
                    key={opt.value}
                    name="story-address"
                    value={opt.value}
                    checked={selected === opt.value}
                    label={opt.label}
                    onChange={() => setSelected(opt.value)}
                />
            ))}
        </div>
    );
};

export const Interactive: Story = {
    name: 'interactive — 그룹 선택',
    render: () => <InteractiveStory />,
};