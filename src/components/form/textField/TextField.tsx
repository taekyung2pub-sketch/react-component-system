import * as React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { spacing, radius, transition } from '../../../styles/tokens/spacing';
import { gray, white, semantic } from '../../../styles/tokens/color';
import { fontWeight, fontSize, lineHeight } from '../../../styles/tokens/typography';
import { Icon } from '../../common/icon/Icon';

// =========================
// Types
// =========================

export type TextFieldType   = 'text' | 'email' | 'password' | 'search' | 'number';
export type TextFieldStatus = 'default' | 'focus' | 'success' | 'error';

export interface TextFieldProps {
    /** input type */
    type?: TextFieldType;
    /** 입력 상태 (search 타입은 무시됨) */
    status?: TextFieldStatus;
    /** placeholder */
    placeholder?: string;
    /** 에러 메시지 (error 상태일 때 표시) */
    message?: string;
    /** 삭제 버튼 (기본 true, !disabled && !!value && type !== 'password' 일 때 노출) */
    deleteBtn?: boolean;
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
}

// =========================
// Style helpers
// =========================

const borderColorMap: Record<TextFieldStatus, string> = {
    default: gray[200],
    focus:   gray[900],
    success: semantic.success,
    error:   semantic.error,
};

const getInputBorderColor = (status: TextFieldStatus, isFocused: boolean) => {
    if (isFocused && status === 'default') return gray[900];
    return borderColorMap[status];
};

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface InputWrapperProps {
    $status: TextFieldStatus;
    $isFocused: boolean;
    $disabled: boolean;
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  height: 52px;
  padding: 0 ${spacing.md};

  border-radius: ${radius.lg};
  border: 1px solid ${({ $status, $isFocused }) => getInputBorderColor($status, $isFocused)};
  background-color: ${white};

  transition: border-color ${transition.fast};

  ${({ $disabled }) => $disabled && css`
    background-color: ${gray[100]};
    cursor: not-allowed;
  `}
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;

  font-size: ${fontSize.body02};
  line-height: ${lineHeight.body02};
  font-weight: ${fontWeight.regular};
  color: ${gray[900]};

  &::placeholder {
    color: ${gray[400]};
    font-weight: ${fontWeight.regular};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${gray[400]};
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const RightSlot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  flex-shrink: 0;
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  margin-top: ${spacing.xs};
  padding-left: ${spacing.xs};

  font-size: ${fontSize.caption01};
  line-height: ${lineHeight.caption01};
  font-weight: ${fontWeight.regular};
  color: ${semantic.error};
`;

// =========================
// Component
// =========================

export const TextField = ({
                              type = 'text',
                              status = 'default',
                              placeholder,
                              message,
                              deleteBtn = true,
                              disabled = false,
                              className,
                          }: TextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isSearch   = type === 'search';
    const isPassword = type === 'password';
    const resolvedStatus: TextFieldStatus = isSearch ? 'default' : status;

    const showDeleteBtn = deleteBtn && !!value && !disabled && !isPassword;

    const inputType = isPassword
        ? (showPassword ? 'text' : 'password')
        : isSearch ? 'text' : type;

    return (
        <Wrapper className={className}>
            <InputWrapper
                $status={resolvedStatus}
                $isFocused={isFocused}
                $disabled={disabled}
            >
                {/* search — 좌측 search 아이콘 */}
                {isSearch && (
                    <Icon name="search" size="sm" color={gray[400]} />
                )}

                <StyledInput
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <RightSlot>
                    {/* 삭제 버튼 */}
                    {showDeleteBtn && (
                        <DeleteButton type="button" onClick={() => setValue('')} tabIndex={-1}>
                            <Icon name="cancel_circle" size="sm" color={gray[400]} />
                        </DeleteButton>
                    )}

                    {/* search — 우측 mic 아이콘 */}
                    {isSearch && (
                        <Icon name="mic" size="sm" color={gray[400]} />
                    )}

                    {/* password — eye 토글 + 상태 아이콘 */}
                    {isPassword && (
                        <>
                            <ToggleButton
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                <Icon
                                    name={showPassword ? 'eye' : 'eye_off'}
                                    size="sm"
                                    color={gray[400]}
                                />
                            </ToggleButton>
                            {status === 'success' && (
                                <Icon name="check_circle" size="sm" color={semantic.success} />
                            )}
                            {status === 'error' && (
                                <Icon name="warning_circle" size="sm" color={semantic.error} />
                            )}
                        </>
                    )}

                    {/* 일반 타입 — success 아이콘 */}
                    {!isSearch && !isPassword && status === 'success' && (
                        <Icon name="check_circle" size="sm" color={semantic.success} />
                    )}

                    {/* 일반 타입 — error 아이콘 */}
                    {!isSearch && !isPassword && status === 'error' && (
                        <Icon name="warning_circle" size="sm" color={semantic.error} />
                    )}
                </RightSlot>
            </InputWrapper>

            {/* error 메시지 */}
            {!isSearch && status === 'error' && message && (
                <ErrorMessage>{message}</ErrorMessage>
            )}
        </Wrapper>
    );
};

export default TextField;