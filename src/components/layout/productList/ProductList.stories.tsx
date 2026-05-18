import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductList, ProductItem } from './ProductList';

// 가상 데이터 세팅
const mockProducts: ProductItem[] = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        title: '[인기] 모던 스마트 워치 스페셜 에디션 (스트랩 포함)',
        price: '129,000원',
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        title: '프리미엄 노이즈 캔슬링 무선 헤드폰 무광 블랙',
        price: '298,000원',
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        title: '러닝 에어 매쉬 스포츠 운동화 스카이 블루',
        price: '89,000원',
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
        title: '레트로 스타일 미러 선글라스 UV100 차단 패키지',
        price: '45,000원',
    },
];

const meta = {
    title: 'Component/Patterns/ProductList',
    component: ProductList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isLoading: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본형 스토리 (오른쪽 제어판에서 isLoading 토글 테스트 가능)
export const Default: Story = {
    args: {
        isLoading: false,
        products: mockProducts,
    },
};

// 2. 스켈레톤 전용 상태 확인 스토리
export const LoadingState: Story = {
    args: {
        isLoading: true,
        products: mockProducts,
    },
};

// 3. 버튼을 눌러 비동기 로딩을 전환해보는 리얼 라이브 테스트 데모 스토리
export const LiveTransitionDemo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => {
        setIsLoading(true);
        // 1.5초 뒤에 자동으로 로딩 해제되어 진짜 데이터로 덮어씌워짐 시뮬레이션
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <button
                onClick={toggleLoading}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                }}
            >
                🔄 3초 비동기 API 로딩 전환 테스트하기
            </button>

            <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', overflow: 'hidden' }}>
                <ProductList isLoading={isLoading} products={mockProducts} />
            </div>
        </div>
    );
};