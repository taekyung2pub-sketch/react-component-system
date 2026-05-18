import styled, { keyframes } from 'styled-components';
import { radius } from '../../../styles/tokens/spacing';

// 왼쪽에서 오른쪽으로 흐르는 세련된 스켈레톤 그라데이션 애니메이션
const pulse = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

interface SkeletonProps {
    $width?: string;
    $height?: string;
    $variant?: 'rect' | 'circle';
}

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '16px'};
  border-radius: ${({ $variant }) => ($variant === 'circle' ? '50%' : radius.md)};

  /* 밝은 회색 톤 그라데이션 (gray[200] ~ gray[100] 기반) */
  background: linear-gradient(90deg, #e4e4e7 25%, #f4f4f5 50%, #e4e4e7 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export default Skeleton;