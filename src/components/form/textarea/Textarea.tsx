import * as React from 'react';
import { useState, useEffect } from 'react';
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
    /**
     * 입력값 변경 알림 콜백
     * 값은 내부에서 관리하고, 변경 시 외부에 전달하는 용도
     */
    onValueChange?: (value: string) => void;
    /**
     * 외부에서 값 초기화 트리거
     * true로 바뀌면 내부 value를 '' 으로 리셋
     */
    shouldClear?: boolean;
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

// textarea + counter를 감싸는 relative 컨테이너
const InputWrap = styled.div<{ $height: number; $isFocused: boolean; $disabled: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ $height }) => $height}px;

  border-radius: ${radius.lg};
  border: 1px solid ${({ $isFocused, $disabled }) =>
          $disabled ? gray[200] : $isFocused ? gray[900] : gray[200]};
  background-color: ${({ $disabled }) => $disabled ? gray[100] : white};
  box-sizing: border-box;
  transition: border-color ${transition.fast};
  overflow: hidden;
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: ${spacing.md};

  border: none;
  background: transparent;

  font-size: ${fontSize.body02};
  line-height: ${lineHeight.body02};
  font-weight: ${fontWeight.regular};
  color: ${gray[900]};

  resize: none;
  outline: none;
  box-sizing: border-box;
  overflow-y: auto;

  &::placeholder {
    color: ${gray[400]};
  }

  &:disabled {
    color: ${gray[400]};
    cursor: not-allowed;
  }
`;

// 스크롤 영역 밖 하단 고정
const Counter = styled.div`
  flex-shrink: 0;
  padding: ${spacing.xs} ${spacing.md};
  background: ${white};
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
                             onValueChange,
                             shouldClear,
                             className,
                         }: TextareaProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (shouldClear) {
            setValue('');
            onValueChange?.('');
        }
    }, [shouldClear]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        onValueChange?.(e.target.value);
    };

    const hasCounter = maxLength !== undefined;

    return (
        <Wrapper className={className}>
            <InputWrap $height={height} $isFocused={isFocused} $disabled={disabled}>
                <StyledTextarea
                    placeholder={placeholder}
                    value={value}
                    maxLength={maxLength}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {hasCounter && (
                    <Counter>{value.length}/{maxLength}</Counter>
                )}
            </InputWrap>
        </Wrapper>
    );
};

export default Textarea;