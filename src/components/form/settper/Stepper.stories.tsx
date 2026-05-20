import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Stepper',
    component: Stepper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        min: {
            control: { type: 'number' },
            description: '최솟값',
            table: { defaultValue: { summary: '0' } },
        },
        max: {
            control: { type: 'number' },
            description: '최댓값 (필수)',
            table: { defaultValue: { summary: '10' } },
        },
        defaultValue: {
            control: { type: 'number' },
            description: '초기값',
            table: { defaultValue: { summary: '0' } },
        },
        step: {
            control: { type: 'number', min: 1 },
            description: '증감 단위',
            table: { defaultValue: { summary: '1' } },
        },
    },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        min: 0,
        max: 10,
        defaultValue: 0,
        step: 1,
    },
};

// =========================
// Min / Max 경계
// =========================

export const Boundary: Story = {
    name: 'boundary — min / max 경계',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <Stepper max={10} defaultValue={0} />
            <Stepper max={10} defaultValue={5} />
            <Stepper max={10} defaultValue={10} />
        </div>
    ),
};

// =========================
// Step
// =========================

export const Step: Story = {
    name: 'step',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <Stepper max={10} defaultValue={0} step={1} />
            <Stepper max={20} defaultValue={0} step={2} />
            <Stepper max={100} defaultValue={0} step={10} />
        </div>
    ),
};