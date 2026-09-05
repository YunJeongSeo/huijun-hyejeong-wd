// ─── 결혼식 정보 ─────────────────────────
export const COUPLE = {
	groom: { name: '최희준', parent: '장동숙', relation: '장남' },
	bride: { name: '안혜정', parent: '양진례', relation: '차녀' }
};

export const WEDDING_DATE = new Date('2026-10-24T12:00:00');
export const WEDDING_DATE_DISPLAY = '2026년 10월 24일 토요일 낮 12시';

export const RELATIONSHIP_START = new Date('2022-01-01T00:00:00');

export const INVITATION_BODY =
	'서로 다른 길을 걸어온 두 사람이 좋은 만남을 통해\n이제 한 가정을 이루려 합니다.\n서로를 아끼고 감사하는 마음으로 살아가고자 하오니\n귀한 걸음 하시어 축복해 주시면 감사하겠습니다.';

export const INVITATION_VERSE = {
	body: '한 사랑이면 짜라겠으랴와 두 사랑이면 능히 대적하나니\n세 겹줄은 쉽게 끊어지지 아니하느니라',
	source: '전도서 4:12'
};

export const VENUE = {
	name: '부산동산교회',
	hall: '',
	address: '부산시 연제구 마곡천로 9',
	tel: '051-866-3211',
	naverMapUrl: 'https://map.naver.com/v5/search/부산동산교회',
	tmapUrl: 'tmap://route?rGoName=부산동산교회',
	kakaoNaviUrl: 'https://map.kakao.com/link/search/부산동산교회'
};

export const TRANSIT = [
	{ title: '지하철', lines: ['물만골역(3호선) 1번 출구, 약 400m', '배산역(3호선) 5번 출구, 약 700m'] },
	{ title: '버스', lines: ['5-1, 20, 51, 57, 62, 63, 131, 141 (신리삼거리 하차)'] }
];

export const NOTICE = {
	title: '안내 말씀',
	body: '예식장 사정으로 화환은 정중히 사양합니다.\n너그러운 마음으로 양해 부탁드립니다.'
};

export const CONTACTS = {
	groom: [
		{ label: '신랑', name: COUPLE.groom.name, tel: '010-0000-0000' },
		{ label: '혼주', name: COUPLE.groom.parent, tel: '010-0000-0000' }
	],
	bride: [
		{ label: '신부', name: COUPLE.bride.name, tel: '010-0000-0000' },
		{ label: '혼주', name: COUPLE.bride.parent, tel: '010-0000-0000' }
	]
};

export const ACCOUNTS = {
	groom: [
		{ label: `신랑 ${COUPLE.groom.name}`, bank: 'ㅇㅇ은행', num: '000-000-000000' },
		{ label: `혼주 ${COUPLE.groom.parent}`, bank: 'ㅇㅇ은행', num: '000-000-000000' }
	],
	bride: [
		{ label: `신부 ${COUPLE.bride.name}`, bank: 'ㅇㅇ은행', num: '000-000-000000' },
		{ label: `혼주 ${COUPLE.bride.parent}`, bank: 'ㅇㅇ은행', num: '000-000-000000' }
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

export const INTRO_TITLE = 'TOGETHER\nFOREVER';

export const FULLSCREEN_QUOTE = 'JOIN US\nAS WE BECOME ONE';

export const CLOSING_QUOTE = {
	body: '장담하건대, 세상이 다 겨울이어도\n우리 사랑은 늘 봄처럼 따뜻하고\n간혹, 여름처럼 뜨거울 겁니다.',
	source: '이수동, 사랑가'
};
