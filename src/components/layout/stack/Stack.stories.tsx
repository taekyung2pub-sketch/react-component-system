import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Button } from '../../common/button/Button';
import { Badge } from '../../common/badge/Badge';
import { Checkbox } from '../../form/checkbox/Checkbox';
import { Radio } from '../../form/radio/Radio';
import { Ratio } from '../../display/ratio/Ratio';
import { Toggle } from '../../form/toggle/Toggle';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Stack',
        desc: '요소를 가로/세로로 정렬하는 레이아웃 컴포넌트. flex와 grid 두 가지 모드를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '반복되는 flex/grid 레이아웃을 일관되게 처리합니다.',
            bulletList: [
                'Radio, Checkbox 등 폼 요소 그룹 정렬',
                'Badge, Button 등 인라인 요소 가로 나열',
                '카드, 상품 이미지 등 균등 grid 배치',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'columns prop',
                    desc: 'columns를 지정하면 grid layout으로 전환됩니다. grid-template-columns: repeat(n, 1fr)로 균등 분할해 Radio처럼 라벨 길이가 제각각인 요소도 정렬이 일관되게 유지됩니다.',
                },
                {
                    title: 'wrap prop',
                    desc: 'horizontal 방향에서 wrap={true}(기본값)이면 넘칠 경우 자동으로 줄바꿈됩니다. columns 지정 시에는 무시됩니다.',
                },
                {
                    title: 'gap',
                    desc: 'spacing 토큰 키를 그대로 사용합니다. xs(4px) / sm(8px) / md(16px) / lg(24px) / xl(32px) / 2xl(48px)',
                },
            ],
        },
    ],
};

// =========================
// Mock image
// =========================

const MockImg = ({ label }: { label: string }) => (
    <div style={{ width: '100%', height: '100%', background: '#e4e4e7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#a1a1aa' }}>
        {label}
    </div>
);

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Layout/Stack',
    component: Stack,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
            description: '정렬 방향',
            table: { defaultValue: { summary: 'vertical' } },
        },
        gap: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: '요소 간 여백 (spacing 토큰)',
            table: { defaultValue: { summary: 'md' } },
        },
        columns: {
            control: { type: 'number', min: 1, max: 6 },
            description: 'grid 열 수 (지정 시 grid 모드)',
        },
        rowGap: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: '행 간 여백 (sm:8px / md:16px / lg:24px) — gap보다 우선',
        },
        columnGap: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: '열 간 여백 (sm:8px / md:16px / lg:24px) — gap보다 우선',
        },
        wrap: {
            control: 'boolean',
            description: 'horizontal에서 줄바꿈 여부',
            table: { defaultValue: { summary: 'true' } },
        },
    },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        direction: 'vertical',
        gap: 'md',
        children: (
            <>
                <Button size="md" color="gray-dark" fullWidth>Button A</Button>
                <Button size="md" color="gray-dark" variant="outline" fullWidth>Button B</Button>
                <Button size="md" color="gray-dark" variant="soft" fullWidth>Button C</Button>
            </>
        ),
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// vertical — 세로 정렬
// =========================

const subItems = [
    { key: 'terms',     label: '이용약관 동의 (필수)' },
    { key: 'privacy',   label: '개인정보 수집 동의 (필수)' },
    { key: 'marketing', label: '마케팅 수신 동의 (선택)' },
];

const VerticalStory = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>(
        Object.fromEntries(subItems.map(({ key }) => [key, false]))
    );

    const allChecked = subItems.every(({ key }) => checked[key]);

    const handleAll = () => {
        const next = !allChecked;
        setChecked(Object.fromEntries(subItems.map(({ key }) => [key, next])));
    };

    const handleItem = (key: string) => {
        setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{ width: 320 }}>
            <Stack direction="vertical" gap="sm">
                <Checkbox
                    checked={allChecked}
                    label="전체 동의"
                    onChange={handleAll}
                />
                {subItems.map(({ key, label }) => (
                    <Checkbox
                        key={key}
                        checked={checked[key]}
                        label={label}
                        onChange={() => handleItem(key)}
                    />
                ))}
            </Stack>
        </div>
    );
};

export const Vertical: Story = {
    name: 'vertical — 세로 정렬',
    render: () => <VerticalStory />,
};

// =========================
// horizontal — 가로 정렬 + wrap
// =========================

export const Horizontal: Story = {
    name: 'horizontal — 가로 정렬',
    render: () => (
        <div style={{ width: 320 }}>
            <Stack direction="horizontal" gap="sm">
                <Badge color="primary" variant="soft">New</Badge>
                <Badge color="secondary" variant="soft">Sale</Badge>
                <Badge color="gray-dark" variant="outline">Best</Badge>
                <Badge color="primary" variant="filled">Limited</Badge>
                <Badge color="secondary" variant="filled">Hot</Badge>
                <Badge color="gray-light" variant="filled">Free</Badge>
            </Stack>
        </div>
    ),
};

// =========================
// horizontal — Button 그룹
// =========================

export const ButtonGroup: Story = {
    name: 'horizontal — Button 그룹',
    render: () => (
        <div style={{ width: 320 }}>
            <Stack direction="horizontal" gap="sm">
                <Button size="sm" color="gray-dark" variant="outline" fullWidth>취소</Button>
                <Button size="sm" color="gray-dark" fullWidth>확인</Button>
            </Stack>
        </div>
    ),
};

// =========================
// columns — rowGap / columnGap 다르게
// =========================

export const GapControl: Story = {
    name: 'columns — rowGap / columnGap 개별 지정',
    render: () => (
        <div style={{ width: 320 }}>
            <Stack columns={3} rowGap="lg" columnGap="sm">
                {['01', '02', '03', '04', '05', '06'].map((n) => (
                    <Ratio key={n} ratio="1/1" rounded="md">
                        <MockImg label={n} />
                    </Ratio>
                ))}
            </Stack>
        </div>
    ),
};

// =========================
// columns — Radio 그룹 (grid 2열)
// =========================

const RadioGroupStory = () => {
    const [selected, setSelected] = useState('home');
    const options = [
        { label: 'Home',           value: 'home' },
        { label: 'Office',         value: 'office' },
        { label: 'Apartment',      value: 'apartment' },
        { label: "Parent's House", value: 'parents' },
    ];
    return (
        <div style={{ width: 320 }}>
            <Stack columns={2} gap="sm">
                {options.map((opt) => (
                    <Radio
                        key={opt.value}
                        name="stack-radio"
                        value={opt.value}
                        checked={selected === opt.value}
                        label={opt.label}
                        onChange={() => setSelected(opt.value)}
                    />
                ))}
            </Stack>
        </div>
    );
};

export const RadioGrid: Story = {
    name: 'columns — Radio 그룹 2열',
    render: () => <RadioGroupStory />,
};

// =========================
// columns — Ratio 이미지 그리드
// =========================

export const ImageGrid: Story = {
    name: 'columns — Ratio 이미지 그리드',
    render: () => (
        <div style={{ width: 320 }}>
            <Stack columns={3} gap="sm">
                {['01', '02', '03', '04', '05', '06'].map((n) => (
                    <Ratio key={n} ratio="1/1" rounded="md">
                        <MockImg label={n} />
                    </Ratio>
                ))}
            </Stack>
        </div>
    ),
};

// =========================
// vertical — Toggle 리스트
// =========================

export const ToggleList: Story = {
    name: 'vertical — Toggle 리스트',
    render: () => (
        <div style={{ width: 320 }}>
            <Stack direction="vertical" gap="md">
                {['푸시 알림', '이메일 수신', '마케팅 동의'].map((label) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px' }}>{label}</span>
                        <Toggle size="sm" color="primary" />
                    </div>
                ))}
            </Stack>
        </div>
    ),
};