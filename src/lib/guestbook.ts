// 브라우저 localStorage 기반 방명록.
// 기기/브라우저 간 공유가 안 되므로, 실제 배포 시엔 Google Apps Script 등 백엔드로 교체하세요.
const STORAGE_KEY = 'guestbook-msgs';

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

function readAll(): Msg[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Msg[]) : [];
	} catch {
		return [];
	}
}

function writeAll(msgs: Msg[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

export async function fetchMsgs(): Promise<Msg[]> {
	return readAll().sort((a, b) => b.id - a.id);
}

export async function writeMsg(name: string, text: string): Promise<void> {
	const msgs = readAll();
	msgs.push({ id: Date.now(), name, text, date: formatDate(new Date()) });
	writeAll(msgs);
}

export async function deleteMsg(id: number): Promise<void> {
	writeAll(readAll().filter((m) => m.id !== id));
}
