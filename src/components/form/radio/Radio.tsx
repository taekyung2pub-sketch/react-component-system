import * as React from 'react';
import { useId } from 'react';
import styled from 'styled-components';
import { spacing, transition } from '../../../styles/tokens/spacing';
import { gray, black, white } from '../../../styles/tokens/color';
import { caption01 } from '../../../styles/mixins/typography';

// =========================
// Types
// =========================

export interface RadioProps {
    /** input id (미전달 시 자동 생성) */
    id?: string;
    /** 라디오 그룹명 (같은 name끼리 단일 선택) */
    name: string;
    /** 라디오 값 */
    value: string;
    /** 선택 여부 */
    checked?: boolean;
    /** 라벨 텍스트 */
    label?: string;
    /** 비활성화 */
    disabled?: boolean;
    /** 변경 핸들러 */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components
// =========================

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const StyledLabel = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};
`;

const RadioCircle = styled.div<{ $checked: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ $checked }) => $checked ? black : gray[300]};
  background-color: ${white};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color ${transition.fast};

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${black};
    opacity: ${({ $checked }) => $checked ? 1 : 0};
    transition: opacity ${transition.fast};
  }
`;

const LabelText = styled.span`
  ${caption01('medium')}
  color: ${black};
`;

// =========================
// Component
// =========================

export const Radio = ({
                          id,
                          name,
                          value,
                          checked = false,
                          label,
                          disabled = false,
                          onChange,
                          className,
                      }: RadioProps) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
        <StyledLabel
            htmlFor={inputId}
            $disabled={disabled}
            className={className}
        >
            <HiddenInput
                type="radio"
                id={inputId}
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <RadioCircle $checked={checked} />
            {label && <LabelText>{label}</LabelText>}
        </StyledLabel>
    );
};

export default Radio;