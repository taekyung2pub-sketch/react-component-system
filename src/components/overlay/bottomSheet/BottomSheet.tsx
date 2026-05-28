import * as React from 'react';
import { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {spacing, radius, shadow, size} from '@/styles/tokens/spacing';
import { white, gray, black } from '@/styles/tokens/color';
import { Icon } from '@/components/common/icon/Icon';
import { title03 } from '@/styles/mixins/typography';

// =========================
// Types
// =========================

export interface BottomSheetProps {
    /** 헤더 타이틀 */
    title: string;
    /** 닫기 콜백 */
    onClose: () => void;
    /** 본문 슬롯 */
    body?: React.ReactNode;
    /** 하단 슬롯 */
    footer?: React.ReactNode;
    className?: string;
}

// =========================
// Animations
// =========================

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// =========================
// Styled
// =========================

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;
  display: flex;
  align-items: flex-end;
  animation: ${fadeIn} 0.2s ease;
`;

const Sheet = styled.div`
  width: 100%;
  background: ${white};
  border-radius: ${radius.lg} ${radius.lg} 0 0;
  box-shadow: ${shadow.lg};
  animation: ${slideUp} 0.3s ease;
  padding: ${spacing.lg};
  padding-top: ${spacing.md};
`;

const Handle = styled.div`
  width: ${size.xs};
  height: 4px;
  border-radius: ${radius.full};
  background: ${gray[300]};
  margin: 0 auto ${spacing.md};
  cursor: grab;
  flex-shrink: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${gray[300]};
`;

const TitleText = styled.h2`
  ${title03('semibold')}
  color: ${black};
  margin: 0;
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
`;

const Body = styled.div`
  margin-top: ${spacing.md};
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

export const BottomSheet = ({
                                title,
                                onClose,
                                body,
                                footer,
                                className,
                            }: BottomSheetProps) => {
    const startYRef = useRef<number>(0);
    const [dragY, setDragY] = useState(0);
    const CLOSE_THRESHOLD = 80;

    const handleTouchStart = (e: React.TouchEvent) => {
        startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const delta = e.touches[0].clientY - startYRef.current;
        if (delta > 0) setDragY(delta);
    };

    const handleTouchEnd = () => {
        if (dragY >= CLOSE_THRESHOLD) {
            onClose();
        }
        setDragY(0);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        startYRef.current = e.clientY;

        const handleMouseMove = (ev: MouseEvent) => {
            const delta = ev.clientY - startYRef.current;
            if (delta > 0) setDragY(delta);
        };

        const handleMouseUp = () => {
            if (dragY >= CLOSE_THRESHOLD) onClose();
            setDragY(0);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <Overlay onClick={onClose}>
            <Sheet
                className={className}
                style={{ transform: dragY > 0 ? `translateY(${dragY}px)` : undefined, transition: dragY > 0 ? 'none' : 'transform 0.3s ease' }}
                onClick={(e) => e.stopPropagation()}
            >
                <Handle
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                />
                <Header>
                    <TitleText>{title}</TitleText>
                    <CloseBtn type="button" onClick={onClose} aria-label="닫기">
                        <Icon name="cancel" size="lg" color={gray[900]} />
                    </CloseBtn>
                </Header>
                {body && <Body>{body}</Body>}
                {footer && <Footer>{footer}</Footer>}
            </Sheet>
        </Overlay>
    );
};

export default BottomSheet;