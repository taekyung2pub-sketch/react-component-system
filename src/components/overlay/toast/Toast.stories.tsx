import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProps } from './Toast';

const meta: Meta<typeof Toast> = {
    title: 'Component/Overlay/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['success', 'warning', 'error', 'info'],
        },
        position: {
            control: 'radio',
            options: ['top', 'bottom'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// 기본형 스토리들
export const Success: Story = {
    args: {
        type: 'success',
        message: '요청이 성공적으로 처리되었습니다.',
        position: 'bottom',
        onClose: () => console.log('Toast closed'),
    },
};

export const Error: Story = {
    args: {
        type: 'error',
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        position: 'bottom',
        onClose: () => console.log('Toast closed'),
    },
};

export const Warning: Story = {
    args: {
        type: 'warning',
        message: '이 작업은 취소할 수 없습니다.',
        position: 'bottom',
        onClose: () => console.log('Toast closed'),
    },
};

export const Info: Story = {
    args: {
        type: 'info',
        message: '새로운 업데이트가 있습니다.',
        position: 'bottom',
        onClose: () => console.log('Toast closed'),
    },
};

// 상단 작동 테스트용 스토리
export const SlideFromTop: Story = {
    args: {
        type: 'success',
        message: '화면 상단에서 내려오는 토스트입니다.',
        position: 'top',
        onClose: () => console.log('Toast closed'),
    },
};

// 실제 인터랙션(5초 뒤 사라짐 및 트리거)을 확인하기 위한 라이브 플레이 스토리
export const InteractiveInteractiveDemo = () => {
    const [toasts, setToasts] = useState<{ id: number; type: any; message: string; position: any }[]>([]);
    let count = 0;

    const triggerToast = (type: any, position: any) => {
        const id = Date.now();
        const newToast = {
            id,
            type,
            message: `${type.toUpperCase()} - 5초 뒤에 자동으로 사라집니다.`,
            position,
        };
        setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
                <button onClick={() => triggerToast('success', 'bottom')} style={btnStyle}>Success (Bottom)</button>
                <button onClick={() => triggerToast('error', 'bottom')} style={btnStyle}>Error (Bottom)</button>
                <button onClick={() => triggerToast('warning', 'top')} style={btnStyle}>Warning (Top)</button>
                <button onClick={() => triggerToast('info', 'top')} style={btnStyle}>Info (Top)</button>
            </div>

            {/* 고정 위치 레이아웃 시뮬레이션 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '343px' }}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        type={toast.type}
                        message={toast.message}
                        position={toast.position}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </div>
    );
};

const btnStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #d4d4d8',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontWeight: 500,
};