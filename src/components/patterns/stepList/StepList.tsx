import * as React from 'react';
import { Skeleton } from '../../overlay/skeleton/Skeleton';
import styled, { css } from 'styled-components';
import { spacing, radius, transition } from '../../../styles/tokens/spacing';
import { gray, white, primary, black } from '../../../styles/tokens/color';
import { body03, body04, caption01 } from '../../../styles/mixins/typography';

// =========================
// Types
// =========================

export type StepListVariant = 'horizontal' | 'vertical';

export interface StepItem {
    title: string;
    desc?: string;
}

export interface StepListProps {
    variant?: StepListVariant;
    items: StepItem[];
    current?: number;
    /** 로딩 상태 */
    isLoading?: boolean;
    /** 로딩 시 표시할 skeleton 개수 */
    skeletonCount?: number;
    className?: string;
}

type StepStatus = 'done' | 'current' | 'pending';

const getStatus = (index: number, current: number): StepStatus => {
    if (index < current) return 'done';
    if (index === current) return 'current';
    return 'pending';
};

// =========================
// Horizontal styled
// =========================

const HContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  width: 100%;
`;

// 트래커: dot들을 균등 간격으로, dot 사이 라인으로 연결
const HTrackRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// dot 사이를 연결하는 라인 (absolute로 트래커 전체에 걸쳐 배치)
const HLineWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 0;
`;

const HLine = styled.div<{ $active: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ $active }) => $active ? primary[2] : gray[200]};
  transition: background-color ${transition.normal};
`;

const HDot = styled.div<{ $status: StepStatus }>`
  position: relative;
  z-index: 1;
  width: 12px;
  height: 12px;
  border-radius: ${radius.full};
  flex-shrink: 0;
  transition: all ${transition.normal};

  ${({ $status }) => {
    if ($status === 'done') return css`
      background-color: ${primary[2]};
      border: 2px solid ${primary[2]};
    `;
    if ($status === 'current') return css`
      background-color: ${white};
      border: 3px solid ${primary[2]};
      box-shadow: 0 0 0 3px ${primary[1]}44;
    `;
    return css`
      background-color: ${gray[300]};
      border: 2px solid ${gray[300]};
    `;
  }}
`;

const HList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const HListItem = styled.li<{ $status: StepStatus }>`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  opacity: ${({ $status }) => $status === 'pending' ? 0.4 : 1};
  transition: opacity ${transition.normal};
`;

const HListNum = styled.span<{ $status: StepStatus }>`
  ${body04('regular')}
  color: ${({ $status }) => $status === 'current' ? primary[2] : gray[500]};
  flex-shrink: 0;
`;

const HListText = styled.span<{ $status: StepStatus }>`
  ${body04()}
  font-weight: ${({ $status }) => $status === 'current' ? 700 : 400};
  color: ${({ $status }) => $status === 'current' ? black : gray[700]};
`;

// =========================
// Vertical styled
// =========================

const VWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// VStep에 padding-bottom, VLine이 이 높이 전체를 채움
const VStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.sm};
`;

const VIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  align-self: stretch;
`;

const VDot = styled.div<{ $status: StepStatus }>`
  width: 16px;
  height: 16px;
  border-radius: ${radius.full};
  flex-shrink: 0;
  transition: all ${transition.normal};

  ${({ $status }) => {
    if ($status === 'done') return css`
      background-color: ${primary[2]};
      border: 2px solid ${primary[2]};
    `;
    if ($status === 'current') return css`
      background-color: ${white};
      border: 3px solid ${primary[2]};
      box-shadow: 0 0 0 3px ${primary[1]}44;
    `;
    return css`
      background-color: ${white};
      border: 2px solid ${gray[300]};
    `;
  }}
`;

const VLine = styled.div<{ $active: boolean }>`
  flex: 1;
  width: 2px;
  margin: 2px 0;
  background-image: ${({ $active }) => `repeating-linear-gradient(
    to bottom,
    ${$active ? primary[2] : gray[200]} 0px,
    ${$active ? primary[2] : gray[200]} 4px,
    transparent 4px,
    transparent 8px
  )`};
`;

const VContent = styled.div<{ $status: StepStatus; $last: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  padding-bottom: ${({ $last }) => $last ? '0' : spacing.md};
  opacity: ${({ $status }) => $status === 'pending' ? 0.4 : 1};
  transition: opacity ${transition.normal};
`;

const VTitle = styled.span<{ $status: StepStatus }>`
  ${body03()}
  font-weight: ${({ $status }) => $status === 'current' ? 700 : 400};
  color: ${gray[900]};
`;

const VDesc = styled.span`
  ${caption01('regular')}
  color: ${gray[400]};
`;

// =========================
// Component
// =========================

export const StepList = ({
                             variant = 'horizontal',
                             items,
                             current = 0,
                             isLoading = false,
                             skeletonCount = 4,
                             className,
                         }: StepListProps) => {

    if (isLoading) {
        return (
            <VWrapper className={className}>
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <VStep key={i}>
                        <VIndicator>
                            <Skeleton $width="16px" $height="16px" $variant="circle" />
                            {i < skeletonCount - 1 && <Skeleton $width="2px" $height="32px" />}
                        </VIndicator>
                        <VContent $status="done" $last={i === skeletonCount - 1}>
                            <Skeleton $width="40%" $height="14px" />
                            <Skeleton $width="75%" $height="12px" />
                        </VContent>
                    </VStep>
                ))}
            </VWrapper>
        );
    }

    if (variant === 'horizontal') {
        return (
            <HContainer className={className}>
                {/* 트래커 */}
                <HTrackRow>
                    {/* 라인 레이어 (absolute) */}
                    <HLineWrapper>
                        {items.map((_, i) => {
                            if (i === items.length - 1) return null;
                            const leftStatus = getStatus(i, current);
                            const rightStatus = getStatus(i + 1, current);
                            return (
                                <HLine
                                    key={i}
                                    $active={leftStatus === 'done' && rightStatus !== 'pending' || leftStatus === 'done'}
                                />
                            );
                        })}
                    </HLineWrapper>

                    {/* dot 레이어 */}
                    {items.map((_, i) => (
                        <HDot key={i} $status={getStatus(i, current)} />
                    ))}
                </HTrackRow>

                {/* 번호 리스트 */}
                <HList>
                    {items.map((item, i) => {
                        const status = getStatus(i, current);
                        return (
                            <HListItem key={i} $status={status}>
                                <HListNum $status={status}>{i + 1}.</HListNum>
                                <HListText $status={status}>{item.title}</HListText>
                            </HListItem>
                        );
                    })}
                </HList>
            </HContainer>
        );
    }

    return (
        <VWrapper className={className}>
            {items.map((item, i) => {
                const status = getStatus(i, current);
                const isLast = i === items.length - 1;

                return (
                    <VStep key={i}>
                        <VIndicator>
                            <VDot $status={status} />
                            {!isLast && <VLine $active={status === 'done'} />}
                        </VIndicator>
                        <VContent $status={status} $last={isLast}>
                            <VTitle $status={status}>{item.title}</VTitle>
                            {item.desc && <VDesc>{item.desc}</VDesc>}
                        </VContent>
                    </VStep>
                );
            })}
        </VWrapper>
    );
};

export default StepList;