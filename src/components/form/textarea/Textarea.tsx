import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { spacing, radius, transition } from '@/styles/tokens/spacing';
import { gray, white } from '@/styles/tokens/color';
import { fontWeight, fontSize, lineHeight } from '@/styles/tokens/typography';

// =========================
// Types
// =========================

export interface TextareaProps {
    /** placeholder */
    placeholder?: string;
    /** 고정 높이 (px) */
    height?: number;
    /** 최대 글자수 (지정 시 카운터 표시) */
    maxLength?: number;
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTextarea = styled.textarea<{ $isFocused: boolean; $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  padding: ${spacing.md};

  border-radius: ${radius.lg};
  border: 1px solid ${({ $isFocused }) => $isFocused ? gray[900] : gray[200]};
  background-color: ${white};

  font-size: ${fontSize.body02};
  line-height: ${lineHeight.body02};
  font-weight: ${fontWeight.regular};
  color: ${gray[900]};

  resize: none;
  outline: none;
  box-sizing: border-box;
  transition: border-color ${transition.fast};

  &::placeholder {
    color: ${gray[400]};
  }

  &:disabled {
    background-color: ${gray[100]};
    color: ${gray[400]};
    cursor: not-allowed;
  }
`;

const Counter = styled.span`
  margin-top: ${spacing.xs};
  padding-right: ${spacing.xs};
  text-align: right;

  font-size: ${fontSize.caption01};
  line-height: ${lineHeight.caption01};
  font-weight: ${fontWeight.regular};
  color: ${gray[400]};
`;

// =========================
// Component
// =========================

export const Textarea = ({
                             placeholder,
                             height = 120,
                             maxLength,
                             disabled = false,
                             className,
                         }: TextareaProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    return (
        <Wrapper className={className}>
            <StyledTextarea
                $isFocused={isFocused}
                $height={height}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                disabled={disabled}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {maxLength !== undefined && (
                <Counter>{value.length}/{maxLength}</Counter>
            )}
        </Wrapper>
    );
};

export default Textarea;