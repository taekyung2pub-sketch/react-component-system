import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { spacing, radius, shadow } from '@/styles/tokens/spacing';
import { white } from '@/styles/tokens/color';
import { Button } from '@/components/common/button/Button';

// =========================
// Types
// =========================

export interface AlertAction {
    label: string;
    variant?: 'filled' | 'soft' | 'outline';
    color?: 'gray-dark' | 'gray-light' | 'primary' | 'secondary' | 'error';
    disabled?: boolean;
    onClick?: () => void;
}

export interface AlertProps {
    /** 본문 영역 — ReactNode로 자유롭게 삽입 */
    children: React.ReactNode;
    /** 하단 액션 버튼 배열 (최대 2개, 위에서 아래 순서) */
    actions?: AlertAction[];
    /** Overlay 클릭 시 닫기 (기본 false — Alert는 명시적 액션 유도) */
    dimClose?: boolean;
    /** dimClose 시 호출할 콜백 */
    onClose?: () => void;
    className?: string;
}

// =========================
// Styled
// =========================

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: ${spacing.lg};
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 327px;
  padding: ${spacing.lg};
  background: ${white};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.lg};
  overflow: hidden;
`;

const Body = styled.div`

`;

const Footer = styled.div`
  margin-top: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

// =========================
// Component
// =========================

export const Alert = ({
                          children,
                          actions = [],
                          dimClose = false,
                          onClose,
                          className,
                      }: AlertProps) => {
    // body 스크롤 방지
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    const handleOverlayClick = () => {
        if (dimClose) onClose?.();
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <Sheet className={className} onClick={(e) => e.stopPropagation()}>
                <Body>{children}</Body>
                {actions.length > 0 && (
                    <Footer>
                        {actions.slice(0, 2).map((action, i) => (
                            <Button
                                key={i}
                                size="lg"
                                fullWidth
                                variant={action.variant ?? 'filled'}
                                color={action.color ?? 'gray-dark'}
                                disabled={action.disabled}
                                onClick={action.onClick}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </Footer>
                )}
            </Sheet>
        </Overlay>
    );
};

export default Alert;