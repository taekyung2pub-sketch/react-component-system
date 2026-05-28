import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { gray, semantic } from '@/styles/tokens/color';
import { body02 } from '@/styles/mixins/typography.ts'
import { Icon } from '@/components/common/icon/Icon';
import { IconName } from '@/components/common/icon/iconMap';
import { Title } from '@/components/common/title/Title';

// =========================
// Types
// =========================

export type EmptyStateType = 'empty' | 'success' | 'fail';

export interface EmptyStateProps {
    /** 상태 타입 */
    type?: EmptyStateType;
    /** 아이콘 오버라이드 (미지정 시 type 기본값 사용) */
    icon?: IconName;
    /** 타이틀 텍스트 */
    title?: string;
    /** 서브텍스트 */
    description?: string;
    /** 추가 className */
    className?: string;
}

// =========================
// Default values per type
// =========================

const defaultMap: Record<EmptyStateType, {
    icon: IconName;
    title: string;
    description: string;
}> = {
    empty: {
        icon: 'box',
        title: '데이터가 없어요',
        description: '아직 표시할 내용이 없습니다.',
    },
    success: {
        icon: 'check_circle',
        title: '완료되었어요',
        description: '요청이 성공적으로 처리되었습니다.',
    },
    fail: {
        icon: 'warning_circle',
        title: '오류가 발생했어요',
        description: '잠시 후 다시 시도해 주세요.',
    },
};

const iconColorMap: Record<EmptyStateType, string> = {
    empty:   gray[400],
    success: semantic.success,
    fail:    semantic.error,
};

// =========================
// Styled component
// =========================

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TextWrapper = styled.div`
  margin-top: ${spacing.lg};
`;

const Description = styled.div`
  margin-top: ${spacing.md};
  text-align: center;
  ${body02('medium')};
  color: ${gray[500]};
`;

// =========================
// Component
// =========================

export const EmptyState = ({
                               type = 'empty',
                               icon,
                               title,
                               description,
                               className,
                           }: EmptyStateProps) => {
    const defaults = defaultMap[type];
    const iconName = icon ?? defaults.icon;
    const iconColor = iconColorMap[type];
    const titleText = title ?? defaults.title;
    const descriptionText = description ?? defaults.description;

    return (
        <Container className={className}>
            <Icon name={iconName} size="xl" color={iconColor as any} />
            <TextWrapper>
                <Title variant="title03" align="center">
                    {titleText}
                </Title>
                <Description>
                    {descriptionText}
                </Description>
            </TextWrapper>
        </Container>
    );
};

export default EmptyState;