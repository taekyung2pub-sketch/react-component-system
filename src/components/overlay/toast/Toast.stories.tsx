import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../../common/button/Button';

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Overlay/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
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
            <Toast type="error" message="오류가 발생했습니다. 다시 시도해 주세요." onClose={() => {}} />
            <Toast type="info" message="새로운 업데이트가 있습니다." onClose={() => {}} />
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
            <Toast type="success" position="top" message="상단에서 슬라이드 인 됩니다." onClose={() => {}} />
            <Toast type="success" position="bottom" message="하단에서 슬라이드 인 됩니다." onClose={() => {}} />
        </div>
    ),
};

// =========================
// Interactive — 5초 자동 닫힘 데모
// =========================

export const Interactive: Story = {
    name: 'interactive — 5초 자동 닫힘',
    render: () => {
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
                        <Toast
                            key={t.id}
                            type={t.type}
                            message={t.message}
                            onClose={() => remove(t.id)}
                        />
                    ))}
                </div>
            </div>
        );
    },
};