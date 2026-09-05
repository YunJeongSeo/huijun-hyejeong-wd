<script lang="ts">
	let {
		open = $bindable(),
		onSubmit
	}: { open: boolean; onSubmit: (name: string, text: string) => Promise<void> } = $props();

	let closing = $state(false);
	let name = $state('');
	let text = $state('');
	let submitting = $state(false);

	$effect(() => {
		if (open) document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function close() {
		closing = true;
		setTimeout(() => {
			open = false;
			closing = false;
		}, 250);
	}

	async function submit() {
		if (!name.trim() || !text.trim() || submitting) return;
		submitting = true;
		await onSubmit(name.trim(), text.trim());
		submitting = false;
		name = '';
		text = '';
		close();
	}
</script>

{#if open || closing}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" class:closing onclick={close}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<section class="sheet" class:closing onclick={(e) => e.stopPropagation()}>
			<div class="header">
				<p class="title">방명록 작성하기</p>
				<button class="close-btn" onclick={close} aria-label="닫기">✕</button>
			</div>
			<div class="form">
				<input class="inp" placeholder="이름" bind:value={name} maxlength="20" />
				<textarea class="inp textarea" placeholder="따뜻한 축하 메시지를 남겨주세요" bind:value={text} maxlength="300" rows="4"></textarea>
				<button class="submit-btn" onclick={submit} disabled={submitting || !name.trim() || !text.trim()}>
					{submitting ? '등록 중...' : '등록하기'}
				</button>
			</div>
		</section>
	</div>
{/if}

<style>
	.overlay {
		position: fixed; inset: 0; z-index: 400;
		display: flex; align-items: flex-end; justify-content: center;
		background: rgba(0, 0, 0, 0.35);
		animation: overlay-in 0.2s ease forwards;
	}
	.overlay.closing { animation: overlay-out 0.25s ease forwards; }
	.sheet {
		width: 100%; max-width: 425px; background: #fff;
		border-radius: 16px 16px 0 0;
		padding: 20px 24px calc(28px + env(safe-area-inset-bottom, 0));
		animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
	}
	.sheet.closing { animation: slide-down 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
	@keyframes overlay-in { from { background: rgba(0,0,0,0); } to { background: rgba(0,0,0,0.35); } }
	@keyframes overlay-out { from { background: rgba(0,0,0,0.35); } to { background: rgba(0,0,0,0); } }
	@keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
	@keyframes slide-down { from { transform: translateY(0); } to { transform: translateY(100%); } }

	.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
	.title { font-size: 15px; font-weight: 500; letter-spacing: 0.04em; color: var(--text); margin: 0; }
	.close-btn { background: none; border: none; font-size: 14px; color: var(--muted); cursor: pointer; padding: 4px; }

	.form { display: flex; flex-direction: column; gap: 10px; }
	.inp {
		width: 100%; padding: 0.7rem 0.9rem;
		border: 1px solid var(--line); background: var(--bg2);
		font-size: 15px; color: var(--text); outline: none;
		border-radius: 8px; box-sizing: border-box;
	}
	.inp:focus { border-color: var(--pink); }
	.textarea { resize: none; font-family: inherit; }
	.submit-btn {
		width: 100%; padding: 0.78rem; background: var(--text); color: #fff;
		font-size: 15px; border: none; border-radius: 10px; cursor: pointer;
	}
	.submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
