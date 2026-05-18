import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Icon } from './Icon';
import { IconName } from './iconMap';
import { gray, primary, secondary, semantic } from '../../../styles/tokens/color';

// =========================
// Meta
// =========================

const allIconNames: IconName[] = [
    // Navigation
    'home', 'arrow', 'chevron',
    // Action
    'search', 'filter', 'edit', 'trash', 'plus', 'minus',
    'cancel', 'cancel_circle', 'check', 'check_circle', 'settings', 'mic',
    // User
    'user', 'logout', 'address', 'phone', 'chat', 'headphone',
    // Commerce
    'cart', 'bag', 'discount', 'cash', 'card', 'return',
    // Delivery
    'box', 'warehouse_filled', 'truck_filled', 'location', 'location_filled',
    // Content
    'heart', 'heart_filled', 'star', 'bell', 'eye', 'eye_off', 'image', 'calendar',
    // Status
    'circle', 'warning_circle', 'question',
    // Social
    'facebook', 'twitter', 'instagram',
    // Payment
    'apple_pay', 'visa', 'mastercard',
];

const meta = {
    title: 'Component/Common/Icon',
    component: Icon,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'select',
            options: allIconNames,
            description: '아이콘 이름',
        },
        size: {
            control: 'inline-radio',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: '아이콘 사이즈',
            table: { defaultValue: { summary: 'md' } },
        },
        color: {
            control: 'select',
            options: [
                gray[900], gray[700], gray[500], gray[400], gray[300],
                primary[1], primary[2], primary[3],
                secondary[1], secondary[2], secondary[3],
                semantic.success, semantic.warning, semantic.error, semantic.info,
            ],
            description: '아이콘 색상 — 컬러 토큰만 허용 (SVG fill이 currentColor여야 적용됨)',
        },
    },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        name: 'heart',
        size: 'md',
    },
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Icon name="heart" size="xs" />
            <Icon name="heart" size="sm" />
            <Icon name="heart" size="md" />
            <Icon name="heart" size="lg" />
            <Icon name="heart" size="xl" />
        </div>
    ),
};

// =========================
// Color
// =========================

export const Color: Story = {
    name: 'color',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon name="heart" size="lg" color={gray[900]} />
            <Icon name="heart" size="lg" color={gray[500]} />
            <Icon name="heart" size="lg" color={gray[300]} />
            <Icon name="heart" size="lg" color={primary[1]} />
            <Icon name="heart" size="lg" color={primary[2]} />
            <Icon name="heart" size="lg" color={secondary[1]} />
            <Icon name="heart" size="lg" color={semantic.success} />
            <Icon name="heart" size="lg" color={semantic.warning} />
            <Icon name="heart" size="lg" color={semantic.error} />
            <Icon name="heart" size="lg" color={semantic.info} />
        </div>
    ),
};

// =========================
// All Icons
// =========================

export const AllIcons: Story = {
    name: 'all icons',
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', width: '480px' }}>
            {allIconNames.map((name) => (
                <div
                    key={name}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                >
                    <Icon name={name} size="md" color={gray[700]} />
                    <span style={{ fontSize: '9px', color: gray[500], textAlign: 'center', wordBreak: 'break-all' }}>
            {name}
          </span>
                </div>
            ))}
        </div>
    ),
};