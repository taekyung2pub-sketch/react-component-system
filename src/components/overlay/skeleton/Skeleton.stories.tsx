import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Overlay/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        $width: {
            control: 'text',
            description: '가로 너비 (px, % 등)',
            table: { defaultValue: { summary: '100%' } },
        },
        $height: {
            control: 'text',
            description: '세로 높이 (px, % 등)',
            table: { defaultValue: { summary: '16px' } },
        },
        $variant: {
            control: 'inline-radio',
            options: ['rect', 'circle'],
            description: '형태 (rect — 사각형 / circle — 원형)',
            table: { defaultValue: { summary: 'rect' } },
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        $width: '300px',
        $height: '16px',
        $variant: 'rect',
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Skeleton $width="120px" $height="16px" $variant="rect" />
            <Skeleton $width="48px" $height="48px" $variant="circle" />
        </div>
    ),
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
            <Skeleton $height="12px" />
            <Skeleton $height="16px" />
            <Skeleton $height="20px" />
            <Skeleton $width="200px" $height="120px" />
        </div>
    ),
};

// =========================
// Combination — 상품 카드
// =========================

export const ProductCard: Story = {
    name: 'combination — 상품 카드',
    render: () => (
        <div style={{
            width: '160px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <Skeleton $width="160px" $height="160px" />
            <Skeleton $width="80%" $height="14px" />
            <Skeleton $width="50%" $height="14px" />
            <Skeleton $width="60%" $height="16px" />
        </div>
    ),
};

// =========================
// Combination — 목록 아이템
// =========================

export const ListItem: Story = {
    name: 'combination — 목록 아이템',
    render: () => (
        <div style={{ width: '343px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Skeleton $width="48px" $height="48px" $variant="circle" />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Skeleton $width="60%" $height="14px" />
                        <Skeleton $width="90%" $height="12px" />
                    </div>
                </div>
            ))}
        </div>
    ),
};