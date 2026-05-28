import styled, { keyframes } from 'styled-components';
import { radius } from '@/styles/tokens/spacing';

// =========================
// Animation
// =========================

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// =========================
// Types
// =========================

export type SkeletonVariant = 'rect' | 'circle';

export interface SkeletonProps {
    /** 가로 너비 (px, % 등) */
    $width?: string;
    /** 세로 높이 (px, % 등) */
    $height?: string;
    /** 형태 (사각형 / 원형) */
    $variant?: SkeletonVariant;
}

// =========================
// Styled component
// =========================

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '16px'};
  border-radius: ${({ $variant }) => $variant === 'circle' ? '50%' : radius.md};

  background: linear-gradient(90deg, #e4e4e7 25%, #f4f4f5 50%, #e4e4e7 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite ease-in-out;
`;

export default Skeleton;