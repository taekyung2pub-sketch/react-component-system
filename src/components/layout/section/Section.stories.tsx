import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';
import { gray } from '../../../styles/tokens/color';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Section',
        desc: '페이지 내 콘텐츠 영역을 구분하는 레이아웃 컴포넌트. 좌우 padding과 상하 여백을 일관되게 적용합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '페이지를 의미 있는 단위로 구분하고 콘텐츠 여백을 일관되게 관리합니다.',
            bulletList: [
                '페이지 내 각 정보 블록을 감싸는 기본 단위',
                '섹션 간 시각적 구분 (line, divider)',
                '좌우 padding 16px 일관 적용',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'variant 선택 기준',
                    desc: '콘텐츠 간 구분 강도에 따라 선택합니다.',
                    bulletList: [
                        'default — 여백만으로 구분, 관련성 높은 콘텐츠 사이',
                        'line — 1px 상단 border, 섹션 간 명확한 구분',
                        'divider — spacing.sm(8px) 두께 회색 블록, 성격이 다른 콘텐츠 사이',
                    ],
                },
                {
                    title: 'divider 사용 시 주의',
                    desc: 'divider는 margin: 0 -16px으로 부모 padding을 상쇄해 전체 너비를 채웁니다. 페이지 레이아웃에 padding: 0 16px이 있는 환경에서 정상 동작합니다.',
                },
            ],
        },
    ],
};

// =========================
// Mock content
// =========================

const MockContent = ({ label }: { label: string }) => (
    <div style={{ fontSize: '13px', color: gray[600] }}>{label}</div>
);

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Layout/Section',
    component: Section,
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
            options: ['default', 'line', 'divider'],
            description: 'default — 여백만 / line — 상단 border / divider — 전체 너비 구분선',
            table: { defaultValue: { summary: 'default' } },
        },
        spacing: {
            control: 'inline-radio',
            options: ['md', 'lg'],
            description: '상하 여백 (md — 16px / lg — 24px)',
            table: { defaultValue: { summary: 'md' } },
        },
    },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        variant: 'default',
        spacing: 'md',
        children: <MockContent label="기본 섹션 콘텐츠" />,
    },
    decorators: [(Story) => <div style={{ width: 375, background: '#fff' }}><Story /></div>],
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ width: 375, background: '#fff', padding: '0 16px' }}>
            <Section variant="default">
                <MockContent label="default — 여백만" />
            </Section>
            <Section variant="line">
                <MockContent label="line — 상단 border" />
            </Section>
            <Section variant="divider">
                <MockContent label="divider — 전체 너비 구분선 (spacing.sm)" />
            </Section>
            <Section variant="default">
                <MockContent label="default — 다음 섹션" />
            </Section>
        </div>
    ),
};

// =========================
// Spacing
// =========================

export const Spacing: Story = {
    name: 'spacing',
    render: () => (
        <div style={{ width: 375, background: '#fff' }}>
            <Section variant="line" spacing="md">
                <MockContent label="md — 상하 16px" />
            </Section>
            <Section variant="line" spacing="lg">
                <MockContent label="lg — 상하 24px" />
            </Section>
        </div>
    ),
};