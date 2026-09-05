<script lang="ts">
	import type { Msg } from '$lib/guestbook';

	let {
		open = $bindable(),
		msgs,
		onDelete
	}: { open: boolean; msgs: Msg[]; onDelete: (id: number) => Promise<void> } = $props();

	let closing = $state(false);

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
</script>

{#if open || closing}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" class:closing onclick={close}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<section class="sheet" class:closing onclick={(e) => e.stopPropagation()}>
			<div class="header">
				<p class="title">방명록 ({msgs.length})</p>
				<button class="close-btn" onclick={close} aria-label="닫기">✕</button>
			</div>
			<div class="list">
				{#if msgs.length === 0}
					<p class="empty">아직 남겨진 메시지가 없어요.</p>
				{:else}
					{#each msgs as m (m.id)}
						<div class="msg-card">
							<div class="msg-head">
								<span class="msg-name">{m.name}</span>
								<span class="msg-date">{m.date}</span>
							</div>
							<p class="msg-text">{m.text}</p>
							<button class="del-btn" onclick={() => onDelete(m.id)}>삭제</button>
						</div>
					{/each}
				{/if}
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
		max-height: 75vh; display: flex; flex-direction: column;
		animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
	}
	.sheet.closing { animation: slide-down 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
	@keyframes overlay-in { from { background: rgba(0,0,0,0); } to { background: rgba(0,0,0,0.35); } }
	@keyframes overlay-out { from { background: rgba(0,0,0,0.35); } to { background: rgba(0,0,0,0); } }
	@keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
	@keyframes slide-down { from { transform: translateY(0); } to { transform: translateY(100%); } }

	.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-shrink: 0; }
	.title { font-size: 15px; font-weight: 500; letter-spacing: 0.04em; color: var(--text); margin: 0; }
	.close-btn { background: none; border: none; font-size: 14px; color: var(--muted); cursor: pointer; padding: 4px; }

	.list { overflow-y: auto; }
	.empty { font-size: 14px; color: var(--muted); text-align: center; padding: 2rem 0; }
	.msg-card { padding: 0.9rem 0; border-bottom: 1px solid var(--line); position: relative; }
	.msg-card:last-child { border-bottom: none; }
	.msg-head { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
	.msg-name { font-size: 14px; font-weight: 500; color: var(--text); }
	.msg-date { font-size: 12px; color: var(--muted); }
	.msg-text { font-size: 14px; color: var(--sub); line-height: 1.7; white-space: pre-line; margin: 0 0 0.4rem; }
	.del-btn { background: none; border: none; font-size: 12px; color: var(--muted); cursor: pointer; padding: 0; }
</style>
