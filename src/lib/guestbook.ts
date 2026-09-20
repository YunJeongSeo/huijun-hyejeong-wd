// Google Apps Script(Web App)로 백엔드를 삼은 방명록.
// 배포된 웹 앱 URL을 아래 SCRIPT_URL에 붙여넣으면 바로 동작합니다.
const SCRIPT_URL =
	'https://script.google.com/macros/s/AKfycbz7XcEudKvqis1vCjPzq9YwhvA-sBErWmUwx88KqR4WCIvXsy3bn4Owr8FteZd_IfP3/exec';

export interface Msg {
	id: number;
	name: string;
	text: string;
	date: string;
}

function formatDate(d: Date): string {
	const y = d.getFullYear();
	const mo = d.getMonth() + 1;
	const day = d.getDate();
	const h = String(d.getHours()).padStart(2, '0');
	const mi = String(d.getMinutes()).padStart(2, '0');
	return `${y}. ${mo}. ${day}. ${h}:${mi}`;
}

async function post(payload: Record<string, unknown>): Promise<{ ok: boolean }> {
	// Content-Type을 text/plain으로 보내야 Apps Script가 CORS preflight 없이 바로 받는다.
	const res = await fetch(SCRIPT_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'text/plain;charset=utf-8' },
		body: JSON.stringify(payload)
	});
	return res.json();
}

export async function fetchMsgs(): Promise<Msg[]> {
	const res = await fetch(SCRIPT_URL);
	const data = (await res.json()) as Msg[];
	return data.sort((a, b) => b.id - a.id);
}

export async function writeMsg(name: string, text: string, password: string): Promise<void> {
	await post({ action: 'add', name, text, date: formatDate(new Date()), password });
}

// 비밀번호가 일치해야 삭제되며, 성공 여부를 반환한다.
export async function deleteMsg(id: number, password: string): Promise<boolean> {
	const res = await post({ action: 'delete', id, password });
	return !!res.ok;
}
