// ─── 결혼식 정보 — 실제 정보로 교체하세요 ─────────────────────────
export const COUPLE = {
	groom: { name: '최희준', father: '최ㅇㅇ', mother: 'ㅇ ㅇㅇ' },
	bride: { name: '안혜정', father: '안ㅇㅇ', mother: 'ㅇ ㅇㅇ' }
};

export const WEDDING_DATE = new Date('2027-05-15T12:00:00');
export const WEDDING_DATE_DISPLAY = '2027년 5월 15일 토요일 낮 12시';

export const RELATIONSHIP_START = new Date('2022-01-01T00:00:00');

export const VENUE = {
	name: 'ㅇㅇ웨딩홀',
	hall: 'ㅇㅇ홀, 3층',
	address: '서울시 ㅇㅇ구 ㅇㅇ로 000',
	tel: '02-000-0000',
	naverMapUrl: 'https://map.naver.com/v5/search/ㅇㅇ웨딩홀',
	tmapUrl: 'tmap://route?rGoName=ㅇㅇ웨딩홀',
	kakaoNaviUrl: 'https://map.kakao.com/link/search/ㅇㅇ웨딩홀'
};

export const TRANSIT = [
	{ title: '지하철', lines: ['ㅇㅇ선 ㅇㅇ역 ㅇ번 출구 도보 ㅇ분'] },
	{ title: '버스', lines: ['간선버스 : 000, 000', '지선버스 : 0000'] },
	{ title: '자가용', lines: ['ㅇㅇ웨딩홀 주차장 이용 (2시간 무료)'] }
];

export const NOTICE = {
	title: '안내 말씀',
	body: '예식장 사정으로 화환은 정중히 사양합니다.\n너그러운 마음으로 양해 부탁드립니다.'
};

export const CONTACTS = {
	groom: [
		{ label: '신랑', name: COUPLE.groom.name, tel: '010-0000-0000' },
		{ label: '아버지', name: COUPLE.groom.father, tel: '010-0000-0000' },
		{ label: '어머니', name: COUPLE.groom.mother, tel: '010-0000-0000' }
	],
	bride: [
		{ label: '신부', name: COUPLE.bride.name, tel: '010-0000-0000' },
		{ label: '아버지', name: COUPLE.bride.father, tel: '010-0000-0000' },
		{ label: '어머니', name: COUPLE.bride.mother, tel: '010-0000-0000' }
	]
};

export const ACCOUNTS = {
	groom: [
		{ label: `신랑 ${COUPLE.groom.name}`, bank: 'ㅇㅇ은행', num: '000-000-000000' },
		{ label: `아버지 ${COUPLE.groom.father}`, bank: 'ㅇㅇ은행', num: '000-000-000000' },
		{ label: `어머니 ${COUPLE.groom.mother}`, bank: 'ㅇㅇ은행', num: '000-000-000000' }
	],
	bride: [
		{ label: `신부 ${COUPLE.bride.name}`, bank: 'ㅇㅇ은행', num: '000-000-000000' },
		{ label: `아버지 ${COUPLE.bride.father}`, bank: 'ㅇㅇ은행', num: '000-000-000000' },
		{ label: `어머니 ${COUPLE.bride.mother}`, bank: 'ㅇㅇ은행', num: '000-000-000000' }
	]
};

// ─── 사진 — 실제 사진으로 교체하세요 (static/ 에 넣고 경로만 바꾸면 됩니다) ───
export const PHOTOS = {
	cover: 'https://picsum.photos/seed/hj-cover/800/1000',
	fullscreen: 'https://picsum.photos/seed/hj-full/800/1200',
	ending: 'https://picsum.photos/seed/hj-ending/800/1100',
	gallery: [
		'https://picsum.photos/seed/hj-g1/600/800',
		'https://picsum.photos/seed/hj-g2/600/800',
		'https://picsum.photos/seed/hj-g3/600/800',
		'https://picsum.photos/seed/hj-g4/600/800',
		'https://picsum.photos/seed/hj-g5/600/800',
		'https://picsum.photos/seed/hj-g6/600/800',
		'https://picsum.photos/seed/hj-g7/600/800',
		'https://picsum.photos/seed/hj-g8/600/800'
	]
};

export const FULLSCREEN_QUOTE = 'JOIN US\nAS WE BECOME ONE';

export const CLOSING_QUOTE = {
	body: '장담하건대, 세상이 다 겨울이어도\n우리 사랑은 늘 봄처럼 따뜻하고\n간혹, 여름처럼 뜨거울 겁니다.',
	source: '이수동, 사랑가'
};
