import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { Button } from '@/components/common/button/Button';
import { Checkbox } from '@/components/form/checkbox/Checkbox';
import { Stack } from '@/components/layout/stack/Stack';
import { spacing } from '@/styles/tokens/spacing';
import { gray } from '@/styles/tokens/color';
import { caption01 } from '@/styles/mixins/typography';

// =========================
// Types
// =========================

export interface FilterState {
    categories: string[];
    priceRange: string;
    sort: string;
}

export interface PopFilterProps {
    onClose: () => void;
    onApply: (filter: FilterState) => void;
    initialFilter?: Partial<FilterState>;
}

// =========================
// Options
// =========================

const categoryOptions = [
    { label: 'Tops',    value: 'tops' },
    { label: 'Bottoms', value: 'bottoms' },
    { label: 'Outer',   value: 'outer' },
    { label: 'Acc',     value: 'acc' },
    { label: 'Shoes',   value: 'shoes' },
];

const priceOptions = [
    { label: '전체',          value: 'all' },
    { label: '5만원 이하',    value: 'under_50k' },
    { label: '5~10만원',      value: '50k_100k' },
    { label: '10만원 이상',   value: 'over_100k' },
];

// =========================
// Styled
// =========================

const FilterSection = styled.div`
  & + & {
    margin-top: ${spacing.lg};
    padding-top: ${spacing.lg};
    border-top: 1px solid ${gray[100]};
  }
`;

const FilterLabel = styled.p`
  ${caption01('medium')}
  color: ${gray[500]};
  margin-bottom: ${spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const PriceChip = styled.button<{ $active: boolean }>`
  height: 34px;
  padding: 0 ${spacing.md};
  border-radius: 999px;
  border: 1px solid ${({ $active }) => $active ? gray[900] : gray[200]};
  background: ${({ $active }) => $active ? gray[900] : 'transparent'};
  color: ${({ $active }) => $active ? '#fff' : gray[600]};
  ${caption01('medium')}
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
`;

// =========================
// Component
// =========================

export const PopFilter = ({ onClose, onApply, initialFilter }: PopFilterProps) => {
    const [categories, setCategories] = useState<string[]>(initialFilter?.categories ?? []);
    const [priceRange, setPriceRange] = useState(initialFilter?.priceRange ?? 'all');

    const toggleCategory = (value: string) => {
        setCategories(prev =>
            prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
        );
    };

    const handleReset = () => {
        setCategories([]);
        setPriceRange('all');
    };

    const handleApply = () => {
        onApply({ categories, priceRange, sort: '' });
        onClose();
    };

    return (
        <BottomSheet
            title="필터"
            onClose={onClose}
            body={
                <div>
                    {/* 카테고리 */}
                    <FilterSection>
                        <FilterLabel>카테고리</FilterLabel>
                        <Stack direction="vertical" gap="sm">
                            {categoryOptions.map(opt => (
                                <Checkbox
                                    key={opt.value}
                                    label={opt.label}
                                    checked={categories.includes(opt.value)}
                                    onChange={() => toggleCategory(opt.value)}
                                />
                            ))}
                        </Stack>
                    </FilterSection>

                    {/* 가격대 */}
                    <FilterSection>
                        <FilterLabel>가격대</FilterLabel>
                        <Stack direction="horizontal" gap="sm">
                            {priceOptions.map(opt => (
                                <PriceChip
                                    key={opt.value}
                                    type="button"
                                    $active={priceRange === opt.value}
                                    onClick={() => setPriceRange(opt.value)}
                                >
                                    {opt.label}
                                </PriceChip>
                            ))}
                        </Stack>
                    </FilterSection>
                </div>
            }
            footer={
                <Stack direction="horizontal" gap="sm">
                    <Button size="lg" variant="outline" color="gray-dark" fullWidth onClick={handleReset}>
                        초기화
                    </Button>
                    <Button size="lg" color="gray-dark" fullWidth onClick={handleApply}>
                        적용하기
                    </Button>
                </Stack>
            }
        />
    );
};

export default PopFilter;