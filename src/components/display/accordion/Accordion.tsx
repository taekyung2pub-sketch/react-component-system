import * as React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { spacing, radius, transition } from '@/styles/tokens/spacing';
import { gray, black, white } from '@/styles/tokens/color';
import { body02, body03 } from '@/styles/mixins/typography';
import { Icon } from '@/components/common/icon/Icon';

// =========================
// Types
// =========================

export type AccordionVariant = 'box' | 'line';

export interface AccordionItem {
    /** 고유 키 */
    id: string;
    /** 제목 */
    title: string;
    /** 콘텐츠 (없으면 disabled 처리) */
    content?: React.ReactNode;
}

export interface AccordionProps {
    /** box — 카드형 / line — 상하 border형 */
    variant?: AccordionVariant;
    /** 아이템 목록 */
    items: AccordionItem[];
    /**
     * true — 하나 열리면 나머지 닫힘 (single)
     * false — 독립적으로 열고 닫힘 (multiple)
     */
    single?: boolean;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled — Box variant
// =========================

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const BoxItem = styled.div<{ $disabled: boolean }>`
  border-radius: ${radius.lg};
  border: 1px solid ${gray[200]};
  background-color: ${white};
  overflow: hidden;
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};
`;

// =========================
// Styled — Line variant
// =========================

const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LineItem = styled.div<{ $disabled: boolean }>`
  border-top: 1px solid ${gray[200]};
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};

  &:last-child {
    border-bottom: 1px solid ${gray[200]};
  }
`;

// =========================
// Styled — 공통 내부
// =========================

const Header = styled.button<{ $disabled: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: none;
  border: none;
  text-align: left;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
`;

const Title = styled.span`
  flex: 1;
  ${body02('medium')}
  color: ${black};
`;

const IconWrapper = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform ${transition.normal};
`;

const ContentWrapper = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => $open ? '1fr' : '0fr'};
  transition: grid-template-rows ${transition.normal};
`;

const ContentInner = styled.div`
  overflow: hidden;
`;

const Content = styled.div`
  padding: 0 ${spacing.md} ${spacing.md};
  ${body03('regular')}
  color: ${gray[600]};
  line-height: 1.6;
`;

// =========================
// Single item component
// =========================

const AccordionItemComponent = ({
                                    item,
                                    isOpen,
                                    onToggle,
                                    variant,
                                }: {
    item: AccordionItem;
    isOpen: boolean;
    onToggle: () => void;
    variant: AccordionVariant;
}) => {
    const disabled = !item.content;
    const ItemWrapper = variant === 'box' ? BoxItem : LineItem;

    return (
        <ItemWrapper $disabled={disabled}>
            <Header
                type="button"
                $disabled={disabled}
                disabled={disabled}
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <Title>{item.title}</Title>
                <IconWrapper $open={isOpen}>
                    <Icon name="chevron" size="sm" color={gray[500]} />
                </IconWrapper>
            </Header>
            <ContentWrapper $open={isOpen}>
                <ContentInner>
                    {item.content && <Content>{item.content}</Content>}
                </ContentInner>
            </ContentWrapper>
        </ItemWrapper>
    );
};

// =========================
// Component
// =========================

export const Accordion = ({
                              variant = 'box',
                              items,
                              single = true,
                              className,
                          }: AccordionProps) => {
    const [openIds, setOpenIds] = useState<string[]>([]);

    const handleToggle = (id: string) => {
        setOpenIds((prev) => {
            const isOpen = prev.includes(id);
            if (single) {
                return isOpen ? [] : [id];
            }
            return isOpen ? prev.filter((v) => v !== id) : [...prev, id];
        });
    };

    const Wrapper = variant === 'box' ? BoxWrapper : LineWrapper;

    return (
        <Wrapper className={className}>
            {items.map((item) => (
                <AccordionItemComponent
                    key={item.id}
                    item={item}
                    isOpen={openIds.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                    variant={variant}
                />
            ))}
        </Wrapper>
    );
};

export default Accordion;