import * as React from 'react';
import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { spacing, radius, shadow, transition } from '@/styles/tokens/spacing';
import { gray, semantic } from '@/styles/tokens/color';
import { Icon } from '@/components/common/icon/Icon';
import { IconName } from '@/components/common/icon/iconMap';

// =========================
// Types
// =========================

export type ToastType     = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
    /** 토스트 타입 */
    type: ToastType;
    /** 메시지 */
    message: string;
    /** 노출 위치 */
    position?: ToastPosition;
    /** 닫힘 콜백 */
    onClose: () => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Token maps
// =========================

const iconMap: Record<ToastType, IconName> = {
    success: 'check_circle',
    warning: 'warning_circle',
    error:   'cancel_circle',
    info:    'question',
};

// =========================
// Animation
// =========================

const slideInTop = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
`;

const slideInBottom = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

// =========================
// Styled components
// =========================

const Container = styled.div<{ $type: ToastType; $position: ToastPosition }>`
  display: flex;
  align-items: center;

  height: 52px;
  width: calc(100% - ${spacing.xl});
  max-width: 343px;
  padding: 0 ${spacing.md};

  border-radius: ${radius.md};
  border: 1px solid ${({ $type }) => `${semantic[$type]}40`};
  box-shadow: ${shadow.lg}, 0 4px 18px rgba(0, 0, 0, 0.08);

  background-color: ${({ $type }) => `${semantic[$type]}1F`};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  animation: ${({ $position }) =>
          $position === 'top' ? slideInTop : slideInBottom} ${transition.normal};

  pointer-events: auto;
`;

const Message = styled.span`
  margin-left: ${spacing.sm};
  color: ${gray[900]};
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// =========================
// Component
// =========================

export const Toast = ({
                          type,
                          message,
                          position = 'bottom',
                          onClose,
                          className,
                      }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Container $type={type} $position={position} className={className}>
            <Icon name={iconMap[type]} size="md" color={semantic[type]} />
            <Message>{message}</Message>
        </Container>
    );
};

export default Toast;