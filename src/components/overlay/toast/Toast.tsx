import * as React from 'react';
import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { spacing, radius, shadow, transition } from '../../../styles/tokens/spacing';
import { semantic } from '../../../styles/tokens/color';
import { Icon } from '../../common/icon/Icon';
import { IconName } from '../../common/icon/iconMap';

// =========================
// Types & Constants
// =========================

export type ToastType = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
    type: ToastType;
    message: string;
    position?: ToastPosition;
    onClose: () => void;
    className?: string;
}

const iconMap: Record<ToastType, IconName> = {
    success: 'check_circle',
    warning: 'cancel_circle',
    error: 'question',
    info: 'warning_circle',
};

// body02 타이포그래피 믹스인
const body02 = (type: 'regular' | 'medium' | 'bold' = 'medium') => css`
  font-size: 14px;
  line-height: 1.5;
  font-weight: ${type === 'medium' ? 500 : type === 'bold' ? 700 : 400};
`;

// =========================
// Animation
// =========================

const slideInFromTop = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// =========================
// Styled Components
// =========================

const Container = styled.div<{ $type: ToastType; $position: ToastPosition }>`
  display: flex;
  align-items: center;

  height: 52px;
  width: calc(100% - ${spacing.xl});
  max-width: 343px;
  padding: 0 ${spacing.md};

  border-radius: ${radius.md};

  /* 💡 변경점 1: 흰 배경에서도 묻히지 않도록 그림자 농도 조절 및 테두리(border) 추가 */
  box-shadow: ${shadow.lg}, 0 4px 18px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ $type }) => `${semantic[$type]}40`}; /* 25% 투명도의 테두리 라인 생성 */

  /* 💡 변경점 2: 흰 배경(라이트모드)을 고려해 배경 투명도는 유지하되 블러와 베이스 틴트 제공 */
  background-color: ${({ $type }) => `${semantic[$type]}1F`}; /* 약 12~15% 투명도 */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  animation: ${({ $position }) => ($position === 'top' ? slideInFromTop : slideInFromBottom)} ${transition.normal};
  pointer-events: auto;
`;

const Message = styled.span`
  margin-left: ${spacing.sm};

  /* 💡 변경점 3: 흰색 배경에서 가독성을 확보하기 위해 텍스트 컬러를 어두운 톤(#18181b)으로 변경 */
  color: #18181b;

  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${body02('medium')}
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
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

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