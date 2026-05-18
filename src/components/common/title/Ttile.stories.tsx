import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Title } from './Title';
import { gray, primary, secondary, semantic } from '../../../styles/tokens/color';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Common/Title',
    component: Title,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['title01', 'title02', 'title03'],
            description: '타이포그래피 스타일 variant',
            table: { defaultValue: { summary: 'title01' } },
        },
        weight: {
            control: 'inline-radio',
            options: ['regular', 'medium', 'semibold', 'bold'],
            description: 'font-weight 오버라이드 (미지정 시 variant 기본값 사용)',
            table: { defaultValue: { summary: 'variant 기본값' } },
        },
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label'],
            description: '렌더링할 HTML 시맨틱 태그',
            table: { defaultValue: { summary: 'variant에 따라 자동' } },
        },
        color: {
            control: 'select',
            options: [
                gray[900], gray[800], gray[700], gray[600], gray[500],
                gray[400], gray[300], gray[200], gray[100],
                primary[1], primary[2], primary[3],
                secondary[1], secondary[2], secondary[3],
                semantic.success, semantic.warning, semantic.error, semantic.info,
            ],
            description: '텍스트 색상 — 컬러 토큰만 허용',
        },
        ellipsis: {
            control: 'boolean',
            description: '말줄임표 처리 여부',
            table: { defaultValue: { summary: 'false' } },
        },
        maxLines: {
            control: { type: 'number', min: 1, max: 10 },
            description: '최대 줄 수 (ellipsis와 함께 사용, 기본 1줄)',
        },
        align: {
            control: 'inline-radio',
            options: ['left', 'center', 'right'],
            description: '텍스트 정렬',
        },
    },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default — 모든 props 기본값, Controls 테스트용
// =========================

export const Default: Story = {
    args: {
        variant: 'title01',
        children: '타이틀 텍스트 예시입니다.',
    },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
    name: 'variant',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Title variant="title01">title01 — 페이지 대제목</Title>
            <Title variant="title02">title02 — 섹션 제목</Title>
            <Title variant="title03">title03 — 서브 제목</Title>
        </div>
    ),
};

// =========================
// Weight
// =========================

export const Weight: Story = {
    name: 'weight',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Title variant="title01" weight="regular">regular — 페이지 대제목</Title>
            <Title variant="title01" weight="medium">medium — 페이지 대제목</Title>
            <Title variant="title01" weight="semibold">semibold — 페이지 대제목</Title>
            <Title variant="title01" weight="bold">bold — 페이지 대제목</Title>
        </div>
    ),
};

// =========================
// Color
// =========================

export const Color: Story = {
    name: 'color',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Title variant="title02" color={gray[900]}>gray 900 — 섹션 제목</Title>
            <Title variant="title02" color={gray[600]}>gray 600 — 섹션 제목</Title>
            <Title variant="title02" color={gray[400]}>gray 400 — 섹션 제목</Title>
            <Title variant="title02" color={primary[1]}>primary 1 — 섹션 제목</Title>
            <Title variant="title02" color={primary[2]}>primary 2 — 섹션 제목</Title>
            <Title variant="title02" color={secondary[1]}>secondary 1 — 섹션 제목</Title>
            <Title variant="title02" color={semantic.success}>semantic success — 섹션 제목</Title>
            <Title variant="title02" color={semantic.warning}>semantic warning — 섹션 제목</Title>
            <Title variant="title02" color={semantic.error}>semantic error — 섹션 제목</Title>
            <Title variant="title02" color={semantic.info}>semantic info — 섹션 제목</Title>
        </div>
    ),
};

// =========================
// Align
// =========================

export const Align: Story = {
    name: 'align',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 400 }}>
            <Title variant="title02" align="left">left — 섹션 제목</Title>
            <Title variant="title02" align="center">center — 섹션 제목</Title>
            <Title variant="title02" align="right">right — 섹션 제목</Title>
        </div>
    ),
};

// =========================
// Ellipsis
// =========================

export const Ellipsis: Story = {
    name: 'ellipsis',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 300 }}>
            <Title variant="title02" ellipsis>
                1줄 말줄임 — 너무 길어서 한 줄을 초과하면 말줄임표로 처리되는 제목입니다.
            </Title>
            <Title variant="title03" ellipsis maxLines={2}>
                2줄 말줄임 — 두 줄을 초과하면 말줄임표로 처리되는 긴 제목 텍스트입니다. 충분히 긴 내용이 있어야 동작을 확인할 수 있습니다.
            </Title>
            <Title variant="title03" ellipsis maxLines={3}>
                3줄 말줄임 — 세 줄을 초과하면 말줄임표로 처리되는 긴 제목 텍스트입니다. 충분히 긴 내용이 있어야 동작을 확인할 수 있습니다. 조금 더 긴 내용을 추가해봅니다.
            </Title>
        </div>
    ),
};

// =========================
// As (Semantic Tag)
// =========================

export const As: Story = {
    name: 'as',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Title variant="title01" as="h1">h1 — 페이지 대제목</Title>
            <Title variant="title01" as="h2">h2 — 페이지 대제목</Title>
            <Title variant="title01" as="p">p — 페이지 대제목</Title>
            <Title variant="title01" as="span">span — 페이지 대제목</Title>
            <Title variant="title01" as="label">label — 페이지 대제목</Title>
        </div>
    ),
};