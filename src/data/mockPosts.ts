// =========================
// 공통 커뮤니티 Mock Data
// =========================

export interface Comment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    date: string;
    likes: number;
}

export interface PostData {
    id: number;
    category: string;
    title: string;
    desc: string;
    content: string;
    image: string;
    author: string;
    avatar: string;
    date: string;
    likes: number;
    comments: Comment[];
}

export const allPosts: PostData[] = [
    {
        id: 1,
        category: '스타일링',
        title: '봄 코디 추천 5선',
        desc: '따뜻한 봄날을 위한 스타일링 가이드입니다. 이번 시즌 트렌드를 반영한 코디를 소개합니다.',
        content: '봄은 레이어링의 계절입니다. 가벼운 소재의 아우터와 파스텔 톤의 이너를 조합하면 산뜻한 봄 분위기를 연출할 수 있습니다.\n\n특히 올해는 크림, 라벤더, 민트 등 소프트한 컬러가 주목받고 있습니다. 데님과 함께 매치하면 캐주얼하면서도 세련된 룩이 완성됩니다.\n\n액세서리로 포인트를 주는 것도 좋은 방법입니다. 버킷햇이나 스트로 백으로 봄 감성을 더해보세요.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        author: '에디터 김지수',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        date: '2026.05.12',
        likes: 142,
        comments: [
            { id: 1, author: '이민준', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: '너무 예쁜 코디네요! 참고할게요 😊', date: '2026.05.13', likes: 12 },
            { id: 2, author: '박소연', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: '5번 코디가 정말 마음에 들어요.', date: '2026.05.13', likes: 8 },
            { id: 3, author: '최준혁', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', text: '봄에 딱인 스타일이네요 잘 참고했습니다!', date: '2026.05.14', likes: 5 },
        ],
    },
    {
        id: 2,
        category: '소재',
        title: '린넨 소재 완전 정복',
        desc: '여름을 시원하게 보내는 소재 이야기. 린넨의 특성과 관리법을 알아봅니다.',
        content: '린넨은 아마 식물의 섬유로 만든 천연 소재로, 통기성이 뛰어나 여름철 패션 아이템으로 각광받고 있습니다.\n\n흡습성이 좋아 땀을 빠르게 흡수하고 건조해주며, 피부 자극도 적어 민감한 피부에도 적합합니다. 단, 구김이 잘 생기는 특성이 있어 관리에 주의가 필요합니다.\n\n세탁 시에는 30도 이하의 미온수로 손세탁을 권장하며, 건조는 그늘에서 자연 건조하는 것이 가장 좋습니다.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
        author: '에디터 박현우',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        date: '2026.05.10',
        likes: 98,
        comments: [
            { id: 1, author: '김하린', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: '린넨 세탁법이 궁금했는데 도움이 됐어요!', date: '2026.05.11', likes: 7 },
            { id: 2, author: '정우성', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', text: '매년 여름마다 린넨 옷 찾게 되더라고요.', date: '2026.05.11', likes: 4 },
        ],
    },
    {
        id: 3,
        category: '코디',
        title: '미니멀 코디의 기본',
        desc: '적게 입고 더 멋지게 보이는 법. 미니멀리즘 패션의 핵심 원칙을 정리했습니다.',
        content: '미니멀 패션의 핵심은 "덜어냄"입니다. 불필요한 장식을 배제하고 기본에 충실한 아이템으로 세련된 룩을 완성하는 것이 목표입니다.\n\n색상은 블랙, 화이트, 베이지, 그레이 등 뉴트럴 톤을 중심으로 구성하고, 핏이 좋은 기본 아이템에 투자하는 것이 중요합니다.\n\n액세서리는 최소화하되, 하나쯤은 포인트가 되는 아이템을 선택하면 완성도 높은 미니멀 룩이 됩니다.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
        author: '에디터 이수빈',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        date: '2026.05.08',
        likes: 215,
        comments: [
            { id: 1, author: '오지훈', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: '미니멀 코디 어렵게 생각했는데 이제 알겠어요.', date: '2026.05.09', likes: 15 },
        ],
    },
    {
        id: 4,
        category: '레이어링',
        title: '아우터 레이어링 팁',
        desc: '겹겹이 입는 스타일의 핵심 포인트. 레이어링으로 스타일에 깊이를 더하는 방법.',
        content: '레이어링은 여러 겹의 옷을 겹쳐 입어 스타일에 깊이와 볼륨감을 더하는 코디 방법입니다.\n\n기본 원칙은 얇은 것부터 두꺼운 순서로 레이어링하는 것입니다. 예를 들어 티셔츠 위에 셔츠, 그 위에 재킷이나 코트를 겹치는 식입니다.\n\n컬러는 톤온톤으로 맞추거나 명도 차이를 활용하면 자연스러운 레이어링이 완성됩니다. 비율 조절도 중요한데, 상의 레이어링 시에는 하의를 타이트하게 입어 밸런스를 맞춰주세요.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
        author: '에디터 강민서',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        date: '2026.05.05',
        likes: 176,
        comments: [
            { id: 1, author: '윤지아', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: '레이어링이 이렇게 쉬운 거였군요!', date: '2026.05.06', likes: 9 },
            { id: 2, author: '임도현', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: '아우터 구매 고민중인데 도움이 됐어요.', date: '2026.05.06', likes: 6 },
        ],
    },
    {
        id: 5,
        category: '트렌드',
        title: '2026 여름 트렌드 총정리',
        desc: '올여름 주목해야 할 패션 트렌드를 한눈에 정리했습니다.',
        content: '2026년 여름 시즌의 키워드는 "자연주의"와 "Y2K 리바이벌"입니다.\n\n자연에서 영감을 받은 어스 톤, 식물 프린트, 천연 소재가 강세를 보이는 동시에, 2000년대 초반의 팝 컬러와 슬림 실루엣도 다시 주목받고 있습니다.\n\n두 트렌드를 믹스매치하면 개성 있는 나만의 스타일을 완성할 수 있습니다.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
        author: '에디터 김지수',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        date: '2026.05.03',
        likes: 312,
        comments: [
            { id: 1, author: '이하은', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: 'Y2K 완전 좋아요! 드디어 다시 유행이네요.', date: '2026.05.04', likes: 22 },
            { id: 2, author: '박지훈', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: '어스톤 코디 도전해봐야겠어요!', date: '2026.05.04', likes: 11 },
        ],
    },
    {
        id: 6,
        category: '신발',
        title: '여름 신발 선택 가이드',
        desc: '샌들부터 뮬까지, 여름을 위한 신발 선택법을 알아봅니다.',
        content: '여름 신발의 핵심은 통기성과 편안함입니다. 오래 걸어도 발이 편하고, 더운 날씨에도 쾌적함을 유지할 수 있는 소재를 선택하는 것이 중요합니다.\n\n스트랩 샌들은 가볍고 활동적인 느낌을 주며 다양한 스타일과 매치하기 좋습니다. 뮬은 격식 있는 자리에서도 활용 가능해 활용도가 높습니다.\n\n컬러는 화이트, 베이지, 탄 등 뉴트럴 톤이 코디하기 쉽고 세련된 인상을 줍니다.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        author: '에디터 박현우',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        date: '2026.05.01',
        likes: 88,
        comments: [
            { id: 1, author: '송미래', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: '뮬 추천 감사해요! 하나 장만해야겠어요.', date: '2026.05.02', likes: 6 },
        ],
    },
    {
        id: 7,
        category: '가방',
        title: '여름 가방 트렌드',
        desc: '올여름 주목받는 가방 스타일과 소재를 정리했습니다.',
        content: '여름 시즌 가방의 핵심 트렌드는 "라피아 & 스트로 소재"와 "미니멀 토트백"입니다.\n\n라피아 소재의 바스켓백은 캐주얼한 여름 룩에 자연스럽게 어울리며, 비치 룩에도 완벽합니다. 깔끔한 캔버스 토트백은 데일리로 활용하기 좋습니다.\n\n크기는 미니백이 트렌디하지만, 실용성을 원한다면 미디움 사이즈를 선택하는 것이 현명합니다.',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
        author: '에디터 이수빈',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        date: '2026.04.28',
        likes: 134,
        comments: [
            { id: 1, author: '김나연', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', text: '라피아백 너무 예뻐요 어디서 살 수 있나요?', date: '2026.04.29', likes: 8 },
            { id: 2, author: '류지민', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: '캔버스 토트백이 요즘 다시 유행이더라고요!', date: '2026.04.29', likes: 5 },
        ],
    },
    {
        id: 8,
        category: '컬러',
        title: '이번 시즌 주목 컬러',
        desc: '2026 S/S 시즌을 이끄는 트렌드 컬러를 소개합니다.',
        content: '팬톤이 선정한 2026년 올해의 컬러는 "모브 포그(Mauve Fog)"입니다. 회보랏빛이 감도는 차분한 톤으로 다양한 컬러와 조화롭게 어울립니다.\n\n이 외에도 "버터 옐로우", "세이지 그린", "피치 퍼즈" 등 자연에서 영감을 받은 소프트 파스텔 계열이 강세입니다.\n\n트렌드 컬러를 전체 룩에 적용하기 부담스럽다면, 포인트 아이템 하나에만 활용해보는 것을 추천합니다.',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
        author: '에디터 강민서',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        date: '2026.04.25',
        likes: 201,
        comments: [
            { id: 1, author: '한소희', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: '모브 포그 정말 예쁜 색이에요!', date: '2026.04.26', likes: 18 },
            { id: 2, author: '장윤서', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: '버터 옐로우 도전해봐야겠어요.', date: '2026.04.26', likes: 9 },
            { id: 3, author: '노현준', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: '세이지 그린 벌써 몇 벌 샀어요 ㅎㅎ', date: '2026.04.27', likes: 7 },
        ],
    },
];

export const getPostById = (id: number) => allPosts.find(p => p.id === id);

// MD's Pick — 상위 4개
export const mdsPicks = allPosts.slice(0, 4);