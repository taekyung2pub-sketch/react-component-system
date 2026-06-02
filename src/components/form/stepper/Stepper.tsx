import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';
import { body02 } from '@/styles/mixins/typography';
import { Button } from '@/components/common/button/Button';

// =========================
// Types
// =========================

export interface StepperProps {
    /** 최솟값 */
    min?: number;
    /** 최댓값 (필수) */
    max: number;
    /** 초기값 */
    defaultValue?: number;
    /** 증감 단위 */
    step?: number;
    /** 값 변경 콜백 */
    onChange?: (value: number) => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const CountText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 20px;

  ${body02('medium')}
  color: ${gray[900]};
`;

// =========================
// Component
// =========================

export const Stepper = ({
                            min = 0,
                            max = 10,
                            defaultValue = 0,
                            step = 1,
                            onChange,
                            className,
                        }: StepperProps) => {
    const [value, setValue] = useState(
        Math.min(Math.max(defaultValue, min), max)
    );

    const handleDecrement = () => {
        const next = value - step;
        if (next < min) return;
        setValue(next);
        onChange?.(next);
    };

    const handleIncrement = () => {
        const next = value + step;
        if (next > max) return;
        setValue(next);
        onChange?.(next);
    };

    return (
        <Wrapper className={className}>
            <Button
                size="xs"
                variant="outline"
                color="gray-dark"
                rounded="sm"
                leftIcon="minus"
                disabled={value <= min}
                onClick={handleDecrement}
            />
            <CountText>{value}</CountText>
            <Button
                size="xs"
                variant="outline"
                color="gray-dark"
                rounded="sm"
                leftIcon="plus"
                disabled={value >= max}
                onClick={handleIncrement}
            />
        </Wrapper>
    );
};

export default Stepper;