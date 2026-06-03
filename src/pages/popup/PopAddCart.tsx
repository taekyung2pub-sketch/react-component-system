import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { Button } from '@/components/common/button/Button';
import { Select } from '@/components/form/select/Select';
import { Stepper } from '@/components/form/stepper/Stepper';
import { Stack } from '@/components/layout/stack/Stack';
import { Title } from '@/components/common/title/Title';
import { Icon } from '@/components/common/icon/Icon';
import { Portal } from '@/contexts/PortalContext';
import { spacing, radius } from '@/styles/tokens/spacing';
import { gray, white } from '@/styles/tokens/color';
import { body03, body04, caption01 } from '@/styles/mixins/typography';
import type { ProductData } from '@/data/mockProducts';

// =========================
// Types
// =========================

export interface CartItem {
    color: string;
    colorLabel: string;
    size: string;
    sizeLabel: string;
    quantity: number;
}

export interface PopAddCartProps {
    product: ProductData;
    onClose: () => void;
    onConfirm: (items: CartItem[]) => void;
}

// =========================
// Styled
// =========================

const OptionLabel = styled.p`
  ${body04('medium')}
  color: ${gray[600]};
  margin-bottom: ${spacing.sm};
`;

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  border-top: 1px solid ${gray[100]};
`;

const CartItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${gray[50]};
  border-radius: ${radius.md};
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.p`
  ${body04('medium')}
  color: ${gray[900]};
  margin: 0 0 2px;
`;

const CartItemSub = styled.p`
  ${caption01('regular')}
  color: ${gray[500]};
  margin: 0;
`;

const CartItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-shrink: 0;
`;

const CartItemPrice = styled.span`
  ${body04('medium')}
  color: ${gray[900]};
`;

const RemoveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  border-top: 1px solid ${gray[200]};
`;

const TotalLabel = styled.span`
  ${body03('medium')}
  color: ${gray[700]};
`;

const TotalPrice = styled.span`
  ${body03('bold')}
  color: ${gray[900]};
`;

// =========================
// Component
// =========================

export const PopAddCart = ({ product, onClose, onConfirm }: PopAddCartProps) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedColorLabel, setSelectedColorLabel] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedSizeLabel, setSelectedSizeLabel] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddItem = () => {
        if (!selectedColor || !selectedSize) return;

        const existing = cartItems.findIndex(
            item => item.color === selectedColor && item.size === selectedSize
        );

        if (existing >= 0) {
            setCartItems(prev => prev.map((item, i) =>
                i === existing ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setCartItems(prev => [...prev, {
                color: selectedColor,
                colorLabel: selectedColorLabel,
                size: selectedSize,
                sizeLabel: selectedSizeLabel,
                quantity,
            }]);
        }
        setQuantity(1);
    };

    const handleRemoveItem = (index: number) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + product.price * item.quantity, 0);
    const canAdd = !!selectedColor && !!selectedSize;

    return (
        <Portal>
            <BottomSheet
                title="옵션 선택"
                onClose={onClose}
                body={
                    <Stack direction="vertical" gap="md">
                        {/* 컬러 */}
                        <div>
                            <OptionLabel>컬러</OptionLabel>
                            <Select
                                variant="box"
                                placeholder="컬러를 선택해주세요"
                                options={product.colors}
                                onValueChange={(val, label) => {
                                    setSelectedColor(val);
                                    setSelectedColorLabel(label ?? val);
                                }}
                            />
                        </div>

                        {/* 사이즈 */}
                        <div>
                            <OptionLabel>사이즈</OptionLabel>
                            <Select
                                variant="box"
                                placeholder="사이즈를 선택해주세요"
                                options={product.options}
                                onValueChange={(val, label) => {
                                    setSelectedSize(val);
                                    setSelectedSizeLabel(label ?? val);
                                }}
                            />
                        </div>

                        {/* 수량 */}
                        <div>
                            <OptionLabel>수량</OptionLabel>
                            <Stepper
                                min={1}
                                max={99}
                                defaultValue={1}
                                onChange={setQuantity}
                            />
                        </div>

                        {/* 추가 버튼 */}
                        <Button
                            size="md"
                            variant="outline"
                            color="gray-dark"
                            fullWidth
                            disabled={!canAdd}
                            onClick={handleAddItem}
                        >
                            선택 추가
                        </Button>

                        {/* 선택된 상품 목록 */}
                        {cartItems.length > 0 && (
                            <CartItemList>
                                {cartItems.map((item, i) => (
                                    <CartItemRow key={i}>
                                        <CartItemInfo>
                                            <CartItemName>{product.name}</CartItemName>
                                            <CartItemSub>
                                                {item.colorLabel} / {item.sizeLabel} / {item.quantity}개
                                            </CartItemSub>
                                        </CartItemInfo>
                                        <CartItemRight>
                                            <CartItemPrice>
                                                ₩{(product.price * item.quantity).toLocaleString()}
                                            </CartItemPrice>
                                            <RemoveBtn type="button" onClick={() => handleRemoveItem(i)}>
                                                <Icon name="cancel_circle" size="sm" color={gray[400]} />
                                            </RemoveBtn>
                                        </CartItemRight>
                                    </CartItemRow>
                                ))}

                                <TotalRow>
                                    <TotalLabel>총 상품금액</TotalLabel>
                                    <TotalPrice>₩{totalPrice.toLocaleString()}</TotalPrice>
                                </TotalRow>
                            </CartItemList>
                        )}
                    </Stack>
                }
                footer={
                    <Stack direction="horizontal" gap="sm">
                        <Button
                            size="lg"
                            variant="outline"
                            color="gray-dark"
                            fullWidth
                            onClick={onClose}
                        >
                            취소
                        </Button>
                        <Button
                            size="lg"
                            color="gray-dark"
                            fullWidth
                            disabled={cartItems.length === 0}
                            onClick={() => onConfirm(cartItems)}
                        >
                            장바구니 담기
                        </Button>
                    </Stack>
                }
            />
        </Portal>
    );
};

export default PopAddCart;