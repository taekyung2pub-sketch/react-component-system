import * as React from 'react';
import styled from 'styled-components';
import { spacing, size } from '../../../styles/tokens/spacing';
import { black, white } from '../../../styles/tokens/color';
import { title03 } from '../../../styles/mixins/typography';
import { Icon } from '../../common/icon/Icon';
import { IconName } from '../../common/icon/iconMap';

// =========================
// Types
// =========================

export type HeaderVariant = 'main' | 'default' | 'back';

export interface HeaderAction {
    icon: IconName;
    onClick?: () => void;
}

export interface HeaderProps {
    /** main — 로고+우측 아이콘 / default — 뒤로가기+타이틀+우측 아이콘 / back — 뒤로가기만 */
    variant?: HeaderVariant;
    /** 페이지 타이틀 (default variant) */
    title?: string;
    /** 로고 (main variant) */
    logo?: React.ReactNode;
    /** 우측 아이콘 버튼 목록 (유동적) */
    actions?: HeaderAction[];
    /** 뒤로가기 클릭 핸들러 */
    onBack?: () => void;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components
// =========================

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${size.xs};
  padding: 0 ${spacing.md};
  background-color: ${white};
  position: relative;
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: ${size['2xs']};
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
`;

const TitleText = styled.span`
  ${title03('semibold')}
  color: ${black};
  white-space: nowrap;
`;

const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${size['2xs']};
  height: ${size['2xs']};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
`;

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

// =========================
// Component
// =========================

export const Header = ({
                           variant = 'default',
                           title,
                           logo,
                           actions = [],
                           onBack,
                           className,
                       }: HeaderProps) => {

    const backButton = (
        <IconBtn type="button" onClick={onBack}>
            <Icon name="arrow" size="lg" color={black} />
        </IconBtn>
    );

    const actionButtons = actions.map((action, i) => (
        <IconBtn key={i} type="button" onClick={action.onClick}>
            <Icon name={action.icon} size="lg" color={black} />
        </IconBtn>
    ));

    // =========================
    // main — 로고 + 우측 아이콘
    // =========================
    if (variant === 'main') {
        return (
            <Wrapper className={className}>
                <Side>
                    <LogoWrapper>{logo}</LogoWrapper>
                </Side>
                <Side style={{ justifyContent: 'flex-end' }}>
                    {actionButtons}
                </Side>
            </Wrapper>
        );
    }

    // =========================
    // back — 뒤로가기만
    // =========================
    if (variant === 'back') {
        return (
            <Wrapper className={className}>
                <Side>{backButton}</Side>
                <Side />
            </Wrapper>
        );
    }

    // =========================
    // default — 뒤로가기 + 타이틀 + 우측 아이콘
    // =========================
    return (
        <Wrapper className={className}>
            <Side>{backButton}</Side>
            <Center>
                {title && <TitleText>{title}</TitleText>}
            </Center>
            <Side style={{ justifyContent: 'flex-end' }}>
                {actionButtons}
            </Side>
        </Wrapper>
    );
};

export default Header;