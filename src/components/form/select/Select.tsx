import * as React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { spacing, radius, transition } from '../../../styles/tokens/spacing';
import { gray, white } from '../../../styles/tokens/color';
import { fontWeight, fontSize, lineHeight } from '../../../styles/tokens/typography';
import { Icon } from '../../common/icon/Icon';

// =========================
// Types
// =========================

export type SelectVariant = 'box' | 'text';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps {
    /** 스타일 variant (box — TextField 스타일 / text — 텍스트 + 화살표) */
    variant?: SelectVariant;
    /** placeholder */
    placeholder?: string;
    /** 옵션 목록 */
    options?: SelectOption[];
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components — Box
// =========================

const BoxWrapper = styled.div<{ $disabled: boolean }>`
  position: relative;
  width: 100%;

  ${({ $disabled }) => $disabled && css`
    pointer-events: none;
    opacity: 0.4;
  `}
`;

const BoxSelect = styled.select<{ $hasValue: boolean }>`
  width: 100%;
  height: 52px;
  padding: 0 ${spacing.xl} 0 ${spacing.md};

  border-radius: ${radius.lg};
  border: 1px solid ${gray[200]};
  background-color: ${white};

  font-size: ${fontSize.body02};
  line-height: ${lineHeight.body02};
  font-weight: ${({ $hasValue }) => $hasValue ? fontWeight.medium : fontWeight.regular};
  color: ${({ $hasValue }) => $hasValue ? gray[900] : gray[400]};

  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  transition: border-color ${transition.fast};

  &:focus {
    border-color: ${gray[900]};
  }

  &:disabled {
    background-color: ${gray[100]};
    cursor: not-allowed;
  }
`;

const BoxIconWrapper = styled.div`
  position: absolute;
  width: ${spacing.md};
  height: ${spacing.md};
  right: ${spacing.md};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

// =========================
// Styled components — Text
// =========================

const TextWrapper = styled.div<{ $disabled: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 120px;

  ${({ $disabled }) => $disabled && css`
    pointer-events: none;
    opacity: 0.4;
  `}
`;

const TextSelect = styled.select<{ $hasValue: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;

  flex: 1;
  max-width: 100%;
  padding-right: ${spacing.md};

  font-size: ${fontSize.body02};
  line-height: ${lineHeight.body02};
  font-weight: ${({ $hasValue }) => $hasValue ? fontWeight.medium : fontWeight.regular};
  color: ${({ $hasValue }) => $hasValue ? gray[900] : gray[400]};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TextIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

// =========================
// Component
// =========================

export const Select = ({
                           variant = 'box',
                           placeholder = '선택하세요',
                           options = [],
                           disabled = false,
                           className,
                       }: SelectProps) => {
    const [value, setValue] = useState('');
    const hasValue = !!value;

    if (variant === 'text') {
        return (
            <TextWrapper $disabled={disabled} className={className}>
                <TextSelect
                    $hasValue={hasValue}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => setValue(e.target.value)}
                >
                    <option value="" disabled hidden>{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </TextSelect>
                <TextIconWrapper>
                    <Icon name="chevron" size="xs" color={gray[900]} />
                </TextIconWrapper>
            </TextWrapper>
        );
    }

    return (
        <BoxWrapper $disabled={disabled} className={className}>
            <BoxSelect
                $hasValue={hasValue}
                value={value}
                disabled={disabled}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="" disabled hidden>{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </BoxSelect>
            <BoxIconWrapper>
                <Icon name="chevron" size="sm" color={gray[900]} />
            </BoxIconWrapper>
        </BoxWrapper>
    );
};

export default Select;