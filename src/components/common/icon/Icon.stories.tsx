import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Icon } from './Icon';
import { IconName } from './IconMap';
import { gray, primary, secondary, semantic } from '@/styles/tokens/color';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Icon',
        desc: 'SVG 아이콘을 color / size token 기반으로 렌더링하는 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '버튼, 헤더, 입력 필드, 네비게이션 등 UI 전반에서 시각적 의미를 보조합니다.',
            bulletList: [
                'Button / TextButton의 leftIcon / rightIcon 슬롯',
                'TextField의 search / mic / eye / 상태 아이콘',
                'Dock 네비게이션 탭 아이콘',
                '단독 아이콘 버튼 (Header actions 등)',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                '아이콘 SVG 파일을 /src/assets/icons/ 에 저장',
                'iconMap.ts 에 등록',
                'Icon 컴포넌트에 name prop으로 사용',
            ],
            diagram: [
                { label: '/src/assets/icons/icon_{name}.svg' },
                { label: 'iconMap.ts 등록', active: true },
                { label: 'Icon name="{name}"', active: true },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '아이콘 파일 저장 규칙',
                    desc: '아이콘은 반드시 아래 규칙을 따릅니다.',
                    bulletList: [
                        '저장 경로: /src/assets/icons/',
                        '파일 확장자: .svg 만 허용',
                        '파일명 형식: icon_{아이콘명}.svg (예: icon_heart.svg, icon_arrow.svg)',
                        'SVG 내부 fill / stroke 값은 반드시 currentColor 로 교체',
                    ],
                },
                {
                    title: 'iconMap 등록 방법',
                    desc: 'iconMap.ts 에서 카테고리 주석 아래 순서대로 등록합니다.',
                    bulletList: [
                        "import HearIcon from '@/assets/icons/icon_heart.svg?react';",
                        "iconMap에 'heart': HeartIcon 형태로 추가",
                        '카테고리는 Navigation / Action / User / Commerce / Delivery / Content / Status / Social / Payment 순서 유지',
                    ],
                },
                {
                    title: 'color 적용 조건',
                    desc: 'color prop이 적용되려면 SVG 파일 내 fill 또는 stroke 속성이 currentColor 여야 합니다. 하드코딩된 색상값이 있으면 color prop이 무시됩니다.',
                },
                {
                    title: 'size 기준',
                    desc: '아이콘 사이즈는 토큰 기반으로 고정되어 있습니다.',
                    bulletList: [
                        'xs: 12px',
                        'sm: 16px',
                        'md: 20px',
                        'lg: 24px',
                        'xl: 32px',
                    ],
                },
                {
                    title: 'rotate',
                    desc: 'rotate prop으로 아이콘을 회전합니다. SVG를 별도로 추가하지 않고 방향 변형이 필요할 때 사용합니다.',
                    bulletList: [
                        'chevron (기본: ↓) — rotate={-90} → >, rotate={90} → <, rotate={180} → ↑',
                        'arrow (기본: ←) — rotate={180} → →',
                    ],
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const allIconNames: IconName[] = [
    'home', 'arrow', 'chevron',
    'search', 'filter', 'edit', 'trash', 'plus', 'minus',
    'cancel', 'cancel_circle', 'check', 'check_circle', 'settings', 'mic',
    'user', 'logout', 'address', 'phone', 'chat', 'headphone',
    'cart', 'bag', 'discount', 'cash', 'card', 'return',
    'box', 'warehouse_filled', 'truck_filled', 'location', 'location_filled',
    'heart', 'heart_filled', 'star', 'bell', 'eye', 'eye_off', 'image', 'calendar',
    'circle', 'warning_circle', 'question',
    'facebook', 'twitter', 'instagram',
    'apple_pay', 'visa', 'mastercard',
];

const meta = {
    title: 'Component/Common/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'select',
            options: allIconNames,
            description: '아이콘 이름 (iconMap에 등록된 key)',
        },
        size: {
            control: 'inline-radio',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'xs:12 / sm:16 / md:20 / lg:24 / xl:32',
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
            description: '아이콘 색상 — SVG의 fill/stroke가 currentColor 여야 적용됨',
        },
        rotate: {
            control: { type: 'number', min: -180, max: 360, step: 45 },
            description: '아이콘 회전 각도 (deg)',
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
// Rotate
// =========================

export const Rotate: Story = {
    name: 'rotate — 방향 변형',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <p style={{ fontSize: '12px', color: gray[500], marginBottom: '8px' }}>chevron — 기본(↓) / -90(→) / 90(←) / 180(↑)</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Icon name="chevron" size="lg" color={gray[700]} />
                    <Icon name="chevron" size="lg" color={gray[700]} rotate={-90} />
                    <Icon name="chevron" size="lg" color={gray[700]} rotate={90} />
                    <Icon name="chevron" size="lg" color={gray[700]} rotate={180} />
                </div>
            </div>
            <div>
                <p style={{ fontSize: '12px', color: gray[500], marginBottom: '8px' }}>arrow — 기본(←) / 180(→) / -90(↑) / 90(↓)</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Icon name="arrow" size="lg" color={gray[700]} />
                    <Icon name="arrow" size="lg" color={gray[700]} rotate={180} />
                    <Icon name="arrow" size="lg" color={gray[700]} rotate={-90} />
                    <Icon name="arrow" size="lg" color={gray[700]} rotate={90} />
                </div>
            </div>
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