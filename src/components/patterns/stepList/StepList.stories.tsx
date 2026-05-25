import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StepList } from './StepList.tsx';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'StepList',
        desc: '단계별 진행 상태를 시각적으로 표현하는 컴포넌트. 가로형 트래커와 세로형 타임라인 두 가지 variant를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '주문 진행 상태, 배송 추적, 온보딩 단계 등 순서가 있는 프로세스를 안내할 때 사용합니다.',
            bulletList: [
                '주문 상태 트래커 — 주문완료 / 처리중 / 배송중 / 배송완료 (horizontal)',
                '배송 추적 타임라인 — 장소 + 시간 정보 포함 (vertical)',
                '온보딩 / 설정 단계 안내',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'horizontal variant',
                    desc: '상단에 dot 트래커, 하단에 번호 + 타이틀 리스트가 분리되어 표시됩니다. dot은 space-between으로 첫/끝이 컨테이너 양 끝에 붙습니다.',
                    bulletList: [
                        'done — primary 색상 채움 dot',
                        'current — 테두리 + 글로우 + 타이틀 bold 강조',
                        'pending — gray dot + 리스트 opacity 0.4',
                    ],
                },
                {
                    title: 'vertical variant',
                    desc: 'dot과 점선 라인이 세로로 연결되고, 우측에 title + desc가 표시됩니다. 라인은 VContent의 padding-bottom까지 포함한 전체 높이를 채웁니다.',
                    bulletList: [
                        'done — primary 색상 채움 dot + primary 점선',
                        'current — 테두리 + 글로우 dot + title bold',
                        'pending — 빈 원 dot + gray 점선 + opacity 0.4',
                    ],
                },
                {
                    title: 'current prop',
                    desc: '0부터 시작하는 인덱스로 현재 활성 스텝을 지정합니다. current 미만은 done, current는 current, 초과는 pending 상태가 됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Sample items
// =========================

const trackingItems = [
    { title: 'Packing',    desc: '2336 Jack Warren Rd, Delta Junction' },
    { title: 'Picked',     desc: '2417 Tongass Ave #111, Ketchikan' },
    { title: 'In Transit', desc: '16 Rr 2, Ketchikan, Alaska 99901' },
    { title: 'Delivered',  desc: '925 S Chugach St #APT 10, Alaska' },
];

const orderItems = [
    { title: 'Order Placed' },
    { title: 'Processing' },
    { title: 'Shipped' },
    { title: 'Delivered' },
];

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Patterns/StepList',
    component: StepList,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
            description: '가로형 / 세로형',
            table: { defaultValue: { summary: 'horizontal' } },
        },
        current: {
            control: { type: 'number', min: 0, max: 3 },
            description: '현재 활성 스텝 인덱스 (0부터)',
            table: { defaultValue: { summary: '0' } },
        },
    },
} satisfies Meta<typeof StepList>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'horizontal',
        items: orderItems,
        current: 2,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: 320 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>horizontal — 가로형</span>
                <StepList variant="horizontal" items={orderItems} current={2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#71717a' }}>vertical — 세로형</span>
                <StepList variant="vertical" items={trackingItems} current={2} />
            </div>
        </div>
    ),
};

// =========================
// Horizontal — current 별
// =========================

export const HorizontalProgress: Story = {
    name: 'horizontal — 진행 단계별',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: 320 }}>
            {[0, 1, 2, 3].map((step) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#71717a' }}>current: {step}</span>
                    <StepList variant="horizontal" items={orderItems} current={step} />
                </div>
            ))}
        </div>
    ),
};

// =========================
// Vertical — title + desc
// =========================

export const VerticalTracking: Story = {
    name: 'vertical — 배송 추적',
    render: () => (
        <div style={{ width: 320 }}>
            <StepList variant="vertical" items={trackingItems} current={2} />
        </div>
    ),
};