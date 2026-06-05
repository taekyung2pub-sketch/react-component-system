import * as React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';
import { Button } from '@/components/common/button/Button';
import { TextField } from '@/components/form/textField/TextField';
import { Select } from '@/components/form/select/Select';
import { Checkbox } from '@/components/form/checkbox/Checkbox';
import { createDocsPage, type ComponentDocs } from '@/components/guide/layout/DocsLayout';

// =========================
// 가이드 문서
// =========================

const docs: ComponentDocs = {
    header: {
        chip: 'Component Guide',
        title: 'BottomSheet',
        desc: '하단에서 슬라이드 업 되는 시트 컴포넌트. 헤더, 바디, 푸터 슬롯으로 구성됩니다.',
    },
    sections: [
        {
            type: 'role',
            description: '추가 정보 입력이나 옵션 선택이 필요할 때 현재 화면 위에 올라오는 시트입니다.',
            bulletList: [
                '주소 등록, 배송지 선택 등 폼 입력',
                '필터, 정렬 등 옵션 선택',
                '간단한 확인/선택이 필요한 서브 플로우',
            ],
        },
        {
            type: 'composition',
            orderedList: [
                'Handle — 상단 중앙 드래그 핸들, 아래로 80px 이상 드래그 시 닫힘',
                'Header — title 텍스트 + 우측 X 닫기 버튼 고정',
                'Body — ReactNode 슬롯',
                'Footer — ReactNode 슬롯, margin-top spacing.lg(24px)',
            ],
            diagram: [
                { label: 'BottomSheet', active: true },
                { label: 'Handle (drag to close)' },
                { label: 'Header — title + CloseBtn', active: true },
                {
                    nodes: [
                        { label: 'Body (ReactNode)', active: true },
                        { label: 'Footer (ReactNode)' },
                    ],
                },
            ],
        },
        {
            type: 'notes',
            items: [
                {
                    title: 'Drawer (드래그 닫기)',
                    desc: 'Handle을 아래로 80px 이상 드래그하면 onClose가 호출됩니다. 터치와 마우스 드래그 모두 지원합니다.',
                },
                {
                    title: 'body 스크롤 방지',
                    desc: 'BottomSheet가 열려 있는 동안 document.body의 overflow를 hidden으로 설정해 배경 스크롤을 방지합니다. 언마운트 시 자동 복원됩니다.',
                },
                {
                    title: 'dimClose',
                    desc: '오버레이(dim) 영역 클릭 시 닫기 여부를 제어합니다. 기본값은 true입니다.',
                    bulletList: [
                        'dimClose={true} (기본) — 오버레이 클릭 시 onClose 호출',
                        'dimClose={false} — 오버레이 클릭으로 닫히지 않음, 명시적 액션 유도 시 사용',
                    ],
                },
                {
                    title: 'footer 슬롯',
                    desc: 'Alert의 Footer와 동일하게 Button 컴포넌트를 넣어 사용합니다. fullWidth로 전달하세요.',
                },
            ],
        },
    ],
};

// =========================
// Meta
// =========================

const meta = {
    title: 'Component/Overlay/BottomSheet',
    component: BottomSheet,
    parameters: {
        layout: 'centered',
        docs: {
            page: createDocsPage(docs),
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: '헤더 타이틀',
        },
        dimClose: {
            control: 'boolean',
            description: '오버레이 클릭 시 닫기',
            table: { defaultValue: { summary: 'true' } },
        },
    },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

const DefaultStory = () => {
    const [open, setOpen] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    return (
        <div style={{ width: '500px', height: '500px'}}>
            <Button size="md" color="gray-dark" onClick={() => setOpen(true)}>BottomSheet 열기</Button>
            {open && (
                <BottomSheet
                    title="Address"
                    onClose={() => setOpen(false)}
                    body={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <p style={{ fontSize: '13px', color: '#52525b', marginBottom: '8px' }}>Address Nickname</p>
                                <Select variant="box" options={[
                                    { label: 'Home', value: 'home' },
                                    { label: 'Office', value: 'office' },
                                    { label: 'Other', value: 'other' },
                                ]} />
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', color: '#52525b', marginBottom: '8px' }}>Full Address</p>
                                <TextField placeholder="925 S Chugach St #APT 10, Alaska 996..." />
                            </div>
                            <Checkbox
                                label="Make this as a default address"
                                checked={isDefault}
                                onChange={() => setIsDefault(v => !v)}
                            />
                        </div>
                    }
                    footer={
                        <Button size="lg" color="gray-dark" fullWidth onClick={() => setOpen(false)}>
                            Add
                        </Button>
                    }
                />
            )}
        </div>
    );
};

export const Default: Story = {
    render: () => <DefaultStory />,
};

// =========================
// Body only
// =========================

const BodyOnlyStory = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ width: '500px', height: '500px'}}>
            <Button size="md" color="gray-dark" variant="outline" onClick={() => setOpen(true)}>Body only</Button>
            {open && (
                <BottomSheet
                    title="정렬"
                    onClose={() => setOpen(false)}
                    body={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {['최신순', '인기순', '낮은 가격순', '높은 가격순'].map((label) => (
                                <Button
                                    key={label}
                                    size="lg"
                                    color="gray-dark"
                                    variant="soft"
                                    fullWidth
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    }
                />
            )}
        </div>
    );
};

export const BodyOnly: Story = {
    name: 'body only',
    render: () => <BodyOnlyStory />,
};

// =========================
// dimClose={false}
// =========================

const DimCloseStory = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ width: '500px', height: '500px'}}>
            <Button size="md" color="gray-dark" variant="outline" onClick={() => setOpen(true)}>dimClose=false</Button>
            {open && (
                <BottomSheet
                    title="dimClose 비활성"
                    onClose={() => setOpen(false)}
                    dimClose={false}
                    body={
                        <p style={{ fontSize: '14px', color: '#52525b' }}>
                            오버레이를 클릭해도 닫히지 않습니다. X 버튼 또는 드래그로 닫아주세요.
                        </p>
                    }
                    footer={
                        <Button size="lg" color="gray-dark" fullWidth onClick={() => setOpen(false)}>
                            확인
                        </Button>
                    }
                />
            )}
        </div>
    );
};

export const DimClose: Story = {
    name: 'dimClose={false} — 오버레이 클릭 닫기 비활성',
    render: () => <DimCloseStory />,
};