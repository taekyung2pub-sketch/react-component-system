import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
    title: 'Component/Form/Checkbox',
    component: Checkbox,
    parameters: { layout: 'centered' },
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
        <Checkbox
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
            <Checkbox checked={false} label="미선택" onChange={() => {}} />
            <Checkbox checked={true}  label="선택됨" onChange={() => {}} />
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
            <Checkbox checked={false} label="비활성 미선택" disabled onChange={() => {}} />
            <Checkbox checked={true}  label="비활성 선택됨" disabled onChange={() => {}} />
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