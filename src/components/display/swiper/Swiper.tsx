import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { spacing, transition, radius } from '@/styles/tokens/spacing';
import { gray, black, white } from '@/styles/tokens/color';
import { caption01 } from '@/styles/mixins/typography';
import { Icon } from '@/components/common/icon/Icon';

// =========================
// Types
// =========================

export type SwiperVariant = 'basic' | 'dot' | 'paging' | 'paging-control';
export type SwiperGap    = 'sm' | 'md' | 'lg';

export interface SwiperProps {
    slides: React.ReactNode[];
    variant?: SwiperVariant;
    gap?: SwiperGap;
    slideWidth?: number;
    peekNext?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
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
// Styled
// =========================

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  width: 100%;
  overflow: hidden;
`;

// indicator가 내부에 위치하는 경우 — position relative 필요
const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div<{ $gap: SwiperGap }>`
  display: flex;
  gap: ${({ $gap }) => gapMap[$gap]};
  cursor: grab;
  user-select: none;
  transition: transform ${transition.normal};

  &:active { cursor: grabbing; }
`;

const Slide = styled.div<{ $slideWidth: string }>`
  flex-shrink: 0;
  width: ${({ $slideWidth }) => $slideWidth};
`;

// Auto 모드
const AutoTrack = styled.div<{ $gap: SwiperGap }>`
  display: flex;
  gap: ${({ $gap }) => gapMap[$gap]};
  overflow-x: auto;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;
  &:active { cursor: grabbing; }
  &::-webkit-scrollbar { display: none; }
`;

const AutoSlide = styled.div<{ $slideWidth: number }>`
  flex-shrink: 0;
  width: ${({ $slideWidth }) => $slideWidth}px;
`;

// =========================
// Indicator — 슬라이드 내부 하단 absolute
// =========================

const IndicatorWrap = styled.div`
  position: absolute;
  bottom: ${spacing.md};
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;

  & > * { pointer-events: auto; }
`;

// Dot — 배경 없이 그대로
const DotInner = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const Dot = styled.span<{ $active: boolean }>`
  width: ${({ $active }) => $active ? spacing.md : spacing.sm};
  height: ${spacing.xs};
  border-radius: ${radius.full};
  background-color: ${({ $active }) => $active ? white : `rgba(255,255,255,0.45)`};
  transition: width ${transition.fast}, background-color ${transition.fast};
  cursor: pointer;
`;

// Paging / Control — 반투명 pill 배경
const PillBg = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radius.full};
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
`;

const PagingText = styled.span`
  ${caption01('medium')}
  color: ${white};
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
    opacity: 0.35;
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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const dragMoved = useRef(false);
    const total = slides.length;

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

    // Auto play
    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            goTo(loop ? current + 1 : current < total - 1 ? current + 1 : 0);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPlaying, current, autoPlayInterval, goTo, loop, total]);

    // Drag
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
        if (Math.abs(diff) > 40) diff < 0 ? goNext() : goPrev();
    };

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        dragMoved.current = false;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(diff) > 40) diff < 0 ? goNext() : goPrev();
    };

    // Slide width
    const getSlideWidth = () => {
        if (!wrapperRef.current) return '100%';
        const w = wrapperRef.current.offsetWidth;
        const g = parseFloat(gapMap[gap]);
        if (peekNext) return `${w - g * 2}px`;
        return `${w}px`;
    };

    const [computedSlideWidth, setComputedSlideWidth] = React.useState('100%');

    useEffect(() => {
        const update = () => setComputedSlideWidth(getSlideWidth());
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [peekNext, gap]);

    const getOffset = () => {
        const slidePx = parseFloat(computedSlideWidth);
        const gapPx = parseFloat(gapMap[gap]);
        return `${-(current * (slidePx + gapPx))}px`;
    };

    // =========================
    // Indicator render
    // =========================

    const renderIndicator = () => {
        if (variant === 'dot') {
            return (
                <IndicatorWrap>
                    <DotInner>
                        {slides.map((_, i) => (
                            <Dot key={i} $active={i === current} onClick={() => goTo(i)} />
                        ))}
                    </DotInner>
                </IndicatorWrap>
            );
        }

        if (variant === 'paging') {
            return (
                <IndicatorWrap>
                    <PillBg>
                        <PagingText>{current + 1}/{total}</PagingText>
                    </PillBg>
                </IndicatorWrap>
            );
        }

        if (variant === 'paging-control') {
            return (
                <IndicatorWrap>
                    <PillBg>
                        <ControlButton type="button" onClick={goPrev} disabled={!canPrev}>
                            <Icon name="arrow" size="sm" color={white} />
                        </ControlButton>

                        <PagingText>{current + 1}/{total}</PagingText>

                        <ControlButton
                            type="button"
                            onClick={() => setIsPlaying(prev => !prev)}
                        >
                            <Icon
                                name={isPlaying ? 'cancel_circle' : 'circle'}
                                size="sm"
                                color={white}
                            />
                        </ControlButton>

                        <ControlButton
                            type="button"
                            onClick={goNext}
                            disabled={!canNext}
                            style={{ transform: 'rotate(180deg)' }}
                        >
                            <Icon name="arrow" size="sm" color={white} />
                        </ControlButton>
                    </PillBg>
                </IndicatorWrap>
            );
        }

        return null;
    };

    // =========================
    // Auto 모드 (slideWidth 지정)
    // =========================

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
                        <AutoSlide key={i} $slideWidth={slideWidth}>
                            {slide}
                        </AutoSlide>
                    ))}
                </AutoTrack>
            </Wrapper>
        );
    }

    return (
        <Wrapper ref={wrapperRef} className={className}>
            <SlideWrapper>
                <Track
                    $gap={gap}
                    style={{ transform: `translateX(${getOffset()})` }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {slides.map((slide, i) => (
                        <Slide key={i} $slideWidth={computedSlideWidth}>
                            {slide}
                        </Slide>
                    ))}
                </Track>

                {variant !== 'basic' && renderIndicator()}
            </SlideWrapper>
        </Wrapper>
    );
};

export default Swiper;