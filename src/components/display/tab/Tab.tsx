import * as React from 'react';
import { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { spacing, radius, transition } from '../../../styles/tokens/spacing';
import { gray, white, black } from '../../../styles/tokens/color';
import { body03 } from '../../../styles/mixins/typography';

// =========================
// Types
// =========================

export type TabVariant = 'equal' | 'scroll';

export interface TabItem {
    label: string;
    value: string;
}

export interface TabProps {
    /** 균등형 / 스와이프 일반형 */
    variant?: TabVariant;
    /** 탭 목록 */
    items: TabItem[];
    /** 기본 선택값 */
    defaultValue?: string;
    /** 변경 핸들러 */
    onChange?: (value: string) => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Equal variant styled
// =========================

const EqualWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${gray[100]};
  border-radius: ${radius.md};
  padding: ${spacing.xs};
  gap: ${spacing.xs};
`;

const EqualTab = styled.button<{ $active: boolean }>`
  flex: 1;
  height: ${spacing.xl};
  border: none;
  border-radius: ${radius.md};
  cursor: pointer;
  transition: background-color ${transition.fast}, color ${transition.fast};

  ${body03('medium')}

  background-color: ${({ $active }) => $active ? white : 'transparent'};
  color: ${({ $active }) => $active ? black : gray[400]};

  ${({ $active }) => $active && css`
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  `}
`;

// =========================
// Scroll variant styled
// =========================

const ScrollWrapper = styled.div<{ $pageSpacing: string; $isDragging: boolean }>`
  margin: 0 -${({ $pageSpacing }) => $pageSpacing};
  padding: 0 ${({ $pageSpacing }) => $pageSpacing};
  overflow-x: auto;
  scrollbar-width: none;
  cursor: ${({ $isDragging }) => $isDragging ? 'grabbing' : 'grab'};
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollInner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  padding-bottom: 2px;
`;

const ScrollTab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  height: 36px;
  padding: 0 ${spacing.md};
  border: none;
  border-radius: ${radius.md};
  cursor: pointer;
  white-space: nowrap;
  transition: background-color ${transition.fast}, color ${transition.fast};

  ${body03('medium')}

  background-color: ${({ $active }) => $active ? gray[800] : gray[200]};
  color: ${({ $active }) => $active ? white : gray[500]};
`;

// =========================
// Component
// =========================

export const Tab = ({
                        variant = 'equal',
                        items,
                        defaultValue,
                        onChange,
                        className,
                        pageSpacing = spacing.md,
                    }: TabProps & { pageSpacing?: string }) => {
    const [active, setActive] = useState(defaultValue ?? items[0]?.value);

    const handleClick = (value: string) => {
        setActive(value);
        onChange?.(value);
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const dragMoved = useRef(false);
    const [dragging, setDragging] = useState(false);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        dragMoved.current = false;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        setDragging(true);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX.current;
        if (Math.abs(walk) > 4) dragMoved.current = true;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
        isDragging.current = false;
        setDragging(false);
    };

    if (variant === 'scroll') {
        return (
            <ScrollWrapper
                ref={scrollRef}
                $pageSpacing={pageSpacing}
                $isDragging={dragging}
                className={className}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                <ScrollInner>
                    {items.map((item) => (
                        <ScrollTab
                            key={item.value}
                            type="button"
                            $active={active === item.value}
                            onClick={() => {
                                if (dragMoved.current) return;
                                handleClick(item.value);
                            }}
                        >
                            {item.label}
                        </ScrollTab>
                    ))}
                </ScrollInner>
            </ScrollWrapper>
        );
    }

    return (
        <EqualWrapper className={className}>
            {items.map((item) => (
                <EqualTab
                    key={item.value}
                    type="button"
                    $active={active === item.value}
                    onClick={() => handleClick(item.value)}
                >
                    {item.label}
                </EqualTab>
            ))}
        </EqualWrapper>
    );
};

export default Tab;