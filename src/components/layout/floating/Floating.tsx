import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { spacing, radius, shadow, size } from '@/styles/tokens/spacing';
import { gray, white, black } from '@/styles/tokens/color';
import { Icon } from '@/components/common/icon/Icon';

// =========================
// Types
// =========================

export interface RecentProduct {
    id: number;
    imageSrc: string;
    name: string;
}

export interface FloatingProps {
    /** 최근 본 상품 (1개) */
    recentProduct?: RecentProduct;
    /** 최근 본 상품 클릭 */
    onRecentClick?: (product: RecentProduct) => void;
    /** 우측 여백 */
    right?: string;
    /** 하단 여백 */
    bottom?: string;
    className?: string;
}

// =========================
// Animations
// =========================

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// =========================
// Styled
// =========================

const Wrapper = styled.div<{ $right: string; $bottom: string }>`
  position: fixed;
  right: ${({ $right }) => $right};
  bottom: ${({ $bottom }) => $bottom};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
  z-index: 200;
`;

const FloatBtn = styled.button<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size['2xs']};
  height: ${size['2xs']};
  border-radius: ${radius.full};
  border: none;
  cursor: pointer;
  background-color: ${black};
  color: ${white};
  box-shadow: ${shadow.md};
  transition: opacity 0.2s, transform 0.2s, background-color 0.15s;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  animation: ${({ $visible }) => $visible ? css`${slideUp} 0.3s ease` : 'none'};

  svg {
    transform: rotate(180deg);
  }

  &:hover {
    background-color: ${gray[700]};
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const RecentBtn = styled.button`
  position: relative;
  width: ${size['2xs']};
  height: ${size['2xs']};
  border-radius: ${radius.lg};
  border: 2px solid ${white};
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  box-shadow: ${shadow.md};
  background: ${gray[200]};
  animation: ${fadeIn} 0.25s ease;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadow.lg};
  }
  &:active {
    transform: translateY(0);
  }
`;

const RecentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const RecentBadge = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 14px;
  height: 14px;
  border-radius: ${radius.full};
  background: ${black};
  border: 1.5px solid ${white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// =========================
// Component
// =========================

export const Floating = ({
                             recentProduct,
                             onRecentClick,
                             right = spacing.md,
                             bottom = spacing['2xl'],
                             className,
                         }: FloatingProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTopClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Wrapper $right={right} $bottom={bottom} className={className}>
            {recentProduct && (
                <RecentBtn
                    type="button"
                    onClick={() => onRecentClick?.(recentProduct)}
                    aria-label={`최근 본 상품: ${recentProduct.name}`}
                >
                    <RecentImg src={recentProduct.imageSrc} alt={recentProduct.name} />
                    <RecentBadge>
                        <Icon name="eye" size="xs" color={white} />
                    </RecentBadge>
                </RecentBtn>
            )}

            <FloatBtn
                type="button"
                $visible={visible}
                onClick={handleTopClick}
                aria-label="맨 위로 이동"
            >
                <Icon name="chevron" size="md" color={white} />
            </FloatBtn>
        </Wrapper>
    );
};

export default Floating;