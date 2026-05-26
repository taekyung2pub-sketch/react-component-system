import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Toggle',
        desc: 'on/off 상태를 전환하는 스위치 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '즉각적인 설정 변경이 필요한 단일 on/off 상황에서 사용합니다.',
            bulletList: [
                '알림, 테마, 설정 등 즉시 반영되는 스위치',
                '필터, 옵션의 활성/비활성 전환',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '상태 관리',
                    desc: '내부 useState로 on/off를 관리합니다. defaultChecked로 초기 상태를 지정하고 onChange로 변경 이벤트를 외부에서 수신합니다.',
                },
                {
                    title: 'color — on 상태에만 적용',
                    desc: 'color prop은 on 상태일 때 track 배경색에 적용됩니다. off 상태는 항상 gray[300]으로 고정됩니다.',
                    bulletList: [
                        'gray — gray[700]',
                        'primary — primary[2]',
                        'secondary — secondary[2]',
                    ],
                },
                {
                    title: 'size 기준',
                    desc: '버튼 사이즈 토큰 기준으로 높이가 결정됩니다.',
                    bulletList: [
                        'xs — 24px (버튼 xs와 동일)',
                        'sm — 32px (버튼 sm과 동일)',
                    ],
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Toggle',
    component: Toggle,
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
            options: ['xs', 'sm'],
            description: '사이즈 (xs — 24px / sm — 32px)',
            table: { defaultValue: { summary: 'sm' } },
        },
        color: {
            control: 'inline-radio',
            options: ['gray', 'primary', 'secondary'],
            description: '색상 (on 상태일 때 적용)',
            table: { defaultValue: { summary: 'primary' } },
        },
        defaultChecked: {
            control: 'boolean',
            description: '초기 on/off 여부',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        size: 'sm',
        color: 'primary',
        defaultChecked: false,
        disabled: false,
    },
};

// =========================
// Size
// =========================

export const Size: Story = {
    name: 'size',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Toggle size="xs" />
            <Toggle size="sm" />
        </div>
    ),
};

// =========================
// Color
// =========================

export const Color: Story = {
    name: 'color',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Toggle color="gray"      defaultChecked />
            <Toggle color="primary"   defaultChecked />
            <Toggle color="secondary" defaultChecked />
        </div>
    ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Toggle disabled defaultChecked={false} />
            <Toggle disabled defaultChecked={true} />
        </div>
    ),
};