import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Toggle',
    component: Toggle,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['xs', 'sm'],
            description: '사이즈 (xs — 24px / sm — 32px)',
            table: { defaultValue: { summary: 'sm' } },
        },
        color: {
            control: 'inline-radio',
            options: ['gray', 'primary', 'secondary'],
            description: '색상 (on 상태일 때 적용)',
            table: { defaultValue: { summary: 'primary' } },
        },
        defaultChecked: {
            control: 'boolean',
            description: '초기 on/off 여부',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        size: 'sm',
        color: 'primary',
        defaultChecked: false,
        disabled: false,
    },
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Toggle size="xs" />
            <Toggle size="sm" />
        </div>
    ),
};

// =========================
// Color
// =========================

export const Color: Story = {
    name: 'color',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Toggle color="gray"      defaultChecked />
            <Toggle color="primary"   defaultChecked />
            <Toggle color="secondary" defaultChecked />
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
            <Toggle disabled defaultChecked={false} />
            <Toggle disabled defaultChecked={true} />
        </div>
    ),
};