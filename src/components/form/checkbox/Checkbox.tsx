import * as React from 'react';
import { useId } from 'react';
import styled from 'styled-components';
import { spacing, transition } from '@/styles/tokens/spacing';
import { gray, black, white } from '@/styles/tokens/color';
import { caption01 } from '@/styles/mixins/typography';
import { Icon } from '@/components/common/icon/Icon';

// =========================
// Types
// =========================

export interface CheckboxProps {
    /** input id (미전달 시 자동 생성) */
    id?: string;
    /** input name */
    name?: string;
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

const CheckBox = styled.div<{ $checked: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid ${({ $checked }) => $checked ? black : gray[300]};
  background-color: ${({ $checked }) => $checked ? black : white};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color ${transition.fast}, border-color ${transition.fast};
`;

const LabelText = styled.span`
  ${caption01('medium')}
  color: ${black};
`;

// =========================
// Component
// =========================

export const Checkbox = ({
                             id,
                             name,
                             checked = false,
                             label,
                             disabled = false,
                             onChange,
                             className,
                         }: CheckboxProps) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
        <StyledLabel
            htmlFor={inputId}
            $disabled={disabled}
            className={className}
        >
            <HiddenInput
                type="checkbox"
                id={inputId}
                name={name}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <CheckBox $checked={checked}>
                {checked && <Icon name="check" size="sm" color={white} />}
            </CheckBox>
            {label && <LabelText>{label}</LabelText>}
        </StyledLabel>
    );
};

export default Checkbox;