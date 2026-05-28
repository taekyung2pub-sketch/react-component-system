import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '@/components/common/button/Button';
import { Title } from '@/components/common/title/Title';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Alert',
        desc: '사용자의 확인이나 선택이 필요한 상황에서 노출되는 모달 컴포넌트.',
    },
    sections: [
        {
            type: 'role',
            description: '화면을 오버레이로 덮고 사용자의 액션을 유도합니다.',
            bulletList: [
                '주문 취소, 삭제 등 되돌릴 수 없는 액션 전 확인',
                '결제 완료, 오류 등 결과 안내',
                '약관 동의, 선택지 제시 등 선택 유도',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'children(Body) — ReactNode로 자유롭게 구성',
                'actions(Footer) — Button 컴포넌트 배열, 최대 2개, 위에서 아래 순서',
                '전체 padding: spacing.lg(24px)',
                'footer 상단 여백: spacing.lg(24px)',
                '버튼 간 여백: spacing.sm(8px)',
            ],
            diagram: [
                { label: 'Alert', active: true },
                { label: 'Body — children (ReactNode)', active: true },
                { label: 'Footer — Button ×1~2' },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'actions 순서',
                    desc: '배열 순서대로 위에서 아래로 렌더링됩니다. 주요 액션을 위에, 취소를 아래에 배치하는 것을 권장합니다.',
                    bulletList: [
                        '1개 — fullWidth filled 버튼',
                        '2개 — 위부터 순서대로 col 배치',
                    ],
                },
                {
                    title: 'Body 자유도',
                    desc: 'children은 ReactNode라 텍스트, 이미지, 커스텀 컴포넌트 등 어떤 구조도 삽입 가능합니다.',
                },
                {
                    title: '오버레이',
                    desc: 'position: fixed로 전체 화면을 덮습니다. 닫기 로직은 actions의 onClick으로 상위 컴포넌트에서 관리합니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Overlay/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default — 확인 1개
// =========================

const DefaultStory = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ width: '500px', height: '500px'}}>
            <Button size="md" color="gray-dark" onClick={() => setOpen(true)}>Alert 열기</Button>
            {open && (
                <Alert actions={[{ label: '확인', onClick: () => setOpen(false) }]}>
                    <Title variant="title03" align="center">알림</Title>
                    <p style={{ fontSize: '14px', color: '#52525b', textAlign: 'center', marginTop: '8px' }}>
                        요청이 처리되었습니다.
                    </p>
                </Alert>
            )}
        </div>
    );
};

export const Default: Story = {
    render: () => <DefaultStory />,
};

// =========================
// 확인 / 취소 2개
// =========================

const ConfirmStory = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ width: '500px', height: '500px'}}>
            <Button size="md" color="error" variant="outline" onClick={() => setOpen(true)}>주문 취소</Button>
            {open && (
                <Alert
                    actions={[
                        { label: '주문 취소', color: 'error', onClick: () => setOpen(false) },
                        { label: '돌아가기', variant: 'outline', color: 'gray-dark', onClick: () => setOpen(false) },
                    ]}
                >
                    <Title variant="title03" align="center">주문을 취소할까요?</Title>
                    <p style={{ fontSize: '14px', color: '#52525b', textAlign: 'center', marginTop: '8px' }}>
                        취소된 주문은 되돌릴 수 없습니다.
                    </p>
                </Alert>
            )}
        </div>
    );
};

export const Confirm: Story = {
    name: 'confirm — 확인 / 취소',
    render: () => <ConfirmStory />,
};

// =========================
// Custom body
// =========================

const CustomBodyStory = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ width: '500px', height: '500px'}}>
            <Button size="md" color="primary" onClick={() => setOpen(true)}>Custom Body</Button>
            {open && (
                <Alert
                    actions={[
                        { label: '동의하고 계속', color: 'primary', onClick: () => setOpen(false) },
                        { label: '취소', variant: 'outline', color: 'gray-dark', onClick: () => setOpen(false) },
                    ]}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Title variant="title03">이용약관 동의</Title>
                        <div style={{
                            background: '#f4f4f5',
                            borderRadius: '8px',
                            padding: '16px',
                            fontSize: '13px',
                            color: '#52525b',
                            lineHeight: '1.6',
                            maxHeight: '120px',
                            overflowY: 'auto',
                        }}>
                            본 서비스를 이용하시려면 이용약관 및 개인정보처리방침에 동의하셔야 합니다.
                            수집된 정보는 서비스 제공 목적으로만 사용됩니다.
                        </div>
                    </div>
                </Alert>
            )}
        </div>
    );
};

export const CustomBody: Story = {
    name: 'custom body',
    render: () => <CustomBodyStory />,
};