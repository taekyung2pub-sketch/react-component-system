import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Portal } from '@/contexts/PortalContext';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { Stack } from '@/components/layout/stack/Stack';
import { Button } from '@/components/common/button/Button';
import { Title } from '@/components/common/title/Title';
import { Rating } from '@/components/product/rating/Rating';
import { Textarea } from '@/components/form/textarea/Textarea';
import { radius } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';

// =========================
// Types
// =========================

export interface ReviewOrder {
    image: string;
    name: string;
    option: string;
}

export interface PopReviewProps {
    order: ReviewOrder;
    onClose: () => void;
    onSubmit?: (rating: number, text: string) => void;
}

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

export const PopReview = ({ order, onClose, onSubmit }: PopReviewProps) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [shouldClear, setShouldClear] = useState(false);

    const handleClose = () => {
        setRating(0);
        setShouldClear(true);
        setTimeout(() => setShouldClear(false), 0);
        onClose();
    };

    const handleSubmit = () => {
        onSubmit?.(rating, text);
        handleClose();
    };

    return (
        <Portal>
            <BottomSheet
                title="리뷰 작성"
                onClose={handleClose}
                body={
                    <Stack direction="vertical" gap="md">
                        <Stack direction="horizontal" gap="md">
                            <Thumb src={order.image} alt={order.name} />
                            <div>
                                <p style={{ margin: '0 0 2px' }}><b>{order.name}</b></p>
                                <p style={{ margin: 0, fontSize: 12, color: gray[500] }}>{order.option}</p>
                            </div>
                        </Stack>
                        <Title variant="title03" weight="semibold" as="p">어떠셨나요?</Title>
                        <Rating value={rating} variant="input" onChange={setRating} />
                        <Textarea
                            placeholder="리뷰를 작성해주세요..."
                            maxLength={300}
                            onValueChange={setText}
                            shouldClear={shouldClear}
                        />
                    </Stack>
                }
                footer={
                    <Button
                        size="lg"
                        color="gray-dark"
                        fullWidth
                        disabled={!rating || !text.trim()}
                        onClick={handleSubmit}
                    >
                        제출
                    </Button>
                }
            />
        </Portal>
    );
};

export default PopReview;