// ─── 결혼식 정보 ─────────────────────────
export const COUPLE = {
	groom: { name: '최희준', parent: '최상봉 · 장동숙(지영)', relation: '장남' },
	bride: { name: '안혜정', parent: '양진례', relation: '차녀' }
};

export const WEDDING_DATE = new Date('2026-10-24T12:00:00');
export const WEDDING_DATE_DISPLAY = '2026년 10월 24일 토요일 낮 12시';

export const RELATIONSHIP_START = new Date('2022-01-01T00:00:00');

export const INVITATION_BODY =
	'서로 다른 길을 걸어온 두 사람이 좋은 만남을 통해\n이제 한 가정을 이루려 합니다.\n서로를 아끼고 감사하는 마음으로 살아가고자 하오니\n귀한 걸음 하시어 축복해 주시면 감사하겠습니다.';

export const INVITATION_VERSE = {
	body: '장담하건대, 세상이 다 겨울이어도\n우리 사랑은 늘 봄처럼 따뜻하고\n간혹, 여름처럼 뜨거울 겁니다.',
	source: '이수동, 사랑가'
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

// 카카오맵 "지도 퍼가기(홈페이지에 담기)" 위젯 값
export const DAUM_ROUGHMAP = {
	containerId: 'daumRoughmapContainer1789900187054',
	timestamp: '1789900187054',
	key: 'v2mh4vkyyjh'
};

export const TRANSIT = [
	{ title: '지하철', lines: ['물만골역(3호선) 1번 출구, 약 400m', '배산역(3호선) 5번 출구, 약 700m'] },
	{ title: '버스', lines: ['5-1, 20, 51, 57, 62, 63, 131, 141 (신리삼거리 하차)'] },
	{
		title: '주차',
		lines: [
			'예식장 내 주차장은 지상 1층 및 지하 1층에 마련되어 있습니다.',
			'주차 공간이 다소 협소할 수 있으니, 가능하신 경우 대중교통을 이용해 주시면 감사하겠습니다.'
		]
	}
];

export const NOTICE = {
	title: '안내 말씀',
	body: '예식장 사정으로 화환은 정중히 사양합니다.\n너그러운 마음으로 양해 부탁드립니다.'
};

export const MEAL_NOTICE = {
	title: '식사 안내',
	body: '소중한 걸음 해주신 분들을 위해\n오전 11시부터 오후 1시까지 식사를 준비했습니다.\n예식 전후 편하신 시간에 여유롭게 이용해 주세요. 🤍'
};

export const CONTACTS = {
	groom: [{ label: '신랑', name: COUPLE.groom.name, tel: '010-6547-6187' }],
	bride: [{ label: '신부', name: COUPLE.bride.name, tel: '010-4482-4628' }]
};

export const ACCOUNTS = {
	groom: [
		{ label: '신랑측 장동숙', bank: '부산은행', num: '216-12-003546-9' },
		{ label: `신랑 ${COUPLE.groom.name}`, bank: '부산은행', num: '112-2006-5734-08' }
	],
	bride: [{ label: `신부 ${COUPLE.bride.name}`, bank: '카카오뱅크', num: '3333-24-9475003' }]
};

// ─── 사진 — 실제 사진으로 교체하세요 (static/ 에 넣고 경로만 바꾸면 됩니다) ───
export const PHOTOS = {
	intro: '/gallery/gallery-04.jpg',
	cover: '/gallery/gallery-14.jpg',
	fullscreen: '/gallery/gallery-18.jpg',
	ending: '/gallery/gallery-06.jpg',
	gallery: [
		'/gallery/gallery-01.jpg',
		'/gallery/gallery-02.jpg',
		'/gallery/gallery-03.jpg',
		'/gallery/gallery-05.jpg',
		'/gallery/gallery-07.jpg',
		'/gallery/gallery-08.jpg',
		'/gallery/gallery-09.jpg',
		'/gallery/gallery-11.jpg',
		'/gallery/gallery-12.jpg',
		'/gallery/gallery-13.jpg',
		'/gallery/gallery-14.jpg',
		'/gallery/gallery-15.jpg',
		'/gallery/gallery-16.jpg',
		'/gallery/gallery-17.jpg',
		'/gallery/gallery-18.jpg'
	]
};

export const INTRO_TITLE = 'TOGETHER\nFOREVER';

export const FULLSCREEN_QUOTE = 'JOIN US\nAS WE BECOME ONE';

export const CLOSING_QUOTE = {
	body: '한 사람이면 패하겠거니와 두 사람이면 맞설 수 있나니\n세 겹 줄은 쉽게 끊어지지 아니하느니라',
	source: '전도서 4:12'
};
