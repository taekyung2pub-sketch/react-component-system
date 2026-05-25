import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Product/Price',
    component: Price,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'sm — 목록 아이템 / md — 상품 카드 / lg — 상세·주문서',
            table: { defaultValue: { summary: 'md' } },
        },
        variant: {
            control: 'inline-radio',
            options: ['default', 'discount'],
            description: '기본형 / 할인형',
            table: { defaultValue: { summary: 'default' } },
        },
        price: {
            control: { type: 'number' },
            description: '현재 가격',
        },
        originalPrice: {
            control: { type: 'number' },
            description: '원가 (discount variant에서 사용)',
        },
        discountRate: {
            control: { type: 'number', min: 0, max: 100 },
            description: '할인율 (미전달 시 price / originalPrice로 자동 계산)',
        },
        currency: {
            control: 'text',
            description: '통화 기호',
            table: { defaultValue: { summary: '$' } },
        },
    },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        size: 'md',
        variant: 'default',
        price: 1190,
        currency: '$',
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>default</span>
                <Price variant="default" price={1190} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>discount</span>
                <Price variant="discount" price={1190} originalPrice={1700} />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{size} — default</span>
                        <Price size={size} variant="default" price={1190} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{size} — discount</span>
                        <Price size={size} variant="discount" price={1190} originalPrice={1700} />
                    </div>
                </div>
            ))}
        </div>
    ),
};

// =========================
// 용도별
// =========================

export const UseCase: Story = {
    name: 'use case',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>상품 카드 (md)</span>
                <Price size="md" variant="discount" price={1190} originalPrice={1700} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>장바구니 / 주문 목록 (sm)</span>
                <Price size="sm" variant="default" price={1190} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>상품 상세 / 주문서 (lg)</span>
                <Price size="lg" variant="discount" price={1190} originalPrice={1700} />
            </div>
        </div>
    ),
};

// =========================
// Currency
// =========================

export const Currency: Story = {
    name: 'currency',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(['USD', 'KRW'] as const).map((c) => (
                <div key={c} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{c} — default</span>
                        <Price size="md" variant="default" price={1190} currency={c} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{c} — discount</span>
                        <Price size="md" variant="discount" price={1190} originalPrice={1700} currency={c} />
                    </div>
                </div>
            ))}
        </div>
    ),
};