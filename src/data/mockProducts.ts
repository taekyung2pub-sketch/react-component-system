// =========================
// 공통 상품 Mock Data
// =========================

export interface ProductData {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    category: string;
    description: string;
    colors: { label: string; value: string }[];
    options: { label: string; value: string }[];
    tableRows: { label: string; value: string }[];
    accordionItems: { title: string; content: string }[];
}

export const allProducts: ProductData[] = [
    {
        id: 1,
        name: 'Classic Linen Shirt',
        price: 89000,
        originalPrice: 120000,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
        images: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
            'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&q=80',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        ],
        category: 'tops',
        description: '고급 린넨 소재로 제작된 클래식 셔츠. 통기성이 뛰어나 여름에도 쾌적하게 착용할 수 있습니다.',
        colors: [
            { label: '오프화이트', value: 'off-white' },
            { label: '라이트블루', value: 'light-blue' },
            { label: '베이지', value: 'beige' },
        ],
        options: [
            { label: 'S', value: 's' },
            { label: 'M', value: 'm' },
            { label: 'L', value: 'l' },
            { label: 'XL', value: 'xl' },
        ],
        tableRows: [
            { label: '소재', value: '린넨 100%' },
            { label: '색상', value: '오프화이트' },
            { label: '원산지', value: '대한민국' },
            { label: '세탁방법', value: '손세탁 권장' },
        ],
        accordionItems: [
            { title: '배송 안내', content: '주문 후 1~3 영업일 이내 출고됩니다. 제주 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.' },
            { title: '교환 / 반품', content: '상품 수령 후 7일 이내 교환 및 반품이 가능합니다. 단, 착용 후 세탁된 제품은 교환/반품이 불가합니다.' },
        ],
    },
    {
        id: 2,
        name: 'Slim Chino Pants',
        price: 72000,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',
        images: [
            'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
        ],
        category: 'bottoms',
        description: '슬림한 실루엣의 치노 팬츠. 캐주얼과 세미포멀 모두 소화 가능한 다목적 아이템입니다.',
        colors: [
            { label: '베이지', value: 'beige' },
            { label: '카키', value: 'khaki' },
            { label: '네이비', value: 'navy' },
        ],
        options: [
            { label: '28', value: '28' },
            { label: '30', value: '30' },
            { label: '32', value: '32' },
            { label: '34', value: '34' },
        ],
        tableRows: [
            { label: '소재', value: '면 97%, 엘라스테인 3%' },
            { label: '색상', value: '베이지' },
            { label: '원산지', value: '베트남' },
            { label: '세탁방법', value: '세탁기 사용 가능 (30°C 이하)' },
        ],
        accordionItems: [
            { title: '배송 안내', content: '주문 후 1~3 영업일 이내 출고됩니다.' },
            { title: '교환 / 반품', content: '상품 수령 후 7일 이내 교환 및 반품이 가능합니다.' },
            { title: '사이즈 가이드', content: '28 - 허리 71cm / 30 - 허리 76cm / 32 - 허리 81cm / 34 - 허리 86cm' },
        ],
    },
    {
        id: 3,  name: 'Cotton Crew Tee',      price: 35000,  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',  images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'], category: 'tops',    description: '순면 소재의 베이직 크루넥 티셔츠.',    colors: [{ label: '화이트', value: 'white' }, { label: '블랙', value: 'black' }, { label: '그레이', value: 'gray' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'면 100%'},{label:'색상',value:'화이트'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 4,  name: 'Wool Blend Coat',      price: 245000, originalPrice: 320000, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80', images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'], category: 'outer',   description: '울 혼방 소재의 클래식 코트.',           colors: [{ label: '카멜', value: 'camel' }, { label: '블랙', value: 'black' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'울 60%, 폴리 40%'},{label:'색상',value:'카멜'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 5,  name: 'Stripe Oxford Shirt',  price: 95000,  image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400&q=80', images: ['https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&q=80'], category: 'tops',    description: '스트라이프 패턴의 옥스포드 셔츠.',      colors: [{ label: '블루스트라이프', value: 'blue-stripe' }, { label: '화이트스트라이프', value: 'white-stripe' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'면 100%'},{label:'색상',value:'블루 스트라이프'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 6,  name: 'Cargo Wide Pants',     price: 88000,  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'], category: 'bottoms', description: '와이드 카고 팬츠.',                    colors: [{ label: '올리브', value: 'olive' }, { label: '블랙', value: 'black' }, { label: '카키', value: 'khaki' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'면 100%'},{label:'색상',value:'올리브'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 7,  name: 'Ribbed Knit Vest',     price: 62000,  image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'], category: 'tops',    description: '립 니트 조끼.',                        colors: [{ label: '크림', value: 'cream' }, { label: '그레이', value: 'gray' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'아크릴 60%, 울 40%'},{label:'색상',value:'크림'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 8,  name: 'Denim Jacket',         price: 135000, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80', images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80'], category: 'outer',   description: '클래식 데님 재킷.',                    colors: [{ label: '인디고', value: 'indigo' }, { label: '라이트블루', value: 'light-blue' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'면 100%'},{label:'색상',value:'인디고'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 9,  name: 'Summer Linen Set',     price: 55000,  originalPrice: 110000, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'], category: 'tops',    description: '여름용 린넨 세트.',                    colors: [{ label: '아이보리', value: 'ivory' }, { label: '민트', value: 'mint' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'린넨 100%'},{label:'색상',value:'아이보리'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 10, name: 'Basic Polo Shirt',     price: 28000,  originalPrice: 49000,  image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80', images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80'], category: 'tops',    description: '베이직 폴로 셔츠.',                    colors: [{ label: '네이비', value: 'navy' }, { label: '화이트', value: 'white' }, { label: '블랙', value: 'black' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'면 100%'},{label:'색상',value:'네이비'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 11, name: 'Relaxed Jogger',       price: 42000,  originalPrice: 68000,  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80', images: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80'], category: 'bottoms', description: '릴렉스드 조거 팬츠.',                  colors: [{ label: '그레이', value: 'gray' }, { label: '블랙', value: 'black' }, { label: '네이비', value: 'navy' }], options: [{label:'S',value:'s'},{label:'M',value:'m'},{label:'L',value:'l'}], tableRows: [{label:'소재',value:'면 80%, 폴리 20%'},{label:'색상',value:'그레이'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 12, name: 'Canvas Tote Bag',      price: 18000,  originalPrice: 35000,  image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80'], category: 'acc',     description: '캔버스 토트백.',                       colors: [{ label: '에크루', value: 'ecru' }, { label: '블랙', value: 'black' }], options: [{label:'원사이즈',value:'one'}], tableRows: [{label:'소재',value:'캔버스'},{label:'색상',value:'에크루'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 13, name: 'White Leather Sneakers', price: 129000, originalPrice: 165000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'], category: 'shoes',   description: '화이트 레더 스니커즈.',                 colors: [{ label: '화이트', value: 'white' }], options: [{label:'250',value:'250'},{label:'255',value:'255'},{label:'260',value:'260'},{label:'265',value:'265'}], tableRows: [{label:'소재',value:'천연가죽'},{label:'색상',value:'화이트'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 14, name: 'Classic Derby Shoes',  price: 185000, image: 'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=400&q=80', images: ['https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=800&q=80'], category: 'shoes',   description: '클래식 더비 슈즈.',                    colors: [{ label: '블랙', value: 'black' }, { label: '브라운', value: 'brown' }], options: [{label:'250',value:'250'},{label:'255',value:'255'},{label:'260',value:'260'}], tableRows: [{label:'소재',value:'천연가죽'},{label:'색상',value:'블랙'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 15, name: 'Suede Chelsea Boots',  price: 215000, originalPrice: 260000, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80', images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80'], category: 'shoes',   description: '스웨이드 첼시 부츠.',                  colors: [{ label: '브라운', value: 'brown' }, { label: '블랙', value: 'black' }], options: [{label:'250',value:'250'},{label:'255',value:'255'},{label:'260',value:'260'}], tableRows: [{label:'소재',value:'스웨이드'},{label:'색상',value:'브라운'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
    {
        id: 16, name: 'Canvas Slip-On',       price: 59000,  image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80', images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'], category: 'shoes',   description: '캔버스 슬립온.',                       colors: [{ label: '네이비', value: 'navy' }, { label: '화이트', value: 'white' }], options: [{label:'250',value:'250'},{label:'255',value:'255'},{label:'260',value:'260'}], tableRows: [{label:'소재',value:'캔버스'},{label:'색상',value:'네이비'}], accordionItems: [{title:'배송 안내',content:'주문 후 1~3 영업일 이내 출고됩니다.'},{title:'교환 / 반품',content:'수령 후 7일 이내 가능합니다.'}] },
];

export const getProductById = (id: number) => allProducts.find(p => p.id === id);