import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Floating } from './Floating';
import { Button } from '@/components/common/button/Button';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Floating',
        desc: '화면 우측 하단에 고정되는 플로팅 버튼 컴포넌트. go-top 버튼과 최근 본 상품을 세로로 쌓아 표시합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '스크롤이 있는 모든 페이지에서 사용합니다.',
            bulletList: [
                '스크롤 시 하단에서 슬라이드 업 되는 go-top 버튼',
                '최근 본 상품 썸네일 (recentProduct 있을 때만 노출)',
                'top: 0 이면 go-top 버튼 자동 숨김',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'go-top 자동 표시/숨김',
                    desc: 'window.scrollY > 0 이면 버튼이 아래에서 위로 슬라이드업 되며 나타납니다. top: 0으로 돌아오면 자동으로 사라집니다.',
                },
                {
                    title: 'recentProduct',
                    desc: '최근 본 상품 1개를 { id, imageSrc, name } 형태로 전달합니다. 없으면 노출되지 않습니다. 클릭 시 onRecentClick 콜백이 호출됩니다.',
                },
                {
                    title: '스토리북 주의',
                    desc: '스토리북 iframe 내에서는 window.scroll 이벤트가 발생하지 않아 go-top 버튼이 자동으로 나타나지 않습니다. Interactive 스토리에서 onTopClick prop으로 visible 상태를 강제 노출해 확인합니다.',
                },
            ],
        },
    ],
};

// =========================
// Mock
// =========================

const mockProduct = {
    id: 1,
    imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    name: 'Regular Fit Slogan',
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Layout/Floating',
    component: Floating,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        right: {
            control: 'text',
            description: '우측 여백',
            table: { defaultValue: { summary: '16px' } },
        },
        bottom: {
            control: 'text',
            description: '하단 여백',
            table: { defaultValue: { summary: '48px' } },
        },
    },
} satisfies Meta<typeof Floating>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default — go-top only
// =========================

export const Default: Story = {
    name: 'go-top only',
    render: () => (
        <div style={{ width: 375, height: 200, position: 'relative', background: '#f4f4f5', borderRadius: '12px' }}>
            <p style={{ padding: '16px', fontSize: '13px', color: '#71717a' }}>스크롤 없음 → go-top 버튼 숨김 상태</p>
            <Floating bottom="16px" right="16px" />
        </div>
    ),
};

// =========================
// With Recent Product
// =========================

export const WithRecent: Story = {
    name: 'with recent product',
    render: () => (
        <div style={{ width: 375, height: 200, position: 'relative', background: '#f4f4f5', borderRadius: '12px' }}>
            <p style={{ padding: '16px', fontSize: '13px', color: '#71717a' }}>최근 본 상품만 노출 (go-top은 스크롤 시 나타남)</p>
            <Floating
                bottom="16px"
                right="16px"
                recentProduct={mockProduct}
                onRecentClick={(p) => alert(`${p.name} 클릭`)}
            />
        </div>
    ),
};

// =========================
// Interactive — visible 시뮬레이션
// =========================

const InteractiveStory = () => {
    const [showRecent, setShowRecent] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 375 }}>
            <Button
                size="sm"
                color="gray-dark"
                variant={showRecent ? 'filled' : 'outline'}
                onClick={() => setShowRecent(v => !v)}
            >
                {showRecent ? '최근 상품 숨기기' : '최근 상품 추가'}
            </Button>
            <div style={{ width: '100%', height: 240, background: '#f4f4f5', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ padding: '16px', fontSize: '13px', color: '#71717a' }}>
                    go-top은 onTopClick prop으로 visible 강제 노출
                    <p style={{ fontSize: '12px', marginTop: '4px', color: '#a1a1aa' }}>
                        실제 앱에서는 스크롤 시 go-top이 자동으로 나타납니다.
                    </p>
                </div>
                <Floating
                    bottom="16px"
                    right="16px"
                    recentProduct={showRecent ? mockProduct : undefined}
                    onRecentClick={(p) => alert(`${p.name} 클릭`)}
                />
            </div>
        </div>
    );
};

export const Interactive: Story = {
    name: 'interactive — 상태 시뮬레이션',
    render: () => <InteractiveStory />,
};