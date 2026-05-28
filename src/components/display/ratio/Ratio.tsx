import * as React from 'react';
import styled from 'styled-components';
import { radius, size } from '@/styles/tokens/spacing';

// =========================
// Types
// =========================

export type RatioValue = '1/1' | '3/4' | '4/3' | '16/9' | '21/9' | '2/1';
export type RatioRadius = keyof typeof radius;
export type RatioWidth  = keyof typeof size;

export interface RatioProps {
    /** 비율 */
    ratio?: RatioValue;
    /** 모서리 둥글기 */
    rounded?: RatioRadius;
    /** 너비 (size 토큰 키) */
    width?: RatioWidth;
    /** 콘텐츠 (이미지, 색상 박스 등) */
    children?: React.ReactNode;
    /** 추가 className */
    className?: string;
}

// =========================
// Ratio map
// =========================

const ratioMap: Record<RatioValue, string> = {
    '1/1':  '1 / 1',
    '3/4':  '3 / 4',
    '4/3':  '4 / 3',
    '16/9': '16 / 9',
    '21/9': '21 / 9',
    '2/1':  '2 / 1',
};

// =========================
// Styled components
// =========================

const Wrapper = styled.div<{
    $ratio: RatioValue;
    $rounded?: RatioRadius;
    $width?: string;
}>`
  position: relative;
  width: ${({ $width }) => $width ? size[$width] : '100%'};
  aspect-ratio: ${({ $ratio }) => ratioMap[$ratio]};
  border-radius: ${({ $rounded }) => $rounded ? radius[$rounded] : '0'};
  overflow: hidden;
  background-color: transparent;
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// =========================
// Component
// =========================

export const Ratio = ({
                          ratio = '1/1',
                          rounded,
                          width,
                          children,
                          className,
                      }: RatioProps) => {
    return (
        <Wrapper
            $ratio={ratio}
            $rounded={rounded}
            $width={width}
            className={className}
        >
            <Inner>{children}</Inner>
        </Wrapper>
    );
};

export default Ratio;