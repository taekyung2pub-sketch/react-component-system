import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { primary, semantic } from '../../../styles/tokens/color';
import { Button } from '../../common/button/Button';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Table',
    component: Table,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default — body only
// =========================

export const Default: Story = {
    args: {
        rows: [
            { label: 'Bershka Mom Jeans', value: '$35' },
            { label: 'Taxes',             value: '$8' },
            { label: 'Shipping',          value: '$5' },
        ],
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// With footer
// =========================

export const WithFooter: Story = {
    name: 'footer',
    args: {
        rows: [
            { label: 'Bershka Mom Jeans', value: '$35' },
            { label: 'Taxes',             value: '$8' },
            { label: 'Shipping',          value: '$5' },
        ],
        footer: {
            label: 'Total',
            value: '$48',
        },
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Custom color
// =========================

export const CustomColor: Story = {
    name: 'custom color',
    args: {
        rows: [
            { label: 'Bershka Mom Jeans', value: '$35' },
            { label: 'Taxes',             value: '$8' },
            { label: 'Shipping',          value: '$5', labelColor: primary[2], valueColor: primary[2] },
        ],
        footer: {
            label: 'Total',
            value: '$48',
            valueColor: semantic.success,
        },
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Slot — value에 컴포넌트 삽입
// =========================

export const Slot: Story = {
    name: 'slot — value에 컴포넌트 삽입',
    args: {
        rows: [
            { label: 'Regular Fit Slogan', value: <Button size="xs" variant="soft" color="gray-dark">Track</Button> },
            { label: 'Regular Fit Polo',   value: <Button size="xs" variant="soft" color="primary">Track</Button> },
        ],
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};