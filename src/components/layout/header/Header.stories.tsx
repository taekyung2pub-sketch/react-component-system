import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { gray } from '../../../styles/tokens/color';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Header',
        desc: '앱 상단에 고정되는 헤더 컴포넌트. 화면 유형에 따라 3가지 variant를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '모든 페이지 상단에 위치하며 내비게이션, 타이틀, 액션 버튼을 제공합니다.',
            bulletList: [
                'main — 메인 홈 화면 (로고 + 검색/알림 등 우측 액션)',
                'default — 일반 페이지 (뒤로가기 + 타이틀 + 우측 액션)',
                'back — 뒤로가기만 필요한 화면 (모달, 간단한 서브 페이지)',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                '좌측 Side — 뒤로가기 버튼 또는 로고',
                '중앙 Center — 타이틀 (position absolute로 정확히 중앙 고정)',
                '우측 Side — actions 배열로 유동적으로 아이콘 버튼 추가',
            ],
            diagram: [
                { label: 'Header', active: true },
                {
                    nodes: [
                        { label: '← Back / Logo' },
                        { label: 'Title (center)', active: true },
                        { label: 'Actions →' },
                    ],
                },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '타이틀 중앙 정렬',
                    desc: 'position: absolute + translateX(-50%)로 좌우 버튼 개수에 관계없이 항상 정확히 중앙에 고정됩니다.',
                },
                {
                    title: 'actions prop',
                    desc: '{ icon, onClick } 배열로 전달합니다. 개수에 따라 유동적으로 렌더링되며, 없으면 우측 영역이 비어 좌우 균형을 유지합니다.',
                },
            ],
        },
    ],
};

// =========================
// Mock logo
// =========================

const MockLogo = () => (
    <div style={{ fontSize: '20px', fontWeight: 700, color: '#18181b', letterSpacing: '-0.5px' }}>
        LOGO
    </div>
);

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Layout/Header',
    component: Header,
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
            options: ['main', 'default', 'back'],
            description: 'main — 로고+아이콘 / default — 뒤로가기+타이틀+아이콘 / back — 뒤로가기만',
            table: { defaultValue: { summary: 'default' } },
        },
        title: {
            control: 'text',
            description: '페이지 타이틀 (default variant)',
        },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'default',
        title: 'My Orders',
        actions: [{ icon: 'bell' }],
    },
    decorators: [(Story) => <div style={{ width: 375 }}><Story /></div>],
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 375 }}>
            <div>
                <p style={{ fontSize: '11px', color: '#71717a', marginBottom: '4px' }}>main — 로고 + 우측 아이콘</p>
                <div style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <Header variant="main" logo={<MockLogo />} actions={[{ icon: 'search' }, { icon: 'bell' }]} />
                </div>
            </div>
            <div>
                <p style={{ fontSize: '11px', color: '#71717a', marginBottom: '4px' }}>default — 뒤로가기 + 타이틀 + 우측 아이콘</p>
                <div style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <Header variant="default" title="My Orders" actions={[{ icon: 'bell' }]} />
                </div>
            </div>
            <div>
                <p style={{ fontSize: '11px', color: '#71717a', marginBottom: '4px' }}>default — 우측 아이콘 없음</p>
                <div style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <Header variant="default" title="Details" />
                </div>
            </div>
            <div>
                <p style={{ fontSize: '11px', color: '#71717a', marginBottom: '4px' }}>back — 뒤로가기만</p>
                <div style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <Header variant="back" />
                </div>
            </div>
        </div>
    ),
};

// =========================
// Main
// =========================

export const Main: Story = {
    name: 'main',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 375 }}>
            <div style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                <Header variant="main" logo={<MockLogo />} actions={[{ icon: 'search' }, { icon: 'bell' }]} />
            </div>
            <div style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                <Header variant="main" logo={<MockLogo />} />
            </div>
        </div>
    ),
};

// =========================
// Page header
// =========================

export const PageHeader: Story = {
    name: 'default — 페이지별',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 375 }}>
            {[
                { title: 'My Orders',    actions: [{ icon: 'bell' as const }] },
                { title: 'Search',       actions: [{ icon: 'bell' as const }] },
                { title: 'Order Detail', actions: [] },
                { title: 'Cart',         actions: [{ icon: 'bell' as const }] },
            ].map((p) => (
                <div key={p.title} style={{ border: `1px solid ${gray[200]}`, borderRadius: '8px', overflow: 'hidden' }}>
                    <Header variant="default" title={p.title} actions={p.actions} />
                </div>
            ))}
        </div>
    ),
};