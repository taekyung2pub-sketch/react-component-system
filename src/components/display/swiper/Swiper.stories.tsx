import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Swiper } from './Swiper';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Swiper',
        desc: '가로 스와이프 슬라이더 컴포넌트. 인디케이터 variant와 auto 자유 스크롤 모드를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '이미지 배너, 상품 목록, 카테고리 카드 등 가로로 슬라이드되는 콘텐츠 영역에 사용합니다.',
            bulletList: [
                '메인 홈 배너 슬라이더 (dot / paging-control)',
                '상품 상세 이미지 슬라이더 (basic / dot)',
                '가로 스크롤 상품 목록 (slideWidth auto 모드)',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'variant별 인디케이터',
                    desc: '인디케이터 유형을 variant로 선택합니다.',
                    bulletList: [
                        'basic — 인디케이터 없음',
                        'dot — 하단 dot, 현재 슬라이드 가로로 늘어남',
                        'paging — 하단 n/n 텍스트',
                        'paging-control — ← n/n → + play/pause 버튼',
                    ],
                },
                {
                    title: 'slideWidth — auto 모드',
                    desc: 'slideWidth(px)를 지정하면 슬라이드가 고정 너비로 여러 개 보이는 자유 스크롤 모드로 전환됩니다. 인디케이터 없이 overflow-x: auto 기반으로 동작합니다.',
                },
                {
                    title: 'peekNext',
                    desc: '다음 슬라이드를 gap 값만큼 살짝 노출해 스와이프 가능함을 시각적으로 유도합니다.',
                },
                {
                    title: '드래그 / 터치',
                    desc: '마우스 드래그와 터치 스와이프를 모두 지원합니다. 40px 이상 이동 시 슬라이드가 전환됩니다.',
                },
            ],
        },
    ],
};

// =========================
// Sample slides
// =========================

const colors = ['#7c8ea3', '#b08b6b', '#6f8a7a', '#a1a1aa', '#d6a45d', '#c46b6b'];
const labels = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6'];

const mockSlides = colors.map((color, i) => (
    <div
        key={i}
        style={{
            height: '160px',
            borderRadius: '12px',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 600,
        }}
    >
        {labels[i]}
    </div>
));

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Display/Swiper',
    component: Swiper,
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
            options: ['basic', 'dot', 'paging', 'paging-control'],
            description: '인디케이터 variant',
            table: { defaultValue: { summary: 'basic' } },
        },
        gap: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: '슬라이드 간격',
            table: { defaultValue: { summary: 'md' } },
        },
        peekNext: {
            control: 'boolean',
            description: '다음 슬라이드 살짝 보이기',
            table: { defaultValue: { summary: 'false' } },
        },
        autoPlay: {
            control: 'boolean',
            description: '자동 재생',
            table: { defaultValue: { summary: 'false' } },
        },
        autoPlayInterval: {
            control: { type: 'number', min: 1000, max: 10000, step: 500 },
            description: '자동 재생 간격 (ms)',
            table: { defaultValue: { summary: '3000' } },
        },
        loop: {
            control: 'boolean',
            description: '무한 루프',
            table: { defaultValue: { summary: 'false' } },
        },
        slideWidth: {
            control: { type: 'number' },
            description: '슬라이드 고정 너비 (px) — 지정 시 auto 자유 스크롤 모드',
        },
    },
} satisfies Meta<typeof Swiper>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default — auto 자유 스크롤
// =========================

export const Default: Story = {
    args: {
        slides: mockSlides,
        slideWidth: 100,
        gap: 'sm',
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Auto — slideWidth 100px
// =========================

export const Auto: Story = {
    name: 'auto — slideWidth 100px',
    render: () => (
        <div style={{ width: 320 }}>
            <Swiper slides={mockSlides} slideWidth={100} gap="sm" />
        </div>
    ),
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: 320 }}>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>basic</p>
                <Swiper variant="basic" slides={mockSlides} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>dot</p>
                <Swiper variant="dot" slides={mockSlides} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>paging</p>
                <Swiper variant="paging" slides={mockSlides} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>paging-control</p>
                <Swiper variant="paging-control" slides={mockSlides} loop autoPlay />
            </div>
        </div>
    ),
};

// =========================
// Gap
// =========================

export const Gap: Story = {
    name: 'gap',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: 320 }}>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>sm</p>
                <Swiper variant="dot" gap="sm" slides={mockSlides} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>md</p>
                <Swiper variant="dot" gap="md" slides={mockSlides} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>lg</p>
                <Swiper variant="dot" gap="lg" slides={mockSlides} />
            </div>
        </div>
    ),
};

// =========================
// PeekNext
// =========================

export const PeekNext: Story = {
    name: 'peekNext',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: 320 }}>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>peekNext false</p>
                <Swiper variant="dot" slides={mockSlides} peekNext={false} />
            </div>
            <div>
                <p style={{ fontSize: '12px', color: '#71717a', marginBottom: '8px' }}>peekNext true</p>
                <Swiper variant="dot" slides={mockSlides} peekNext={true} />
            </div>
        </div>
    ),
};

// =========================
// AutoPlay + Loop
// =========================

export const AutoPlay: Story = {
    name: 'autoPlay + loop',
    render: () => (
        <div style={{ width: 320 }}>
            <Swiper variant="paging-control" slides={mockSlides} autoPlay autoPlayInterval={2000} loop />
        </div>
    ),
};