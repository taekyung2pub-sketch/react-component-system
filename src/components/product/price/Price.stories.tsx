import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Price',
        desc: '상품 가격을 표시하는 컴포넌트. 기본형과 할인형을 지원하며 통화별 포맷을 자동으로 처리합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '상품 목록, 상품 상세, 주문서 등 가격이 표시되는 모든 영역에서 사용합니다.',
            bulletList: [
                'ProdItem의 상품 카드 가격 (sm/md)',
                '상품 상세 / Docker product variant의 현재가 (lg)',
                'Table의 value slot으로 주문서 금액 표시',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'size 선택 기준',
                    desc: '사용되는 컨텍스트에 따라 size를 선택합니다.',
                    bulletList: [
                        'sm — 목록 아이템, 장바구니, 주문 현황',
                        'md — 상품 카드, 일반 가격 표시',
                        'lg — 상품 상세, 주문서 합계',
                    ],
                },
                {
                    title: '할인율 자동 계산',
                    desc: 'discount variant에서 discountRate를 전달하지 않으면 price와 originalPrice로 자동 계산합니다.',
                },
                {
                    title: '통화 포맷',
                    desc: '통화별로 locale과 기호 위치가 자동 적용됩니다.',
                    bulletList: [
                        'USD — $1,190 (기호 앞)',
                        'KRW — 1,190원 (기호 뒤, ko-KR locale)',
                    ],
                },
                {
                    title: '좌측 정렬',
                    desc: 'discount variant에서 할인율 + 현재가(TopRow)와 원가(OriginalPrice)가 좌측 정렬로 쌓입니다. TopRow는 flex-wrap으로 공간 부족 시 줄바꿈됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Product/Price',
    component: Price,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
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
        currency: 'USD',
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