import * as React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import { spacing } from "@/styles/tokens/spacing";
import { body02 } from "@/styles/mixins/typography";
import { gray } from "@/styles/tokens/color"

import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { TextField } from '@/components/form/textfield/TextField';
import { EmptyState } from '@/components/common/emptyState/EmptyState';
import { Title } from '@/components/common/title/Title';
import { TextButton } from '@/components/common/button/TextButton';
import { Icon } from '@/components/common/icon/Icon';

const NAV_ROUTES: Record<string, string> = {
    home:      '/',
    search:    '/search',
    shop:      '/products',
    community: '/community',
    my:        '/mypage',
};

function Search() {
    const navigate = useNavigate();
    const location = useLocation();

    const AlignRowGroup = styled.div`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: ${spacing.sm};
      margin-bottom: ${spacing.lg};
    `
    const SearchKeywordGroup = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${spacing.sm};
      padding-bottom: ${spacing.md};
      border-bottom: 1px solid ${gray[300]};
    `

    const SearchKeyword = styled.p`
      ${body02};
      color: ${gray[500]};
    `

    const DeleteButton = styled.button`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
    `;

    return (
        <AppLayout
            headerProps={{
                variant: 'back',
                title: 'Search',
                onBack: () => navigate(-1),
                actions: [{ icon: 'bag', onClick: () => navigate('/products') }],
            }}
            dockerProps={{
                variant: 'nav',
                navItems: [
                    { icon: 'home',   label: '홈',      value: 'home' },
                    { icon: 'search', label: '검색',    value: 'search' },
                    { icon: 'bag',    label: '쇼핑',    value: 'shop' },
                    { icon: 'chat',   label: '커뮤니티', value: 'community' },
                    { icon: 'user',   label: '마이',    value: 'my' },
                ],
                activeNav: 'shop',
                onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
            }}
        >

            <Section variant="line" spacing="md">
                <TextField type="search" placeholder="Search for clothes..." />
            </Section>
            <Section variant="line" spacing="md">
                <AlignRowGroup>
                    <Title variant="title03">Recent Searches</Title>
                    <TextButton color="gray-dark" size="md" underline>Clear all</TextButton>
                </AlignRowGroup>
                <Stack direction="vertical" gap="md">
                    <SearchKeywordGroup>
                        <SearchKeyword>Jeans</SearchKeyword>
                        <DeleteButton type="button">
                            <Icon name="cancel_circle" size="sm" color={gray[400]} />
                        </DeleteButton>
                    </SearchKeywordGroup>
                    <SearchKeywordGroup>
                        <SearchKeyword>Jeans</SearchKeyword>
                        <DeleteButton type="button">
                            <Icon name="cancel_circle" size="sm" color={gray[400]} />
                        </DeleteButton>
                    </SearchKeywordGroup>
                    <SearchKeywordGroup>
                        <SearchKeyword>Jeans</SearchKeyword>
                        <DeleteButton type="button">
                            <Icon name="cancel_circle" size="sm" color={gray[400]} />
                        </DeleteButton>
                    </SearchKeywordGroup>
                    <SearchKeywordGroup>
                        <SearchKeyword>Jeans</SearchKeyword>
                        <DeleteButton type="button">
                            <Icon name="cancel_circle" size="sm" color={gray[400]} />
                        </DeleteButton>
                    </SearchKeywordGroup>
                </Stack>
            </Section>
            <Section variant="default" spacing="md">
                <EmptyState type="empty" icon="search" title="검색 결과가 없어요" description="다른 키워드로 검색해보세요." />
            </Section>
            <Section variant="default" spacing="md">

            </Section>
        </AppLayout>
    )
}

export default Search;