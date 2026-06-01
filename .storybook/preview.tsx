import * as React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';
import GlobalStyle from '../src/styles/global/GlobalStyle';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
        options: {
            storySort: {
                order: [
                    'Design System',
                    'Guide',
                    'Component', [
                        'Common', ['Title', 'Icon', 'Badge', 'Button', 'TextButton', 'EmptyState'],
                        'Form', ['Checkbox', 'Radio', 'Toggle', 'TextField', 'Textarea', 'Select', 'Stepper'],
                        'Display', ['Ratio', 'Tab', 'Accordion', 'Table', 'Swiper'],
                        'Product', ['Price', 'Rating', 'ProdItem'],
                        'Patterns', ['ProductList', 'FeedList', 'StepList'],
                        'Overlay', ['Skeleton', 'Toast', 'Alert', 'BottomSheet'],
                        'Layout', ['Header', 'Docker', 'Floating', 'Section', 'Stack'],
                    ],
                ],
            },
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default preview;