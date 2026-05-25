import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Product/Rating',
    component: Rating,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['input', 'display', 'summary'],
            description: 'input — 클릭 입력 / display — 읽기 전용 / summary — 평점+텍스트',
            table: { defaultValue: { summary: 'display' } },
        },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'sm — 리뷰 목록 / md — 리뷰 입력 / lg — 리뷰 상단',
            table: { defaultValue: { summary: 'md' } },
        },
        value: {
            control: { type: 'number', min: 0, max: 5, step: 0.5 },
            description: '현재 평점 (0 ~ 5)',
            table: { defaultValue: { summary: '0' } },
        },
        reviewCount: {
            control: { type: 'number' },
            description: '총 리뷰 수 (summary variant)',
        },
        outOf: {
            control: { type: 'number' },
            description: '총점 (summary variant)',
            table: { defaultValue: { summary: '5' } },
        },
    },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'display',
        size: 'md',
        value: 4,
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>display — 읽기 전용</span>
                <Rating variant="display" size="md" value={4} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>input — 클릭 입력</span>
                <Rating variant="input" size="md" value={0} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>summary — 평점 텍스트</span>
                <Rating variant="summary" size="md" value={4.5} reviewCount={1034} />
            </div>
        </div>
    ),
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#71717a' }}>{s}</span>
                    <Rating variant="display" size={s} value={4} />
                </div>
            ))}
        </div>
    ),
};

// =========================
// Display — 평점별
// =========================

export const Display: Story = {
    name: 'display — 평점별',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[5, 4, 3, 2, 1].map((v) => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Rating variant="display" size="sm" value={v} />
                    <span style={{ fontSize: '11px', color: '#71717a' }}>{v}점</span>
                </div>
            ))}
        </div>
    ),
};

// =========================
// Input — 클릭 입력
// =========================

const InputStory = () => {
    const [value, setValue] = React.useState(0);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Rating variant="input" size="lg" value={value} onChange={setValue} />
            <span style={{ fontSize: '12px', color: '#71717a' }}>
        {value === 0 ? '별을 클릭해서 평점을 남겨보세요' : `${value}점`}
      </span>
        </div>
    );
};

export const Input: Story = {
    name: 'input — 클릭 입력',
    render: () => <InputStory />,
};

// =========================
// Summary
// =========================

export const Summary: Story = {
    name: 'summary',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>기본 (onPress 없음)</span>
                <Rating variant="summary" size="md" value={4.5} reviewCount={1034} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>onPress — underline + pointer</span>
                <Rating variant="summary" size="md" value={4.5} reviewCount={45} onPress={() => alert('리뷰 보기')} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>sm — 버튼 안 조합용</span>
                <Rating variant="summary" size="sm" value={4.5} />
            </div>
        </div>
    ),
};