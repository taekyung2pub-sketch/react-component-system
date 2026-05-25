import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Ratio } from './Ratio';
import { size } from '../../../styles/tokens/spacing';
import { gray } from '../../../styles/tokens/color';

// =========================
// Mock content
// =========================

const MockImage = ({ label }: { label: string }) => (
    <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: gray[200],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: gray[500],
        fontWeight: 500,
    }}>
        {label}
    </div>
);

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Ratio',
    component: Ratio,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        ratio: {
            control: 'select',
            options: ['1/1', '3/4', '4/3', '16/9', '21/9', '2/1'],
            description: '비율',
            table: { defaultValue: { summary: '1/1' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg', 'full'],
            description: '모서리 둥글기',
        },
        width: {
            control: 'select',
            options: Object.keys(size),
            description: '너비 (size 토큰 키)',
            table: { defaultValue: { summary: '100% (미지정)' } },
        },
    },
} satisfies Meta<typeof Ratio>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        ratio: '1/1',
        rounded: 'md',
        width: 'lg',
        children: <MockImage label="1/1" />,
    },
};

// =========================
// Ratio
// =========================

export const RatioVariant: Story = {
    name: 'ratio',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            {(['1/1', '3/4', '4/3', '16/9', '21/9', '2/1'] as const).map((r) => (
                <div key={r}>
                    <p style={{ fontSize: '11px', color: gray[500], marginBottom: '4px' }}>{r}</p>
                    <Ratio ratio={r} rounded="md">
                        <MockImage label={r} />
                    </Ratio>
                </div>
            ))}
        </div>
    ),
};

// =========================
// 상품 이미지 (1/1)
// =========================

export const ProductImage: Story = {
    name: '상품 이미지 — 1/1',
    render: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            {(['2xs', 'xs', 'sm', 'md', 'lg'] as const).map((w) => (
                <div key={w}>
                    <p style={{ fontSize: '11px', color: gray[500], marginBottom: '4px', textAlign: 'center' }}>{w}<br/>{size[w]}</p>
                    <Ratio ratio="1/1" rounded="md" width={w}>
                        <MockImage label="" />
                    </Ratio>
                </div>
            ))}
        </div>
    ),
};

// =========================
// 세로형 카드 (3/4)
// =========================

export const VerticalCard: Story = {
    name: '세로형 카드 — 3/4',
    render: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            {(['md', 'lg', 'xl'] as const).map((w) => (
                <div key={w}>
                    <p style={{ fontSize: '11px', color: gray[500], marginBottom: '4px', textAlign: 'center' }}>{w}<br/>{size[w]}</p>
                    <Ratio ratio="3/4" rounded="md" width={w}>
                        <MockImage label="3/4" />
                    </Ratio>
                </div>
            ))}
        </div>
    ),
};

// =========================
// 띠배너 (16/9, 2/1, 21/9)
// =========================

export const Banner: Story = {
    name: '띠배너',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            {(['16/9', '2/1', '21/9'] as const).map((r) => (
                <div key={r}>
                    <p style={{ fontSize: '11px', color: gray[500], marginBottom: '4px' }}>{r}</p>
                    <Ratio ratio={r} rounded="md">
                        <MockImage label={r} />
                    </Ratio>
                </div>
            ))}
        </div>
    ),
};

// =========================
// Rounded
// =========================

export const Rounded: Story = {
    name: 'rounded',
    render: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            {(['sm', 'md', 'lg', 'full'] as const).map((r) => (
                <div key={r}>
                    <p style={{ fontSize: '11px', color: gray[500], marginBottom: '4px', textAlign: 'center' }}>{r}</p>
                    <Ratio ratio="1/1" rounded={r} width="xs">
                        <MockImage label="" />
                    </Ratio>
                </div>
            ))}
        </div>
    ),
};