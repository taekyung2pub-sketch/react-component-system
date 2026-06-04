import * as React from 'react';
import styled from 'styled-components';
import { Portal } from '@/contexts/PortalContext';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { Stack } from '@/components/layout/stack/Stack';
import { StepList } from '@/components/patterns/stepList/StepList';
import { radius } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';

// =========================
// Types
// =========================

export interface DeliveryOrder {
    image: string;
    name: string;
    option: string;
    status: string;
}

export interface PopDeliveryProps {
    order: DeliveryOrder;
    onClose: () => void;
}

// =========================
// Data
// =========================

const trackStepItems = [
    { title: '주문 접수', desc: '주문이 접수되었습니다.' },
    { title: '상품 준비', desc: '판매자가 상품을 준비하고 있습니다.' },
    { title: '집화 완료', desc: '택배사에 인계되었습니다.' },
    { title: '배송 중',   desc: '배송이 시작되었습니다.' },
    { title: '배송 완료', desc: '상품이 배달되었습니다.' },
];

const statusStepMap: Record<string, number> = {
    inTransit: 3,
    picked:    2,
    completed: 4,
};

// =========================
// Styled
// =========================

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  border-radius: ${radius.md};
  object-fit: cover;
  flex-shrink: 0;
`;

// =========================
// Component
// =========================

export const PopDelivery = ({ order, onClose }: PopDeliveryProps) => {
    return (
        <Portal>
            <BottomSheet
                title="배송 현황"
                onClose={onClose}
                body={
                    <Stack direction="vertical" gap="lg">
                        <Stack direction="horizontal" gap="md">
                            <Thumb src={order.image} alt={order.name} />
                            <div>
                                <p style={{ margin: '0 0 2px' }}><b>{order.name}</b></p>
                                <p style={{ margin: 0, fontSize: 12, color: gray[500] }}>{order.option}</p>
                            </div>
                        </Stack>
                        <StepList
                            variant="vertical"
                            items={trackStepItems}
                            current={statusStepMap[order.status] ?? 0}
                        />
                    </Stack>
                }
            />
        </Portal>
    );
};

export default PopDelivery;