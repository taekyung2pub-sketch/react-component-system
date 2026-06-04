import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { Button } from '@/components/common/button/Button';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout.tsx';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Textarea',
        desc: '여러 줄 텍스트를 입력받는 컴포넌트. 고정 높이와 글자 수 카운터를 지원합니다.',
    },
    sections: [
        {
            type: 'role',
            description: '한 줄 이상의 자유 형식 텍스트가 필요한 입력 영역에 사용합니다.',
            bulletList: [
                '리뷰 작성 화면의 본문 입력',
                '문의, 요청사항 등 긴 텍스트 입력',
                '댓글 입력 영역',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '상태 관리 — uncontrolled (기본)',
                    desc: '입력값은 내부 useState로 관리합니다. onValueChange / shouldClear를 사용하지 않으면 기존과 동일하게 동작합니다.',
                },
                {
                    title: 'onValueChange',
                    desc: '값이 변경될 때마다 외부에 현재 값을 전달합니다. 외부에서 값을 읽어야 할 때 사용합니다. (예: 댓글 달기 버튼 활성화, 제출 처리)',
                },
                {
                    title: 'shouldClear',
                    desc: '외부에서 입력값을 초기화할 때 사용합니다. false → true로 바뀌는 순간 내부 value가 빈 문자열로 리셋됩니다. 사용 후 반드시 false로 되돌려야 합니다.',
                    bulletList: [
                        'setShouldClear(true) → setTimeout(() => setShouldClear(false), 0) 패턴으로 사용',
                    ],
                },
                {
                    title: 'height 고정',
                    desc: 'height prop(px)으로 높이를 고정하며 resize는 비활성화되어 있습니다. 기본값은 120px입니다.',
                },
                {
                    title: 'maxLength 카운터',
                    desc: 'maxLength를 지정하면 우측 하단에 현재/최대 글자 수 카운터가 표시됩니다. 미지정 시 카운터가 노출되지 않습니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Form/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'placeholder 텍스트',
        },
        height: {
            control: { type: 'number', min: 80, max: 400, step: 8 },
            description: '고정 높이 (px)',
            table: { defaultValue: { summary: '120' } },
        },
        maxLength: {
            control: { type: 'number', min: 10, max: 1000 },
            description: '최대 글자수 (지정 시 카운터 표시)',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        placeholder: 'Write your review...',
        height: 120,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// =========================
// Height
// =========================

export const Height: Story = {
    name: 'height',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
            <Textarea placeholder="height 80" height={80} />
            <Textarea placeholder="height 120 (default)" height={120} />
            <Textarea placeholder="height 200" height={200} />
        </div>
    ),
};

// =========================
// Counter
// =========================

export const Counter: Story = {
    name: 'counter',
    render: () => (
        <div style={{ width: 320 }}>
            <Textarea placeholder="최대 200자까지 입력 가능합니다." maxLength={200} />
        </div>
    ),
};

// =========================
// onValueChange — 외부 값 연동
// =========================

const OnValueChangeStory = () => {
    const [value, setValue] = useState('');
    const [shouldClear, setShouldClear] = useState(false);

    const handleSubmit = () => {
        if (!value.trim()) return;
        alert(`제출: "${value}"`);
        setShouldClear(true);
        setTimeout(() => setShouldClear(false), 0);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 320 }}>
            <Textarea
                placeholder="내용을 입력하세요... (최대 100자)"
                maxLength={100}
                onValueChange={setValue}
                shouldClear={shouldClear}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#71717a' }}>현재 값: "{value}"</span>
                <Button size="sm" color="gray-dark" disabled={!value.trim()} onClick={handleSubmit}>
                    제출
                </Button>
            </div>
        </div>
    );
};

export const OnValueChange: Story = {
    name: 'onValueChange + shouldClear',
    render: () => <OnValueChangeStory />,
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
    name: 'disabled',
    render: () => (
        <div style={{ width: 320 }}>
            <Textarea disabled placeholder="disabled" />
        </div>
    ),
};