import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '@/styles/tokens/spacing';
import { gray, black } from '@/styles/tokens/color';
import { ColorToken } from '@/styles/tokens/color';
import { body03, body02 } from '@/styles/mixins/typography';

// =========================
// Types
// =========================

export interface TableRow {
    /** 왼쪽 라벨 */
    label: React.ReactNode;
    /** 오른쪽 값 */
    value: React.ReactNode;
    /** 라벨 색상 */
    labelColor?: ColorToken;
    /** 값 색상 */
    valueColor?: ColorToken;
}

export interface TableFooter {
    /** 푸터 왼쪽 라벨 */
    label: React.ReactNode;
    /** 푸터 오른쪽 값 */
    value: React.ReactNode;
    /** 라벨 색상 */
    labelColor?: ColorToken;
    /** 값 색상 */
    valueColor?: ColorToken;
}

export interface TableProps {
    /** 테이블 행 목록 */
    rows: TableRow[];
    /** 푸터 (구분선 + 합계 영역) */
    footer?: TableFooter;
    /** 추가 className */
    className?: string;
}

// =========================
// Styled components
// =========================

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
`;

const LabelCell = styled.span<{ $color?: ColorToken }>`
  ${body03('regular')}
  color: ${({ $color }) => $color ?? gray[700]};
`;

const ValueCell = styled.span<{ $color?: ColorToken }>`
  ${body03('medium')}
  color: ${({ $color }) => $color ?? gray[900]};
  text-align: right;
  flex-shrink: 0;
`;

const Divider = styled.div`
  margin: ${spacing.md} 0;
  border: none;
  border-top: 1px dashed ${gray[200]};
`;

const FooterRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
`;

const FooterLabel = styled.span<{ $color?: ColorToken }>`
  ${body02('medium')}
  color: ${({ $color }) => $color ?? black};
`;

const FooterValue = styled.span<{ $color?: ColorToken }>`
  ${body02('bold')}
  color: ${({ $color }) => $color ?? black};
  text-align: right;
  flex-shrink: 0;
`;

// =========================
// Component
// =========================

export const Table = ({ rows, footer, className }: TableProps) => {
    return (
        <Wrapper className={className}>
            <Body>
                {rows.map((row, i) => (
                    <Row key={i}>
                        <LabelCell $color={row.labelColor}>{row.label}</LabelCell>
                        <ValueCell $color={row.valueColor}>{row.value}</ValueCell>
                    </Row>
                ))}
            </Body>

            {footer && (
                <>
                    <Divider />
                    <FooterRow>
                        <FooterLabel $color={footer.labelColor}>{footer.label}</FooterLabel>
                        <FooterValue $color={footer.valueColor}>{footer.value}</FooterValue>
                    </FooterRow>
                </>
            )}
        </Wrapper>
    );
};

export default Table;