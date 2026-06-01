import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { gray, white, black } from '@/styles/tokens/color';
import { caption02 } from '@/styles/mixins/typography';
import { Icon } from '@/components/common/icon/Icon';
import { Button } from '@/components/common/button/Button';
import { IconName } from '@/components/common/icon/iconMap';
import { Price, PriceCurrency } from '@/components/product/price/Price';

// =========================
// Types
// =========================

export type DockVariant = 'nav' | 'product' | 'action';

export interface NavItem {
    icon: IconName;
    label: string;
    value: string;
}

export interface ActionButton {
    label: string;
    onClick?: () => void;
    variant?: 'filled' | 'outline';
    disabled?: boolean;
}

export interface DockProps {
    variant?: DockVariant;

    // nav
    navItems?: NavItem[];
    activeNav?: string;
    onNavChange?: (value: string) => void;

    // product
    price?: number;
    originalPrice?: number;
    currency?: PriceCurrency;
    onAddToCart?: () => void;

    // action
    actions?: ActionButton[];

    className?: string;
}

// =========================
// Styled — 공통
// =========================

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${white};
  border-top: 1px solid ${gray[100]};
  padding-bottom: env(safe-area-inset-bottom, 0px);
  z-index: 100;
`;

// =========================
// Nav styled
// =========================

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 64px;
  padding: 0 ${spacing.sm};
`;

const NavBtn = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ $active }) => $active ? black : gray[400]};
`;

const NavLabel = styled.span<{ $active: boolean }>`
  ${caption02()}
  color: ${({ $active }) => $active ? black : gray[400]};
  font-weight: ${({ $active }) => $active ? 600 : 400};
`;

// =========================
// Product styled
// =========================

const ProductInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.md};
  gap: ${spacing.md};
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PriceLabel = styled.span`
  ${caption02('regular')}
  color: ${gray[400]};
`;

// =========================
// Action styled
// =========================

const ActionInner = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
`;

// =========================
// Component
// =========================

export const Docker = ({
                         variant = 'nav',
                         navItems = [],
                         activeNav,
                         onNavChange,
                         price,
                         originalPrice,
                         currency = 'KRW',
                         onAddToCart,
                         actions = [],
                         className,
                     }: DockProps) => {

    // =========================
    // nav
    // =========================
    if (variant === 'nav') {
        return (
            <Wrapper className={className}>
                <NavInner>
                    {navItems.map((item) => {
                        const isActive = item.value === activeNav;
                        return (
                            <NavBtn
                                key={item.value}
                                type="button"
                                $active={isActive}
                                onClick={() => onNavChange?.(item.value)}
                            >
                                <Icon
                                    name={item.icon}
                                    size="lg"
                                    color={isActive ? black : gray[400]}
                                />
                                <NavLabel $active={isActive}>{item.label}</NavLabel>
                            </NavBtn>
                        );
                    })}
                </NavInner>
            </Wrapper>
        );
    }

    // =========================
    // product
    // =========================
    if (variant === 'product') {
        return (
            <Wrapper className={className}>
                <ProductInner>
                    <PriceWrapper>
                        <PriceLabel>Price</PriceLabel>
                        <Price
                            size="md"
                            variant={originalPrice ? 'discount' : 'default'}
                            price={price ?? 0}
                            originalPrice={originalPrice}
                            currency={currency}
                        />
                    </PriceWrapper>
                    <Button
                        size="lg"
                        color="gray-dark"
                        variant="filled"
                        leftIcon="cart"
                        onClick={onAddToCart}
                        style={{ flex: 1 }}
                    >
                        Add to Cart
                    </Button>
                </ProductInner>
            </Wrapper>
        );
    }

    // =========================
    // action
    // =========================
    return (
        <Wrapper className={className}>
            <ActionInner>
                {actions.map((action, i) => (
                    <Button
                        key={i}
                        size="lg"
                        color="gray-dark"
                        variant={action.variant ?? (i === 0 && actions.length > 1 ? 'outline' : 'filled')}
                        fullWidth
                        disabled={action.disabled}
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                ))}
            </ActionInner>
        </Wrapper>
    );
};

export default Docker;