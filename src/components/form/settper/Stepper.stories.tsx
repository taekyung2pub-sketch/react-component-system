import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Stepper',
        desc: '수량이나 값을 — / + 버튼으로 증감하는 입력 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '수량처럼 범위 내에서 단계적으로 값을 조절할 때 사용합니다.',
            bulletList: [
                '장바구니, 주문 화면의 상품 수량 조절',
                '옵션 수량 선택',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'min / max 경계 처리',
                    desc: '값이 min 이하이면 — 버튼이, max 이상이면 + 버튼이 자동으로 disabled 처리됩니다.',
                },
                {
                    title: 'step prop',
                    desc: '기본값은 1이지만 묶음 상품처럼 단위가 다른 경우 step을 지정해 증감 단위를 바꿀 수 있습니다. 기본값 유지 시 동작에 영향 없습니다.',
                },
                {
                    title: 'Button xs 사용',
                    desc: '내부적으로 Button 컴포넌트 xs 사이즈(24px)를 사용합니다. CountText 높이도 24px로 맞춰 세로 정렬이 일관되게 유지됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Stepper',
    component: Stepper,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
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
            <Stepper max={10}  defaultValue={0} step={1} />
            <Stepper max={20}  defaultValue={0} step={2} />
            <Stepper max={100} defaultValue={0} step={10} />
        </div>
    ),
};