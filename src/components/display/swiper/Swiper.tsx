import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { spacing, transition, radius } from '../../../styles/tokens/spacing';
import { gray, black } from '../../../styles/tokens/color';
import { caption01 } from '../../../styles/mixins/typography';
import { Icon } from '../../common/icon/Icon';

// =========================
// Types
// =========================

export type SwiperVariant = 'basic' | 'dot' | 'paging' | 'paging-control';
export type SwiperGap    = 'sm' | 'md' | 'lg';

export interface SwiperProps {
    /** 슬라이드 목록 */
    slides: React.ReactNode[];
    /** 인디케이터 variant */
    variant?: SwiperVariant;
    /** 슬라이드 간격 */
    gap?: SwiperGap;
    /**
     * 슬라이드 고정 너비 (px 단위 숫자)
     * 지정 시 auto 모드 — 여러 슬라이드가 보이며 자유롭게 드래그 스크롤
     * 미지정 시 컨테이너 너비에 맞춰 1개씩 표시
     */
    slideWidth?: number;
    /** 다음 슬라이드 살짝 보이기 */
    peekNext?: boolean;
    /** 자동 재생 */
    autoPlay?: boolean;
    /** 자동 재생 간격 (ms) */
    autoPlayInterval?: number;
    /** 무한 루프 */
    loop?: boolean;
    /** 추가 className */
    className?: string;
}

// =========================
// Token maps
// =========================

const gapMap: Record<SwiperGap, string> = {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
};

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div<{ $gap: SwiperGap; $peekNext: boolean }>`
  display: flex;
  gap: ${({ $gap }) => gapMap[$gap]};
  cursor: grab;
  user-select: none;
  transition: transform ${transition.normal};

  &:active {
    cursor: grabbing;
  }
`;

const Slide = styled.div<{ $peekNext: boolean; $gap: SwiperGap; $slideWidth: string }>`
  flex-shrink: 0;
  width: ${({ $slideWidth }) => $slideWidth};
`;

// --- Auto Track (자유 스크롤) ---

const AutoTrack = styled.div<{ $gap: SwiperGap }>`
  display: flex;
  gap: ${({ $gap }) => gapMap[$gap]};
  overflow-x: auto;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AutoSlide = styled.div<{ $slideWidth: number }>`
  flex-shrink: 0;
  width: ${({ $slideWidth }) => $slideWidth}px;
`;

// --- Dot ---

const DotWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
`;

const Dot = styled.span<{ $active: boolean }>`
  width: ${({ $active }) => $active ? spacing.md : spacing.sm};
  height: ${spacing.xs};
  border-radius: ${radius.full};
  background-color: ${({ $active }) => $active ? black : gray[300]};
  transition: width ${transition.fast}, background-color ${transition.fast};
`;

// --- Paging ---

const PagingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PagingText = styled.span`
  ${caption01('medium')}
  color: ${gray[500]};
`;

// --- Paging Control ---

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md};
`;

const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

// =========================
// Component
// =========================

export const Swiper = ({
                           slides,
                           variant = 'basic',
                           gap = 'md',
                           slideWidth,
                           peekNext = false,
                           autoPlay = false,
                           autoPlayInterval = 3000,
                           loop = false,
                           className,
                       }: SwiperProps) => {
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const trackRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const dragMoved = useRef(false);
    const total = slides.length;

    // =========================
    // Navigation
    // =========================

    const goTo = useCallback((index: number) => {
        if (loop) {
            setCurrent((index + total) % total);
        } else {
            setCurrent(Math.max(0, Math.min(index, total - 1)));
        }
    }, [loop, total]);

    const goPrev = () => goTo(current - 1);
    const goNext = () => goTo(current + 1);

    const canPrev = loop || current > 0;
    const canNext = loop || current < total - 1;

    // =========================
    // Auto play
    // =========================

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            goTo(loop ? current + 1 : current < total - 1 ? current + 1 : 0);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPlaying, current, autoPlayInterval, goTo, loop, total]);

    // =========================
    // Drag
    // =========================

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        dragMoved.current = false;
        startX.current = e.clientX;
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        if (Math.abs(e.clientX - startX.current) > 4) dragMoved.current = true;
    };

    const onMouseUp = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diff = e.clientX - startX.current;
        if (Math.abs(diff) > 40) {
            diff < 0 ? goNext() : goPrev();
        }
    };

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        dragMoved.current = false;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(diff) > 40) {
            diff < 0 ? goNext() : goPrev();
        }
    };

    // =========================
    // Slide width
    // =========================

    const getSlideWidth = () => {
        if (!wrapperRef.current) return '100%';
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const gapPx = parseFloat(gapMap[gap]);
        if (peekNext) return `${wrapperWidth - gapPx * 2}px`;
        return `${wrapperWidth}px`;
    };

    const [computedSlideWidth, setComputedSlideWidth] = React.useState('100%');

    useEffect(() => {
        const update = () => setComputedSlideWidth(getSlideWidth());
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [peekNext, gap]);

    // =========================
    // Track offset
    // =========================

    const getOffset = () => {
        const slidePx = parseFloat(computedSlideWidth);
        const gapPx = parseFloat(gapMap[gap]);
        return `${-(current * (slidePx + gapPx))}px`;
    };

    // =========================
    // Render indicator
    // =========================

    const renderIndicator = () => {
        if (variant === 'dot') {
            return (
                <DotWrapper>
                    {slides.map((_, i) => (
                        <Dot key={i} $active={i === current} onClick={() => goTo(i)} style={{ cursor: 'pointer' }} />
                    ))}
                </DotWrapper>
            );
        }

        if (variant === 'paging') {
            return (
                <PagingWrapper>
                    <PagingText>{current + 1}/{total}</PagingText>
                </PagingWrapper>
            );
        }

        if (variant === 'paging-control') {
            return (
                <ControlWrapper>
                    <ControlButton type="button" onClick={goPrev} disabled={!canPrev}>
                        <Icon name="arrow" size="sm" color={canPrev ? black : gray[300]} />
                    </ControlButton>

                    <PagingText>{current + 1}/{total}</PagingText>

                    <ControlButton
                        type="button"
                        onClick={() => setIsPlaying((prev) => !prev)}
                    >
                        <Icon
                            name={isPlaying ? 'cancel_circle' : 'circle'}
                            size="sm"
                            color={black}
                        />
                    </ControlButton>

                    <ControlButton
                        type="button"
                        onClick={goNext}
                        disabled={!canNext}
                        style={{ transform: 'rotate(180deg)' }}
                    >
                        <Icon name="arrow" size="sm" color={canNext ? black : gray[300]} />
                    </ControlButton>
                </ControlWrapper>
            );
        }

        return null;
    };

    // auto 모드 — slideWidth 지정 시 자유 드래그 스크롤
    const autoTrackRef = useRef<HTMLDivElement>(null);
    const autoStartX = useRef(0);
    const autoScrollLeft = useRef(0);
    const autoIsDragging = useRef(false);

    const onAutoMouseDown = (e: React.MouseEvent) => {
        if (!autoTrackRef.current) return;
        autoIsDragging.current = true;
        autoStartX.current = e.pageX - autoTrackRef.current.offsetLeft;
        autoScrollLeft.current = autoTrackRef.current.scrollLeft;
    };

    const onAutoMouseMove = (e: React.MouseEvent) => {
        if (!autoIsDragging.current || !autoTrackRef.current) return;
        e.preventDefault();
        const x = e.pageX - autoTrackRef.current.offsetLeft;
        autoTrackRef.current.scrollLeft = autoScrollLeft.current - (x - autoStartX.current);
    };

    const onAutoMouseUp = () => { autoIsDragging.current = false; };

    if (slideWidth) {
        return (
            <Wrapper className={className}>
                <AutoTrack
                    ref={autoTrackRef}
                    $gap={gap}
                    onMouseDown={onAutoMouseDown}
                    onMouseMove={onAutoMouseMove}
                    onMouseUp={onAutoMouseUp}
                    onMouseLeave={onAutoMouseUp}
                >
                    {slides.map((slide, i) => (
                        <AutoSlide key={i} $slideWidth={slideWidth as number}>
                            {slide}
                        </AutoSlide>
                    ))}
                </AutoTrack>
            </Wrapper>
        );
    }

    return (
        <Wrapper ref={wrapperRef} className={className}>
            <div style={{ overflow: 'hidden' }}>
                <Track
                    ref={trackRef}
                    $gap={gap}
                    $peekNext={peekNext}
                    style={{ transform: `translateX(${getOffset()})` }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {slides.map((slide, i) => (
                        <Slide key={i} $peekNext={peekNext} $gap={gap} $slideWidth={computedSlideWidth}>
                            {slide}
                        </Slide>
                    ))}
                </Track>
            </div>

            {variant !== 'basic' && renderIndicator()}
        </Wrapper>
    );
};

export default Swiper;