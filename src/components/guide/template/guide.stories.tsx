import type { Meta, StoryObj } from '@storybook/react';
import { createDocsPage, type ComponentDocs } from '../layout/DocsLayout.tsx';

// =========================
// TODO: 아래 주석 해제 후 실제 컴포넌트로 교체
// import { ComponentName } from './ComponentName';
// =========================

// 템플릿 확인용 더미 컴포넌트 — 실제 컴포넌트 연결 시 삭제
const ComponentName = () => null;

// =========================
// 가이드 문서
// TODO: 아래 내용을 컴포넌트에 맞게 수정
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'ComponentName',        // TODO: 컴포넌트명
        desc: '컴포넌트 한 줄 설명.', // TODO: 컴포넌트 설명
    },
    sections: [
        {
            type: 'role',
            description: '이 컴포넌트가 담당하는 역할과 사용 맥락을 작성합니다.',
            bulletList: [
                '사용되는 UI 흐름 1',
                '사용되는 UI 흐름 2',
                '사용되는 UI 흐름 3',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                '상위 컴포넌트와의 조합 방식',
                'slot 구조 기반으로 확장',
                '상태 표현은 내부에서 처리',
                'validation은 상위 컴포넌트에서 관리',
            ],
            diagram: [
                { label: 'ParentComponent' },
                { label: 'ThisComponent', active: true },
                {
                    nodes: [
                        { label: 'Left Slot' },
                        { label: 'Content', active: true },
                        { label: 'Right Slot' },
                    ],
                },
                { label: 'ChildComponent' },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: '상태 관리 책임',
                    desc: '어떤 상태를 내부에서 처리하는지 작성합니다.',
                },
                {
                    title: '확장 기준',
                    desc: '컴포넌트를 확장할 때 기준이 되는 규칙을 작성합니다.',
                    bulletList: [
                        '확장 케이스 1',
                        '확장 케이스 2',
                    ],
                },
                {
                    title: '협업 기준',
                    desc: '스타일 수정 시 spacing / typography token 사용을 권장합니다.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// TODO: title, component, argTypes 수정
// =========================

const meta = {
    title: 'Component/Guide/GuideTemplate', // TODO: 카테고리 및 컴포넌트명
    component: ComponentName,                  // TODO: 실제 컴포넌트로 교체 후 더미 삭제
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        // TODO: props 제어 방식 정의
        // size: {
        //     control: 'inline-radio',
        //     options: ['sm', 'md', 'lg'],
        // },
    },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Stories
// TODO: 스토리 args 수정
// =========================

export const Default: Story = {
    args: {
        // TODO: 기본 props
    },
};

// export const Variant: Story = {
//     args: {
//         // TODO: 변형 props
//     },
// };