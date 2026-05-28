import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Ratio } from './Ratio';
import { size } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Ratio',
        desc: 'aspect-ratio 기반으로 비율을 고정하는 이미지/콘텐츠 컨테이너 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '이미지, 배너, 카드 썸네일 등 고정 비율이 필요한 모든 콘텐츠 영역에 사용합니다.',
            bulletList: [
                '상품 이미지 썸네일 (1/1, 3/4)',
                '띠배너, 이벤트 배너 (16/9, 2/1, 21/9)',
                'ProdItem의 이미지 영역 래퍼',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'width prop',
                    desc: 'size 토큰 키만 허용합니다. 미지정 시 부모 너비 100%를 채웁니다.',
                    bulletList: [
                        '2xs: 40px — 주문 목록 아이템 썸네일',
                        'xs: 56px — 소형 상품 이미지',
                        'sm: 80px — 가로형 ProdItem',
                        'md: 120px — 세로형 ProdItem',
                        'lg: 160px — 상품 상세',
                        'full: 100% — 배너, 전체 너비',
                    ],
                },
                {
                    title: 'children 구조',
                    desc: 'Inner가 position: absolute; inset: 0으로 콘텐츠를 꽉 채웁니다. img 태그는 자동으로 object-fit: cover가 적용됩니다.',
                },
                {
                    title: 'ratio 선택 기준',
                    desc: '용도에 따라 적합한 ratio를 선택합니다.',
                    bulletList: [
                        '1/1 — 상품 이미지, 아바타',
                        '3/4 — 세로형 상품 카드',
                        '4/3 — 가로형 카드',
                        '16/9 — 영상 썸네일, 띠배너',
                        '2/1 — 이벤트 배너',
                        '21/9 — 와이드 배너',
                    ],
                },
            ],
        },
    ],
};

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
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
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