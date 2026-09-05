<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import {
		COUPLE,
		WEDDING_DATE,
		WEDDING_DATE_DISPLAY,
		RELATIONSHIP_START,
		INVITATION_BODY,
		INVITATION_VERSE,
		VENUE,
		TRANSIT,
		NOTICE,
		ACCOUNTS,
		PHOTOS,
		INTRO_TITLE,
		FULLSCREEN_QUOTE,
		CLOSING_QUOTE
	} from '$lib/data';
	import { type Msg, fetchMsgs, writeMsg, deleteMsg } from '$lib/guestbook';
	import ContactPopup from '$lib/ContactPopup.svelte';
	import GuestbookPopup from '$lib/GuestbookPopup.svelte';
	import GuestbookViewPopup from '$lib/GuestbookViewPopup.svelte';

	let introOpen = $state(true);
	let introClosing = $state(false);
	let contactOpen = $state(false);
	let gbWriteOpen = $state(false);
	let gbViewOpen = $state(false);
	let groomOpen = $state(false);
	let brideOpen = $state(false);
	let lbOpen = $state(false);
	let lbIdx = $state(0);

	let toastMsg = $state('');
	let toastOn = $state(false);

	let msgs = $state<Msg[]>([]);

	let dLeft = $state({ d: 0, h: 0, m: 0, s: 0 });
	let daysTogether = $state(0);

	const calRows = buildCalendar(WEDDING_DATE.getFullYear(), WEDDING_DATE.getMonth());

	function buildCalendar(year: number, month: number): (number | null)[][] {
		const firstDay = new Date(year, month, 1).getDay();
		const lastDate = new Date(year, month + 1, 0).getDate();
		const rows: (number | null)[][] = [];
		let row: (number | null)[] = new Array(firstDay).fill(null);
		for (let d = 1; d <= lastDate; d++) {
			row.push(d);
			if (row.length === 7) {
				rows.push(row);
				row = [];
			}
		}
		if (row.length) {
			while (row.length < 7) row.push(null);
			rows.push(row);
		}
		return rows;
	}

	function tickCountdown() {
		const diff = WEDDING_DATE.getTime() - Date.now();
		if (diff <= 0) {
			dLeft = { d: 0, h: 0, m: 0, s: 0 };
			return;
		}
		const s = Math.floor(diff / 1000);
		dLeft = {
			d: Math.floor(s / 86400),
			h: Math.floor((s % 86400) / 3600),
			m: Math.floor((s % 3600) / 60),
			s: s % 60
		};
	}

	function toast(m: string) {
		toastMsg = m;
		toastOn = true;
		setTimeout(() => (toastOn = false), 2000);
	}

	async function copy(text: string, label: string) {
		try {
			await navigator.clipboard.writeText(text);
			toast(`${label} 복사됨`);
		} catch {
			toast('복사 실패');
		}
	}

	async function loadMsgs() {
		msgs = await fetchMsgs();
	}
	async function addMsg(name: string, text: string) {
		await writeMsg(name, text);
		toast('메시지가 등록되었습니다 ♡');
		await loadMsgs();
	}
	async function removeMsg(id: number) {
		await deleteMsg(id);
		await loadMsgs();
	}

	function openLb(i: number) {
		lbIdx = i;
		lbOpen = true;
	}
	function lbPrev() {
		lbIdx = (lbIdx - 1 + PHOTOS.gallery.length) % PHOTOS.gallery.length;
	}
	function lbNext() {
		lbIdx = (lbIdx + 1) % PHOTOS.gallery.length;
	}

	async function shareInvite() {
		const title = `${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다`;
		if (navigator.share) await navigator.share({ title, url: location.href });
		else await copy(location.href, '링크');
	}

	function closeIntro() {
		if (!introOpen || introClosing) return;
		introClosing = true;
		setTimeout(() => {
			introOpen = false;
			introClosing = false;
		}, 500);
	}

	$effect(() => {
		document.body.style.overflow = introOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	onMount(() => {
		daysTogether = Math.floor((Date.now() - RELATIONSHIP_START.getTime()) / 86400000);
		tickCountdown();
		const timer = setInterval(tickCountdown, 1000);
		const introTimer = setTimeout(closeIntro, 3200);

		const obs = new IntersectionObserver(
			(entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('on')),
			{ threshold: 0.08 }
		);
		document.querySelectorAll('.fi').forEach((el) => obs.observe(el));

		return () => {
			clearInterval(timer);
			clearTimeout(introTimer);
			obs.disconnect();
		};
	});
</script>

<svelte:head>
	<title>{COUPLE.groom.name} ♥ {COUPLE.bride.name}</title>
</svelte:head>

{#if introOpen}
	<div class="intro" class:closing={introClosing}>
		<img src={PHOTOS.cover} alt="" class="intro-img" />
		<div class="intro-tint"></div>
		<button class="intro-skip" onclick={closeIntro}>SKIP ↘</button>
		<div class="intro-content">
			<p class="intro-title">{INTRO_TITLE}</p>
			<div class="intro-labels">
				<span>WEDDING</span>
				<span>INVITATION</span>
			</div>
		</div>
	</div>
{/if}

<div class="wrap">
	<!-- 1. COVER -->
	<section class="cover">
		<img src={PHOTOS.cover} alt="커버 사진" class="cover-img" />
		<div class="cover-overlay">
			<p class="cover-overline">Wedding Invitation</p>
			<p class="cover-date">{WEDDING_DATE_DISPLAY}</p>
			<p class="cover-names">{COUPLE.groom.name}<span class="cover-heart">♥</span>{COUPLE.bride.name}</p>
		</div>
	</section>

	<!-- 2. 인사말 -->
	<section class="sec inv-sec">
		<span class="lbl">INVITATION</span>
		<p class="ko-title fi">초대의 글</p>
		<p class="invite-body fi d1">{INVITATION_BODY}</p>
		<p class="invite-verse fi d1">
			"{INVITATION_VERSE.body}"
			<span class="invite-verse-source">({INVITATION_VERSE.source})</span>
		</p>
		<hr class="hr-sm fi d1" />
		<div class="family-rows fi d2">
			<div class="family-row">
				<span class="person-name">{COUPLE.groom.parent}</span>
				<span class="parent-of">의 {COUPLE.groom.relation}</span>
				<span class="person-name">{COUPLE.groom.name}</span>
			</div>
			<div class="family-row">
				<span class="person-name">{COUPLE.bride.parent}</span>
				<span class="parent-of">의 {COUPLE.bride.relation}</span>
				<span class="person-name">{COUPLE.bride.name}</span>
			</div>
		</div>
		<button class="btn-contact fi d2" onclick={() => (contactOpen = true)}>연락하기</button>
	</section>

	<!-- 4. 캘린더 + D-day -->
	<section class="sec" style="text-align: center">
		<p class="dt-main fi">{WEDDING_DATE_DISPLAY}</p>

		<div class="cal-grid fi d1">
			{#each ['일', '월', '화', '수', '목', '금', '토'] as h, i}
				<div class="cal-head" class:sun={i === 0} class:sat={i === 6}>{h}</div>
			{/each}
			{#each calRows as row}
				{#each row as d, ci}
					<div class="cal-cell" class:sun={ci === 0} class:sat={ci === 6} class:wd={d === WEDDING_DATE.getDate()}>
						{#if d === WEDDING_DATE.getDate()}<span>{d}</span>{:else}{d ?? ''}{/if}
					</div>
				{/each}
			{/each}
		</div>

		<div class="countdown fi d2">
			<div class="cd-item"><span class="cd-num">{dLeft.d}</span><span class="cd-lbl">DAYS</span></div>
			<div class="cd-item"><span class="cd-num">{String(dLeft.h).padStart(2, '0')}</span><span class="cd-lbl">HOUR</span></div>
			<div class="cd-item"><span class="cd-num">{String(dLeft.m).padStart(2, '0')}</span><span class="cd-lbl">MIN</span></div>
			<div class="cd-item"><span class="cd-num">{String(dLeft.s).padStart(2, '0')}</span><span class="cd-lbl">SEC</span></div>
		</div>
		<p class="cd-caption fi d2">
			{COUPLE.bride.name}, {COUPLE.groom.name}의 결혼식이 {dLeft.d}일 남았습니다.
		</p>

		<hr class="hr-sm fi d3" />
		<p class="together-lbl fi d3">함께 보낸 소중한 날</p>
		<p class="together-num fi d3">+{daysTogether}일</p>
	</section>

	<!-- 6. 풀스크린 포토 -->
	<section class="fullscreen">
		<img src={PHOTOS.fullscreen} alt="포토" class="fullscreen-img" />
		<p class="fullscreen-quote">{FULLSCREEN_QUOTE}</p>
	</section>

	<!-- 7. LOCATION -->
	<section class="sec loc-sec">
		<span class="lbl">LOCATION</span>
		<p class="ko-title fi">오시는 길</p>

		<div class="loc-info fi d1">
			<p class="hall-name">{VENUE.name}</p>
			{#if VENUE.hall}<p class="loc-detail">{VENUE.hall}</p>{/if}
			<p class="loc-address">{VENUE.address}</p>
			<a href="tel:{VENUE.tel}" class="loc-tel">Tel. {VENUE.tel}</a>
		</div>

		<div class="navi-btns fi d2">
			<a href={VENUE.naverMapUrl} target="_blank" rel="noopener" class="navi-btn naver">네이버지도</a>
			<a href={VENUE.tmapUrl} class="navi-btn tmap">티맵</a>
			<a href={VENUE.kakaoNaviUrl} target="_blank" rel="noopener" class="navi-btn kakao">카카오맵</a>
		</div>

		<ul class="tp-list fi d3">
			{#each TRANSIT as t}
				<li class="tp-item">
					<span class="tp-title">{t.title}</span>
					<div class="tp-content">
						{#each t.lines as line}<p>{line}</p>{/each}
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<!-- 8. NOTICE -->
	<section class="sec" style="text-align: center">
		<span class="lbl">NOTICE</span>
		<p class="ko-title fi">{NOTICE.title}</p>
		<p class="invite-body fi d1">{NOTICE.body}</p>
	</section>

	<!-- 9. GALLERY -->
	<section class="sec gall-sec">
		<span class="lbl">GALLERY</span>
		<p class="ko-title fi">웨딩 갤러리</p>
		<div class="gall-grid fi d1">
			{#each PHOTOS.gallery as src, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="gall-item" style="background-image: url('{src}')" onclick={() => openLb(i)}></div>
			{/each}
		</div>
	</section>

	{#if lbOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="lb-ov" onclick={() => (lbOpen = false)}>
			<button class="lb-close" onclick={() => (lbOpen = false)}>✕</button>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="lb-img-wrap" onclick={(e) => e.stopPropagation()}>
				<img src={PHOTOS.gallery[lbIdx]} alt="갤러리 사진 {lbIdx + 1}" />
			</div>
			<button class="lb-arr lb-prev" onclick={(e) => { e.stopPropagation(); lbPrev(); }}>‹</button>
			<button class="lb-arr lb-next" onclick={(e) => { e.stopPropagation(); lbNext(); }}>›</button>
		</div>
	{/if}

	<!-- 10. GUESTBOOK -->
	<section class="sec gb-sec">
		<span class="lbl">GUESTBOOK</span>
		<p class="ko-title fi">방명록</p>
		<p class="gb-note fi d1">신랑, 신부에게<br />축하하는 글을 남겨보세요.</p>
		<div class="gb-tools fi d1">
			<button class="gb-btn" onclick={() => (gbWriteOpen = true)}>방명록 작성하기</button>
			<button class="gb-btn" onclick={() => { gbViewOpen = true; loadMsgs(); }}>방명록 전체보기</button>
		</div>
	</section>

	<!-- 11. ACCOUNT -->
	<section class="sec acc-sec">
		<span class="lbl">ACCOUNT</span>
		<p class="ko-title fi">마음 전하실 곳</p>
		<p class="acc-desc fi d1">
			참석이 어려우신 분들을 위해<br />
			계좌번호를 기재하였습니다.<br />
			너그러운 마음으로 양해 부탁드립니다.
		</p>

		<div class="acc-body-wrap fi d2">
			<div class="acc-panel" style="border-top: 1px solid var(--line)">
				<button class="acc-head" onclick={() => (groomOpen = !groomOpen)}>
					신랑측 계좌번호 <span class="chevron" class:open={groomOpen}>▾</span>
				</button>
				{#if groomOpen}
					<div class="acc-body" transition:slide={{ duration: 220 }}>
						{#each ACCOUNTS.groom as a}
							<div class="acc-row">
								<div>
									<p class="acc-sub">{a.label} · {a.bank}</p>
									<p class="acc-num">{a.num}</p>
								</div>
								<button class="btn-ghost" onclick={() => copy(a.num, a.label)}>복사</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div class="acc-panel">
				<button class="acc-head" onclick={() => (brideOpen = !brideOpen)}>
					신부측 계좌번호 <span class="chevron" class:open={brideOpen}>▾</span>
				</button>
				{#if brideOpen}
					<div class="acc-body" transition:slide={{ duration: 220 }}>
						{#each ACCOUNTS.bride as a}
							<div class="acc-row">
								<div>
									<p class="acc-sub">{a.label} · {a.bank}</p>
									<p class="acc-num">{a.num}</p>
								</div>
								<button class="btn-ghost" onclick={() => copy(a.num, a.label)}>복사</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- 14. 클로징 -->
	<div class="ending-area">
		<div class="ending-photo">
			<img src={PHOTOS.ending} alt="엔딩 사진" />
			<div class="ending-overlay">
				<p class="ending-quote">{CLOSING_QUOTE.body}</p>
				<p class="ending-source">{CLOSING_QUOTE.source}</p>
			</div>
		</div>

		<table class="save-table">
			<tbody>
				<tr><th>DATE</th><td>{WEDDING_DATE_DISPLAY}</td></tr>
				<tr><th>LOCATION</th><td>{VENUE.name}{VENUE.hall ? ` ${VENUE.hall}` : ''}</td></tr>
			</tbody>
		</table>

		<button class="share-btn" onclick={shareInvite}>초대장 공유하기</button>
		<p class="copyright">Copyright © {new Date().getFullYear()}. All rights reserved.</p>
	</div>

	<div class="toast" class:show={toastOn}>{toastMsg}</div>

	<ContactPopup bind:open={contactOpen} />
	<GuestbookPopup bind:open={gbWriteOpen} onSubmit={addMsg} />
	<GuestbookViewPopup bind:open={gbViewOpen} {msgs} onDelete={removeMsg} />
</div>

<style>
	/* Intro — 오프닝 화면 */
	.intro {
		position: fixed;
		inset: 0;
		z-index: 500;
		overflow: hidden;
		animation: intro-fade-in 0.3s ease;
	}
	.intro.closing {
		animation: intro-fade-out 0.5s ease forwards;
	}
	@keyframes intro-fade-in {
		from { opacity: 0; }
	}
	@keyframes intro-fade-out {
		to { opacity: 0; }
	}
	.intro-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(0.15) brightness(0.82);
		transform: scale(1.06);
		animation: intro-img-pan 4s ease-out forwards;
	}
	@keyframes intro-img-pan {
		from { transform: scale(1.12); }
		to { transform: scale(1.02); }
	}
	.intro-tint {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0.6) 100%);
	}
	.intro-skip {
		position: absolute;
		top: 1.2rem;
		right: 1.2rem;
		background: rgba(0, 0, 0, 0.45);
		color: #fff;
		border: none;
		border-radius: 20px;
		padding: 0.45rem 1rem;
		font-size: 12px;
		letter-spacing: 0.05em;
		cursor: pointer;
	}
	.intro-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 1.6rem 3rem;
		opacity: 0;
		transform: translateY(16px);
		animation: intro-text-in 1s ease forwards;
		animation-delay: 0.4s;
	}
	@keyframes intro-text-in {
		to { opacity: 1; transform: none; }
	}
	.intro-title {
		font-family: 'Playfair Display', serif;
		font-weight: 700;
		text-transform: uppercase;
		font-size: clamp(2.6rem, 13vw, 3.6rem);
		line-height: 1.08;
		letter-spacing: 0.01em;
		color: #fff;
		white-space: pre-line;
		margin: 0 0 1.6rem;
	}
	.intro-labels {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		letter-spacing: 0.22em;
		color: rgba(255, 255, 255, 0.85);
	}

	/* Cover — 입장 애니메이션 */
	.cover { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: #ddd; }
	.cover-img {
		width: 100%; height: 100%; object-fit: cover;
		opacity: 0; transform: scale(1.08);
		animation: cover-img-in 1.8s ease forwards;
	}
	.cover-overlay {
		position: absolute; left: 0; right: 0; bottom: 0;
		padding: 2.2rem 1.5rem;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 75%);
		color: #fff; text-align: center;
	}
	.cover-overline,
	.cover-date,
	.cover-names {
		opacity: 0;
		transform: translateY(14px);
		animation: cover-text-in 0.9s ease forwards;
	}
	.cover-overline {
		font-family: 'Playfair Display', serif;
		font-style: italic;
		font-size: 13px;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.85);
		margin: 0 0 0.6rem;
		animation-delay: 0.5s;
	}
	.cover-date { font-size: 13px; margin: 0 0 0.35rem; animation-delay: 0.9s; }
	.cover-names { font-size: 1.4rem; letter-spacing: 0.06em; margin: 0; animation-delay: 1.3s; }
	.cover-heart { color: var(--pink); margin: 0 0.4em; font-size: 0.85em; }

	@keyframes cover-img-in {
		to { opacity: 1; transform: scale(1); }
	}
	@keyframes cover-text-in {
		to { opacity: 1; transform: none; }
	}

	/* Invitation */
	.inv-sec { text-align: center; }
	.ko-title { font-size: 20px; font-weight: 500; letter-spacing: 0.04em; margin: 0.5rem 0 1.6rem; }
	.invite-body { font-size: 15px; line-height: 1.8; color: var(--sub); white-space: pre-line; }
	.invite-verse {
		font-size: 13px; line-height: 1.9; color: var(--sub); font-style: italic;
		white-space: pre-line; margin: 1.6rem 0 0; padding: 0 0.5rem;
	}
	.invite-verse-source { font-size: 12px; color: var(--muted); font-style: normal; margin-top: 0.4rem; }
	.family-rows { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.6rem; color: var(--sub); }
	.family-row { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
	.person-name { font-weight: 500; color: var(--text); }
	.btn-contact {
		width: 200px; padding: 0.7rem; margin: 0 auto; display: block;
		background: #fff; border: 1px solid var(--line); border-radius: 12px;
		color: var(--text); font-size: 15px; cursor: pointer;
	}
	.btn-contact:hover { background: var(--bg2); }

	/* Calendar / countdown */
	.dt-main { font-size: 17px; font-weight: 500; margin: 0 0 1.4rem; }
	.cal-grid {
		display: grid; grid-template-columns: repeat(7, 1fr);
		align-items: center; justify-items: center;
		font-size: clamp(13px, 3.8vw, 16px);
		line-height: clamp(2rem, 9vw, 2.4rem);
		width: min(305px, 100%); margin: 0 auto;
	}
	.cal-head { font-size: 13px; color: var(--muted); padding: 0.3rem 0; }
	.cal-head.sun, .cal-cell.sun { color: #d08070; }
	.cal-head.sat, .cal-cell.sat { color: #7090c4; }
	.cal-cell.wd span {
		display: inline-flex; align-items: center; justify-content: center;
		width: clamp(1.7rem, 8vw, 2rem); height: clamp(1.7rem, 8vw, 2rem);
		background: var(--pink); color: #fff; border-radius: 50%;
	}
	.countdown { display: flex; justify-content: center; gap: 1.4rem; margin: 1.6rem 0 0.8rem; }
	.cd-item { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
	.cd-num { font-size: 1.5rem; font-weight: 600; color: var(--text); }
	.cd-lbl { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; }
	.cd-caption { font-size: 13px; color: var(--sub); }
	.together-lbl { font-size: 14px; color: var(--pink); margin-bottom: 0.3rem; }
	.together-num { font-size: 1.2rem; font-weight: 500; }

	/* Fullscreen */
	.fullscreen { position: relative; aspect-ratio: 4 / 5; overflow: hidden; }
	.fullscreen-img { width: 100%; height: 100%; object-fit: cover; }
	.fullscreen-quote {
		position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
		text-align: center; white-space: pre-line;
		font-family: 'Crimson Pro', serif; font-size: clamp(1.6rem, 8vw, 2.2rem);
		letter-spacing: 0.06em; color: #fff; text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
		margin: 0; padding: 2rem;
	}

	/* Location */
	.loc-sec { text-align: center; }
	.loc-info { margin: 0 0 1.6rem; }
	.hall-name { font-size: 18px; font-weight: 500; margin-bottom: 10px; }
	.loc-detail { font-size: 14px; color: var(--sub); margin-bottom: 2px; }
	.loc-address { font-size: 14px; color: var(--muted); margin-bottom: 14px; }
	.loc-tel { font-size: 15px; color: var(--text); text-decoration: none; }
	.navi-btns { display: flex; gap: 0.5rem; margin-bottom: 1.8rem; }
	.navi-btn {
		flex: 1; display: flex; align-items: center; justify-content: center;
		padding: 0.55rem 0.4rem; border-radius: 8px;
		font-size: 13px; color: #fff; text-decoration: none;
	}
	.navi-btn.naver { background: #03cd5e; }
	.navi-btn.tmap { background: #4a4df7; }
	.navi-btn.kakao { background: #f7e111; color: #333; }
	.tp-list { list-style: none; padding: 0; margin: 0; text-align: left; }
	.tp-item { display: flex; gap: 1rem; padding: 0.9rem 0; border-bottom: 1px solid var(--line); }
	.tp-item:first-child { border-top: 1px solid var(--line); }
	.tp-title { font-size: 14px; font-weight: 500; min-width: 44px; padding-top: 2px; }
	.tp-content p { font-size: 14px; color: var(--sub); line-height: 1.75; margin: 0; }

	/* Gallery */
	.gall-sec { text-align: center; }
	.gall-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; margin-top: 1.6rem; }
	.gall-item { aspect-ratio: 3 / 4; background-size: cover; background-position: center; cursor: pointer; }
	.lb-ov {
		position: fixed; inset: 0; background: rgba(0, 0, 0, 0.94); z-index: 200;
		display: flex; align-items: center; justify-content: center;
	}
	.lb-img-wrap img { max-width: 90vw; max-height: 90vh; display: block; }
	.lb-close { position: absolute; top: 1rem; right: 1rem; color: rgba(255, 255, 255, 0.7); font-size: 1.6rem; background: none; border: none; cursor: pointer; }
	.lb-arr { position: absolute; top: 50%; transform: translateY(-50%); background: none; border: none; color: rgba(255, 255, 255, 0.6); font-size: 2.4rem; cursor: pointer; padding: 1rem; }
	.lb-prev { left: 0; }
	.lb-next { right: 0; }

	/* Guestbook */
	.gb-sec { text-align: center; }
	.gb-note { font-size: 14px; color: var(--sub); line-height: 1.6; margin-bottom: 1.4rem; }
	.gb-tools { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
	.gb-btn {
		width: 200px; padding: 0.75rem 0.5rem;
		border: 1px solid var(--line); border-radius: 10px; background: #fff;
		color: var(--text); font-size: 14px; cursor: pointer;
	}
	.gb-btn:hover { background: var(--bg2); }

	/* Account */
	.acc-sec { text-align: center; }
	.acc-desc { font-size: 14px; color: var(--sub); line-height: 1.8; margin-bottom: 2rem; }
	.acc-panel { border-bottom: 1px solid var(--line); }
	.acc-head {
		display: flex; align-items: center; justify-content: space-between;
		width: 100%; padding: 1rem 0; background: none; border: none;
		font-size: 15px; color: var(--text); cursor: pointer; text-align: left;
	}
	.chevron { transition: transform 0.2s; color: var(--muted); }
	.chevron.open { transform: rotate(180deg); }
	.acc-body { padding-bottom: 1rem; }
	.acc-row { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; }
	.acc-sub { font-size: 12px; color: var(--muted); margin: 0 0 2px; }
	.acc-num { font-size: 14px; margin: 0; }
	.btn-ghost {
		padding: 0.32rem 0.7rem; border: 1px solid var(--line); background: transparent;
		font-size: 12px; color: var(--text); cursor: pointer; border-radius: 6px;
	}
	.btn-ghost:hover { border-color: var(--pink); color: var(--pink); }

	/* Ending */
	.ending-area { display: flex; flex-direction: column; align-items: center; padding-bottom: 3rem; }
	.ending-photo { position: relative; width: 100%; aspect-ratio: 4 / 5; overflow: hidden; }
	.ending-photo img { width: 100%; height: 100%; object-fit: cover; }
	.ending-overlay {
		position: absolute; inset: 0; display: flex; flex-direction: column;
		align-items: center; justify-content: center; text-align: center; padding: 2rem;
		background: rgba(0, 0, 0, 0.35); color: #fff;
	}
	.ending-quote { font-size: 15px; line-height: 2; white-space: pre-line; margin: 0 0 0.6rem; }
	.ending-source { font-size: 13px; color: #ccc; margin: 0; }
	.save-table { width: 100%; max-width: 320px; margin: 2rem auto 1.6rem; border-collapse: collapse; }
	.save-table th, .save-table td { padding: 0.6rem 0.4rem; border-bottom: 1px solid var(--line); font-size: 13px; text-align: left; }
	.save-table th { color: var(--muted); font-weight: 500; width: 90px; letter-spacing: 0.05em; }
	.share-btn {
		padding: 0.7rem 1.6rem; border: 1px solid var(--line); border-radius: 10px;
		background: #fff; color: var(--text); font-size: 14px; cursor: pointer; margin-bottom: 1rem;
	}
	.copyright { font-size: 12px; color: var(--muted); }
</style>
