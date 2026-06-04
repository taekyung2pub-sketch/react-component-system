import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppLayout } from '@/layouts/AppLayout';
import { Section } from '@/components/layout/section/Section';
import { Stack } from '@/components/layout/stack/Stack';
import { Accordion } from '@/components/display/accordion/Accordion';
import { Toggle } from '@/components/form/toggle/Toggle';
import { Button } from '@/components/common/button/Button';
import { Title } from '@/components/common/title/Title';
import { Icon } from '@/components/common/icon/Icon';
import { Badge } from '@/components/common/badge/Badge';
import { EmptyState } from '@/components/common/emptyState/EmptyState';
import { Portal } from '@/contexts/PortalContext';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { TextField } from '@/components/form/textfield/TextField';
import { spacing, radius } from '@/styles/tokens/spacing';
import { gray, white, semantic } from '@/styles/tokens/color';
import { body02, body04, caption01 } from '@/styles/mixins/typography';

// =========================
// Mock Data
// =========================

const mockUser = {
    name: '이태경',
    email: 'taekyung2pub@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    grade: 'VIP',
};

const mockOrders = [
    { id: 1, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80', name: 'Classic Linen Shirt', option: 'M / 오프화이트', price: 89000, status: 'inTransit', statusLabel: '배송중' },
    { id: 2, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80', name: 'Cargo Wide Pants',    option: 'L / 올리브',   price: 88000, status: 'picked',    statusLabel: '집화완료' },
    { id: 3, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&q=80', name: 'Denim Jacket',        option: 'M / 인디고',   price: 135000, status: 'completed', statusLabel: '배송완료' },
];

const mockAddresses = [
    { id: 1, label: '집',    name: '이태경', phone: '010-1234-5678', address: '서울시 마포구 월드컵북로 12', detail: '101동 1001호', isDefault: true },
    { id: 2, label: '회사',  name: '이태경', phone: '010-1234-5678', address: '서울시 강남구 테헤란로 521', detail: '12층',        isDefault: false },
];

const NAV_ROUTES: Record<string, string> = {
    home:      '/',
    search:    '/search',
    shop:      '/products',
    community: '/community',
    my:        '/mypage',
};

const statusColorMap: Record<string, string> = {
    inTransit: semantic.info,
    picked:    '#b08b6b',
    completed: semantic.success,
};

// =========================
// Styled
// =========================

// 프로필 카드
const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.lg} ${spacing.md};
  background: ${white};
`;

const ProfileAvatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.p`
  ${body02('semibold')}
  color: ${gray[900]};
  margin: 0 0 2px;
`;

const ProfileEmail = styled.p`
  ${caption01('regular')}
  color: ${gray[500]};
  margin: 0;
`;

const EditBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  ${caption01('medium')}
  color: ${gray[500]};
  flex-shrink: 0;
`;

// 컨텐츠
const Contents = styled.div`
  width: 100%;
  padding: ${spacing.sm} 0;
  margin-bottom: ${spacing.md};
`

// 주문 아이템
const OrderItem = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${gray[50]};
  &:last-of-type { border-bottom: none; }
`;

const OrderThumb = styled.img`
  width: 72px;
  height: 72px;
  border-radius: ${radius.md};
  object-fit: cover;
  flex-shrink: 0;
  background: ${gray[100]};
`;

const OrderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const OrderName = styled.p`
  ${body04('medium')}
  color: ${gray[900]};
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OrderOption = styled.p`
  ${caption01('regular')}
  color: ${gray[500]};
  margin: 0 0 6px;
`;

const OrderPrice = styled.p`
  ${body04('medium')}
  color: ${gray[900]};
  margin: 0;
`;

const OrderStatus = styled.span<{ $color: string }>`
  ${caption01('medium')}
  color: ${({ $color }) => $color};
`;

const OrderActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;
`;

// 주소 아이템
const AddressItem = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${gray[50]};
  &:last-of-type { border-bottom: none; }
`;

const AddressInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AddressHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.xs};
`;

const AddressLabel = styled.span`
  ${body04('semibold')}
  color: ${gray[900]};
`;

const AddressText = styled.p`
  ${caption01('regular')}
  color: ${gray[600]};
  margin: 0 0 2px;
`;

const AddressActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing.sm};
  flex-shrink: 0;
`;

const DeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

// 알림 설정 아이템
const NotifItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm} 0;
  border-bottom: 1px solid ${gray[300]};
  &:last-of-type { border-bottom: none; }
`;

const NotifLabel = styled.div``;

const NotifTitle = styled.p`
  ${body04('medium')}
  color: ${gray[900]};
  margin: 0 0 1px;
`;

const NotifDesc = styled.p`
  ${caption01('regular')}
  color: ${gray[500]};
  margin: 0;
`;

// 링크 아이템
const LinkItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md} 0;
  text-decoration: none;
  border-bottom: 1px solid ${gray[50]};
  cursor: pointer;
  &:last-of-type { border-bottom: none; }
`;

const LinkLabel = styled.span`
  ${body04('medium')}
  color: ${gray[700]};
`;

// 로그아웃
const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  width: 100%;
  padding: ${spacing.md} 0;
  border: none;
  background: none;
  cursor: pointer;
  ${body04('medium')}
  color: ${semantic.error};
`;

// =========================
// 주문현황 팝업 콘텐츠
// =========================

const TrackStep = styled.div<{ $done: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  padding: ${spacing.sm} 0;
`;

const TrackDot = styled.div<{ $done: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $done }) => $done ? gray[900] : gray[200]};
  flex-shrink: 0;
  margin-top: 4px;
`;

const TrackLabel = styled.p<{ $done: boolean }>`
  ${body04('medium')}
  color: ${({ $done }) => $done ? gray[900] : gray[400]};
  margin: 0 0 2px;
`;

const TrackDesc = styled.p`
  ${caption01('regular')}
  color: ${gray[500]};
  margin: 0;
`;

const trackSteps = [
    { label: '주문 접수',  desc: '주문이 접수되었습니다.' },
    { label: '상품 준비',  desc: '판매자가 상품을 준비하고 있습니다.' },
    { label: '집화 완료',  desc: '택배사에 인계되었습니다.' },
    { label: '배송 중',    desc: '배송이 시작되었습니다.' },
    { label: '배송 완료',  desc: '상품이 배달되었습니다.' },
];

const statusStepMap: Record<string, number> = {
    inTransit: 3,
    picked: 2,
    completed: 4,
};

// =========================
// Component
// =========================

function MyPage() {
    const navigate = useNavigate();

    // 주문 팝업
    const [trackOrder, setTrackOrder] = useState<typeof mockOrders[0] | null>(null);
    const [reviewOrder, setReviewOrder] = useState<typeof mockOrders[0] | null>(null);

    // 주소 팝업
    const [addresses, setAddresses] = useState(mockAddresses);
    const [addAddressOpen, setAddAddressOpen] = useState(false);

    // 알림 설정
    const [notifSettings, setNotifSettings] = useState({
        basic:        true,
        sound:        true,
        vibration:    false,
        specialOffer: true,
        magazine:     false,
        orderUpdate:  true,
        review:       false,
    });

    const toggleNotif = (key: keyof typeof notifSettings) => {
        setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDeleteAddress = (id: number) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
    };

    const notifItems = [
        { key: 'basic',        title: '기본 알림',       desc: '앱 주요 알림을 수신합니다.' },
        { key: 'sound',        title: '소리',            desc: '알림 소리를 켭니다.' },
        { key: 'vibration',    title: '진동',            desc: '알림 진동을 켭니다.' },
        { key: 'orderUpdate',  title: '주문 업데이트',   desc: '주문 상태 변경 시 알림을 받습니다.' },
        { key: 'specialOffer', title: '스페셜 오퍼',     desc: '할인 및 특별 혜택 정보를 받습니다.' },
        { key: 'magazine',     title: '매거진',          desc: '새 매거진 발행 시 알림을 받습니다.' },
        { key: 'review',       title: '리뷰 요청',       desc: '구매 후 리뷰 작성 요청 알림입니다.' },
    ] as const;

    const accordionItems = [
        {
            id: 'orders',
            title: '내 주문',
            content: (
                <Contents>
                    {mockOrders.length === 0 ? (
                        <EmptyState type="empty" title="주문 내역이 없어요" description="아직 주문한 상품이 없습니다." />
                    ) : (
                        mockOrders.map(order => (
                            <OrderItem key={order.id}>
                                <OrderThumb src={order.image} alt={order.name} />
                                <OrderInfo>
                                    <OrderName>{order.name}</OrderName>
                                    <OrderOption>{order.option}</OrderOption>
                                    <OrderPrice>₩{order.price.toLocaleString()}</OrderPrice>
                                    <OrderStatus $color={statusColorMap[order.status]}>
                                        {order.statusLabel}
                                    </OrderStatus>
                                </OrderInfo>
                                <OrderActions>
                                    {order.status !== 'completed' ? (
                                        <Button size="sm" variant="outline" color="gray-dark"
                                                onClick={() => setTrackOrder(order)}>
                                            배송조회
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="outline" color="gray-dark"
                                                onClick={() => setReviewOrder(order)}>
                                            리뷰쓰기
                                        </Button>
                                    )}
                                </OrderActions>
                            </OrderItem>
                        ))
                    )}
                </Contents>
            ),
        },
        {
            id: 'address',
            title: '주소록',
            content: (
                <>
                    <Contents>
                        {addresses.length === 0 ? (
                            <EmptyState type="empty" title="등록된 주소가 없어요" description="배송지 주소를 추가해보세요." />
                        ) : (
                            addresses.map(addr => (
                                <AddressItem key={addr.id}>
                                    <AddressInfo>
                                        <AddressHeader>
                                            <AddressLabel>{addr.label}</AddressLabel>
                                            {addr.isDefault && (
                                                <Badge variant="soft" color="primary" size="sm">기본</Badge>
                                            )}
                                        </AddressHeader>
                                        <AddressText>{addr.name} · {addr.phone}</AddressText>
                                        <AddressText>{addr.address}</AddressText>
                                        <AddressText>{addr.detail}</AddressText>
                                    </AddressInfo>
                                    <AddressActions>
                                        <DeleteBtn type="button" onClick={() => handleDeleteAddress(addr.id)}>
                                            <Icon name="trash" size="sm" color={gray[400]} />
                                        </DeleteBtn>
                                    </AddressActions>
                                </AddressItem>
                            ))
                        )}
                    </Contents>
                    <Button
                        size="md"
                        variant="outline"
                        color="gray-dark"
                        fullWidth
                        onClick={() => setAddAddressOpen(true)}
                        style={{ marginTop: spacing.md }}
                    >
                        + 주소 추가
                    </Button>
                </>
            ),
        },
        {
            id: 'notifications',
            title: '알림 설정',
            content: (
                <>
                    <Contents>
                        {notifItems.map(item => (
                            <NotifItem key={item.key}>
                                <NotifLabel>
                                    <NotifTitle>{item.title}</NotifTitle>
                                    <NotifDesc>{item.desc}</NotifDesc>
                                </NotifLabel>
                                <Toggle
                                    size="xs"
                                    defaultChecked={notifSettings[item.key]}
                                    onChange={() => toggleNotif(item.key)}
                                />
                            </NotifItem>
                        ))}
                    </Contents>
                    <Button
                        size="md"
                        color="gray-dark"
                        fullWidth
                        style={{ marginTop: spacing.md }}
                        onClick={() => alert('알림 설정이 저장됐어요.')}
                    >
                        저장
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <AppLayout
                headerProps={{
                    variant: 'default',
                    title: 'My Page',
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
                    activeNav: 'my',
                    onNavChange: (value) => navigate(NAV_ROUTES[value] ?? '/'),
                }}
            >
                {/* ① 프로필 카드 */}
                <ProfileCard>
                    <ProfileAvatar src={mockUser.avatar} alt={mockUser.name} />
                    <ProfileInfo>
                        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center', marginBottom: '2px' }}>
                            <ProfileName>{mockUser.name}</ProfileName>
                            <Badge variant="soft" color="primary" size="sm">{mockUser.grade}</Badge>
                        </Stack>
                        <ProfileEmail>{mockUser.email}</ProfileEmail>
                    </ProfileInfo>
                    <EditBtn type="button">
                        <Icon name="edit" size="sm" color={gray[400]} />
                        수정
                    </EditBtn>
                </ProfileCard>

                {/* ② 아코디언 메뉴 */}
                <Section variant="divider" spacing="md">
                    <Accordion
                        variant="box"
                        single={false}
                        items={accordionItems}
                    />
                </Section>

                {/* ③ 링크 메뉴 */}
                <Section variant="divider" spacing="md">
                    <LinkItem href="javascript:">
                        <LinkLabel>FAQ</LinkLabel>
                        <Icon name="chevron" size="sm" color={gray[400]} rotate={-90} />
                    </LinkItem>
                    <LinkItem href="javascript:">
                        <LinkLabel>고객센터</LinkLabel>
                        <Icon name="chevron" size="sm" color={gray[400]} rotate={-90} />
                    </LinkItem>
                </Section>

                {/* ④ 로그아웃 */}
                <Section variant="divider" spacing="md">
                    <LogoutBtn type="button">
                        <Icon name="logout" size="md" color={semantic.error} />
                        로그아웃
                    </LogoutBtn>
                </Section>
            </AppLayout>

            {/* 배송조회 팝업 */}
            {trackOrder && (
                <Portal>
                    <BottomSheet
                        title="배송 현황"
                        onClose={() => setTrackOrder(null)}
                        body={
                            <div>
                                <Stack direction="horizontal" gap="md" style={{ marginBottom: spacing.lg }}>
                                    <img src={trackOrder.image} alt={trackOrder.name}
                                         style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                                    <div>
                                        <p style={{ margin: '0 0 2px' }}><b>{trackOrder.name}</b></p>
                                        <p style={{ margin: 0, fontSize: 12, color: gray[500] }}>{trackOrder.option}</p>
                                    </div>
                                </Stack>
                                {trackSteps.map((step, i) => {
                                    const currentStep = statusStepMap[trackOrder.status] ?? 0;
                                    const done = i <= currentStep;
                                    return (
                                        <TrackStep key={i} $done={done}>
                                            <TrackDot $done={done} />
                                            <div>
                                                <TrackLabel $done={done}>{step.label}</TrackLabel>
                                                {done && <TrackDesc>{step.desc}</TrackDesc>}
                                            </div>
                                        </TrackStep>
                                    );
                                })}
                            </div>
                        }
                    />
                </Portal>
            )}

            {/* 리뷰 팝업 */}
            {reviewOrder && (
                <Portal>
                    <BottomSheet
                        title="리뷰 작성"
                        onClose={() => setReviewOrder(null)}
                        body={
                            <Stack direction="vertical" gap="md">
                                <Stack direction="horizontal" gap="md">
                                    <img src={reviewOrder.image} alt={reviewOrder.name}
                                         style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                                    <div>
                                        <p style={{ margin: '0 0 2px' }}><b>{reviewOrder.name}</b></p>
                                        <p style={{ margin: 0, fontSize: 12, color: gray[500] }}>{reviewOrder.option}</p>
                                    </div>
                                </Stack>
                                <Title variant="title03" weight="semibold" as="p">어떠셨나요?</Title>
                                <Stack direction="horizontal" gap="sm">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Icon key={star} name="star_filled" size="lg" color="#f5a623" />
                                    ))}
                                </Stack>
                                <TextField type="text" placeholder="리뷰를 작성해주세요..." />
                            </Stack>
                        }
                        footer={
                            <Button size="lg" color="gray-dark" fullWidth onClick={() => setReviewOrder(null)}>
                                제출
                            </Button>
                        }
                    />
                </Portal>
            )}

            {/* 주소 추가 팝업 */}
            {addAddressOpen && (
                <Portal>
                    <BottomSheet
                        title="주소 추가"
                        onClose={() => setAddAddressOpen(false)}
                        body={
                            <Stack direction="vertical" gap="md">
                                <TextField type="text" placeholder="주소 레이블 (예: 집, 회사)" />
                                <TextField type="text" placeholder="수령인 이름" />
                                <TextField type="text" placeholder="연락처" />
                                <TextField type="text" placeholder="주소" />
                                <TextField type="text" placeholder="상세 주소" />
                            </Stack>
                        }
                        footer={
                            <Button
                                size="lg"
                                color="gray-dark"
                                fullWidth
                                onClick={() => {
                                    setAddresses(prev => [...prev, {
                                        id: Date.now(),
                                        label: '새 주소',
                                        name: '이태경',
                                        phone: '010-0000-0000',
                                        address: '새로 등록된 주소',
                                        detail: '',
                                        isDefault: false,
                                    }]);
                                    setAddAddressOpen(false);
                                }}
                            >
                                저장
                            </Button>
                        }
                    />
                </Portal>
            )}
        </>
    );
}

export default MyPage;