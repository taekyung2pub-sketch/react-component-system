import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
    title: 'Component/Form/Radio',
    component: Radio,
    parameters: { layout: 'centered' },
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
            <Radio name="story-checked-a" value="a" checked={false} label="미선택" onChange={() => {}} />
            <Radio name="story-checked-b" value="b" checked={true} label="선택됨" onChange={() => {}} />
        </div>
    )
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Radio name="story-disabled-a" value="a" checked={false} label="비활성 미선택" disabled onChange={() => {}} />
            <Radio name="story-disabled-b" value="b" checked={true}  label="비활성 선택됨" disabled onChange={() => {}} />
        </div>
    ),
};

// =========================
// Interactive — 그룹 선택
// =========================

const InteractiveStory = () => {
    const options = [
        { label: 'Home',            value: 'home' },
        { label: 'Office',          value: 'office' },
        { label: 'Apartment',       value: 'apartment' },
        { label: "Parent's House",  value: 'parents' },
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