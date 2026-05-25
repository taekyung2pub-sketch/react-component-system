import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { primary, semantic } from '../../../styles/tokens/color';
import { Button } from '../../common/button/Button';
import { Price } from '../../product/price/Price';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Table',
        desc: '라벨과 값을 양쪽으로 나열하는 정보 표시 컴포넌트. 주문 정보, 상품 요약, 가격 정리 등에 사용합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '키-값 구조의 정보를 좌우 정렬로 깔끔하게 표현합니다.',
            bulletList: [
                '주문서 / 결제 확인 화면의 금액 정리',
                '상품 상세의 배송비, 세금, 합계 표시',
                '주문 목록 아이템의 상태 + 액션 버튼 조합',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'rows — label / value 쌍의 배열로 데이터 전달',
                'label / value는 ReactNode라 텍스트 외 컴포넌트 삽입 가능 (slot)',
                'footer 지정 시 점선 구분선 + 합계 영역 자동 렌더링',
                'labelColor / valueColor로 행별 색상 개별 지정 가능',
            ],
            diagram: [
                { label: 'Table', active: true },
                {
                    nodes: [
                        { label: 'label (ReactNode)', active: true },
                        { label: 'value (ReactNode)', active: true },
                    ],
                },
                { label: 'footer (optional)' },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'value slot 활용',
                    desc: 'value는 ReactNode를 받기 때문에 Price, Button, Badge 등 어떤 컴포넌트도 삽입할 수 있습니다.',
                },
                {
                    title: 'Row 정렬',
                    desc: 'label은 flex-start(상단) 정렬이라 value가 2줄 이상으로 늘어나도 label이 상단에 고정됩니다. Price discount variant처럼 2줄 값과 함께 써도 일관성이 유지됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Table',
    component: Table,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
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

// =========================
// With Price (주문서)
// =========================

export const WithPrice: Story = {
    name: 'slot — Price (주문서)',
    render: () => (
        <div style={{ width: 320 }}>
            <Table
                rows={[
                    { label: 'Bershka Mom Jeans', value: <Price size="sm" variant="discount" price={1190} currency="KRW" /> },
                    { label: '배송비',             value: <Price size="sm" price={3000} currency="KRW" /> },
                    { label: '세금',               value: <Price size="sm" price={500}  currency="KRW" /> },
                ]}
                footer={{
                    label: 'Total',
                    value: <Price size="md" price={4690} currency="KRW" />,
                }}
            />
        </div>
    ),
};