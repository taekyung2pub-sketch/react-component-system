import styled, { css } from 'styled-components';

import {
    title02,
    body01,
    body02,
    body03,
    body04,
    caption02,
} from '@/styles/mixins/typography.ts';

// =========================
// GuideWrap
// =========================

export const GuideWrap = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.color.surface[2]};
  color: ${({ theme }) => theme.color.gray[900]};

  ${body03()}

  && span, && div, && p, && li {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: revert;
    line-height: revert;
  }
`;

// =========================
// Header
// =========================

export const GuideHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const GuideChip = styled.span`
  display: inline-flex;
  align-items: center;

  height: 28px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  border-radius: ${({ theme }) => theme.radius.full};

  background: ${({ theme }) => theme.color.primary[1]};
  color: ${({ theme }) => theme.color.white};

  ${caption02('medium')}
`;

export const GuideTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  ${title02()}
`;

export const GuideDesc = styled.p`
  color: ${({ theme }) => theme.color.gray[600]};

  ${body03()}
`;

// =========================
// Section
// =========================

export const GuideSection = styled.section`
  & + & {
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  ${body01('semibold')}
`;

// =========================
// Card
// =========================

export const GuideCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  border: 1px solid ${({ theme }) => theme.color.border[1]};
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.color.surface[1]};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  p + p {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

// =========================
// Composition
// =========================

export const GuideComposition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

export const CompositionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CompositionBox = styled.div<{ $active?: boolean }>`
  min-width: 140px;
  padding: ${({ theme }) => theme.spacing.md};

  border: 1px solid ${({ theme }) => theme.color.border[1]};
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.color.surface[2]};
  text-align: center;


  font-size: 13px !important;       /* body04 font-size */
  line-height: 20px !important;     /* body04 line-height */
  font-weight: 400 !important;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif !important;

  ${({ theme, $active }) =>
    $active &&
    css`
      border-color: ${theme.color.primary[1]};
      background: ${theme.color.primary[1]}14;
      color: ${theme.color.primary[3]};
    `}
`;

export const CompositionArrow = styled.span`
  color: ${({ theme }) => theme.color.gray[400]};

  ${body02('medium')}
`;

// =========================
// Notes
// =========================

export const GuideNotes = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.xl};

  > li {
    padding-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.color.border[1]};

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  strong {
    display: block;
    margin-bottom: 2px;
    color: ${({ theme }) => theme.color.gray[900]};

    ${body03('semibold')}
  }

  p {
    color: ${({ theme }) => theme.color.gray[600]} !important;
    font-size: 13px !important;       /* body04 font-size */
    line-height: 20px !important;     /* body04 line-height */
    font-weight: 400 !important;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif !important;
  }
`;

// =========================
// Text List / Number List
// =========================

const listBase = css`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.color.gray[700]};

  ${body03()}

  li {
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    padding-left: 0;
    list-style: none;
    -webkit-font-smoothing: inherit;
  }
`;

export const GuideTextList = styled.ul`
  padding-left: 0;
  ${listBase}
  
  li {
    position: relative;
    padding-left: 14px;

    font-size: 13px !important;       /* body04 font-size */
    line-height: 20px !important;     /* body04 line-height */
    font-weight: 400 !important;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif !important;

    &::before {
      content: '-';
      position: absolute;
      top: 0;
      left: 0;
      color: ${({ theme }) => theme.color.gray[800]};
    }
  }
`;

export const GuideNumberList = styled.ol`
  padding-left: 20px;
  ${listBase}
  
  li {
    list-style: decimal;

    ${body03()}

    &::marker {
      color: ${({ theme }) => theme.color.gray[800]};

      font-size: 13px !important;       /* body04 font-size */
      line-height: 20px !important;     /* body04 line-height */
      font-weight: 500 !important;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }
  }
`;