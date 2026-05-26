import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Title, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';
import theme from '../../../styles/theme';
import GlobalStyle from '../../../styles/global/GlobalStyle';

import {
    GuideWrap,
    GuideHeader,
    GuideChip,
    GuideTitle,
    GuideDesc,
    GuideSection,
    SectionTitle,
    GuideCard,
    GuideComposition,
    CompositionRow,
    CompositionBox,
    CompositionArrow,
    GuideNotes,
    GuideTextList,
    GuideNumberList,
} from '../../../styles/guide/Guide.styled';

// =========================
// Types
// =========================

export interface DocsHeader {
    chip?: string;
    title: string;
    desc: string;
}

export interface CompositionNode {
    label: string;
    active?: boolean;
}

export interface CompositionRowType {
    nodes: CompositionNode[];
}

export type CompositionItem = CompositionNode | CompositionRowType;

export function isCompositionRow(item: CompositionItem): item is CompositionRowType {
    return 'nodes' in item;
}

export interface NoteItem {
    title: string;
    desc: string;
    bulletList?: string[];
}

export type DocsSection =
    | { type: 'role'; title?: string; description: string; bulletList?: string[] }
    | { type: 'composition'; title?: string; orderedList?: string[]; diagram?: CompositionItem[] }
    | { type: 'notes'; title?: string; items: NoteItem[] }
    | { type: 'custom'; title?: string; content: React.ReactNode };

export interface ComponentDocs {
    header: DocsHeader;
    sections: DocsSection[];
}

// =========================
// Section Renderers
// =========================

const RoleSection = ({ section }: { section: Extract<DocsSection, { type: 'role' }> }) => (
    <GuideSection>
        <SectionTitle>{section.title ?? 'Component Role'}</SectionTitle>
        <GuideCard>
            <p>{section.description}</p>
            {section.bulletList && (
                <GuideTextList>
                    {section.bulletList.map((item, i) => <li key={i}>{item}</li>)}
                </GuideTextList>
            )}
        </GuideCard>
    </GuideSection>
);

const CompositionSection = ({ section }: { section: Extract<DocsSection, { type: 'composition' }> }) => (
    <GuideSection>
        <SectionTitle>{section.title ?? 'Composition'}</SectionTitle>
        <GuideCard>
            {section.orderedList && (
                <GuideNumberList>
                    {section.orderedList.map((item, i) => <li key={i}>{item}</li>)}
                </GuideNumberList>
            )}
            {section.diagram && (
                <GuideComposition>
                    {section.diagram.map((item, i) => {
                        if (isCompositionRow(item)) {
                            return (
                                <CompositionRow key={i}>
                                    {item.nodes.map((node, j) => (
                                        <CompositionBox key={j} $active={node.active}>
                                            {node.label}
                                        </CompositionBox>
                                    ))}
                                </CompositionRow>
                            );
                        }
                        return (
                            <React.Fragment key={i}>
                                {i > 0 && <CompositionArrow>↓</CompositionArrow>}
                                <CompositionBox $active={item.active}>
                                    {item.label}
                                </CompositionBox>
                            </React.Fragment>
                        );
                    })}
                </GuideComposition>
            )}
        </GuideCard>
    </GuideSection>
);

const NotesSection = ({ section }: { section: Extract<DocsSection, { type: 'notes' }> }) => (
    <GuideSection>
        <SectionTitle>{section.title ?? 'Notes'}</SectionTitle>
        <GuideCard>
            <GuideNotes>
                {section.items.map((item, i) => (
                    <li key={i}>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                        {item.bulletList && (
                            <GuideTextList>
                                {item.bulletList.map((b, j) => <li key={j}>{b}</li>)}
                            </GuideTextList>
                        )}
                    </li>
                ))}
            </GuideNotes>
        </GuideCard>
    </GuideSection>
);

const CustomSection = ({ section }: { section: Extract<DocsSection, { type: 'custom' }> }) => (
    <GuideSection>
        {section.title && <SectionTitle>{section.title}</SectionTitle>}
        <GuideCard>{section.content}</GuideCard>
    </GuideSection>
);

// =========================
// DocsLayout
// =========================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionMap: Record<string, (section: any, index: number) => React.ReactNode> = {
    role:        (s, i) => <RoleSection key={i} section={s} />,
    composition: (s, i) => <CompositionSection key={i} section={s} />,
    notes:       (s, i) => <NotesSection key={i} section={s} />,
    custom:      (s, i) => <CustomSection key={i} section={s} />,
};

const DocsLayout = ({ docs }: { docs: ComponentDocs }) => (
    <>
        <Title />
        <Description />
        <Primary />
        <Controls />
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <GuideWrap>
                <GuideHeader>
                    {docs.header.chip && <GuideChip>{docs.header.chip}</GuideChip>}
                    <GuideTitle>{docs.header.title}</GuideTitle>
                    <GuideDesc>{docs.header.desc}</GuideDesc>
                </GuideHeader>
                {docs.sections.map((section, i) => sectionMap[section.type]?.(section, i))}
            </GuideWrap>
        </ThemeProvider>
        <Stories includePrimary={false} />
    </>
);

export const createDocsPage = (docs: ComponentDocs) => () => (
    <DocsLayout docs={docs} />
);