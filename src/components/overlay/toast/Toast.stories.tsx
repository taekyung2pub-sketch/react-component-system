import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../../common/button/Button';
import { createDocsPage, type ComponentDocs } from '../../guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'Toast',
        desc: '사용자 액션의 결과를 일시적으로 알려주는 피드백 컴포넌트. 5초 후 자동으로 닫힙니다.',
    },
    sections: [
        {
            type: 'role',
            description: '사용자의 액션 결과를 화면을 가리지 않고 간결하게 전달합니다.',
            bulletList: [
                '장바구니 추가, 주문 완료 등 성공 피드백 (success)',
                '삭제, 취소 등 주의가 필요한 액션 안내 (warning)',
                'API 오류, 네트워크 실패 등 에러 안내 (error)',
                '새 업데이트, 공지 등 정보성 안내 (info)',
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '자동 닫힘',
                    desc: '표시 후 5초가 지나면 onClose 콜백이 호출됩니다. 상위 컴포넌트에서 onClose로 토스트를 목록에서 제거해야 실제로 사라집니다.',
                },
                {
                    title: 'type별 자동 설정',
                    desc: 'type prop만 지정하면 아이콘과 색상이 자동으로 결정됩니다. 별도 커스터마이징 없이 type과 message만 전달하면 됩니다.',
                },
                {
                    title: '여러 개 동시 표시',
                    desc: '배열로 관리하면 여러 토스트를 동시에 쌓아서 표시할 수 있습니다. 각 토스트는 고유 id로 관리하고, onClose에서 해당 id를 제거합니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Overlay/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'inline-radio',
            options: ['success', 'warning', 'error', 'info'],
            description: '토스트 타입 (아이콘 · 색상 자동 결정)',
            table: { defaultValue: { summary: 'success' } },
        },
        position: {
            control: 'inline-radio',
            options: ['top', 'bottom'],
            description: '노출 위치',
            table: { defaultValue: { summary: 'bottom' } },
        },
        message: {
            control: 'text',
            description: '메시지 텍스트',
        },
    },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
    args: {
        type: 'success',
        message: '요청이 성공적으로 처리되었습니다.',
        position: 'bottom',
        onClose: () => {},
    },
};

// =========================
// Type
// =========================

export const Type: Story = {
    name: 'type',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Toast type="success" message="요청이 성공적으로 처리되었습니다." onClose={() => {}} />
            <Toast type="warning" message="이 작업은 취소할 수 없습니다." onClose={() => {}} />
            <Toast type="error"   message="오류가 발생했습니다. 다시 시도해 주세요." onClose={() => {}} />
            <Toast type="info"    message="새로운 업데이트가 있습니다." onClose={() => {}} />
        </div>
    ),
};

// =========================
// Position
// =========================

export const Position: Story = {
    name: 'position',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Toast type="success" position="top"    message="상단에서 슬라이드 인 됩니다." onClose={() => {}} />
            <Toast type="success" position="bottom" message="하단에서 슬라이드 인 됩니다." onClose={() => {}} />
        </div>
    ),
};

// =========================
// Interactive — 5초 자동 닫힘 데모
// =========================

const InteractiveStory = () => {
    const [toasts, setToasts] = useState<{ id: number; type: any; message: string }[]>([]);

    const trigger = (type: any) => {
        const id = Date.now();
        setToasts((prev) => [...prev, {
            id,
            type,
            message: `${type.toUpperCase()} — 5초 뒤 자동으로 사라집니다.`,
        }]);
    };

    const remove = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button size="sm" color="primary"   variant="outline" onClick={() => trigger('success')}>Success</Button>
                <Button size="sm" color="secondary" variant="outline" onClick={() => trigger('warning')}>Warning</Button>
                <Button size="sm" color="error"     variant="outline" onClick={() => trigger('error')}>Error</Button>
                <Button size="sm" color="gray-dark" variant="outline" onClick={() => trigger('info')}>Info</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '343px' }}>
                {toasts.map((t) => (
                    <Toast key={t.id} type={t.type} message={t.message} onClose={() => remove(t.id)} />
                ))}
            </div>
        </div>
    );
};

export const Interactive: Story = {
    name: 'interactive — 5초 자동 닫힘',
    render: () => <InteractiveStory />,
};