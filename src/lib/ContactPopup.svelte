<script lang="ts">
	import { CONTACTS } from '$lib/data';

	let { open = $bindable() }: { open: boolean } = $props();
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
				<p class="title">연락하기</p>
				<button class="close-btn" onclick={close} aria-label="닫기">✕</button>
			</div>
			<div class="content">
				{#each [{ title: '신랑측', list: CONTACTS.groom }, { title: '신부측', list: CONTACTS.bride }] as side}
					<div class="group">
						<p class="group-title">{side.title}</p>
						{#each side.list as c}
							<div class="row">
								<div class="info">
									<span class="label">{c.label}</span>
									<span class="name">{c.name}</span>
								</div>
								<div class="actions">
									<a href="tel:{c.tel}" class="action-btn" aria-label="전화">📞</a>
									<a href="sms:{c.tel}" class="action-btn" aria-label="문자">💬</a>
								</div>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</section>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 400;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background: rgba(0, 0, 0, 0.35);
		animation: overlay-in 0.2s ease forwards;
	}
	.overlay.closing {
		animation: overlay-out 0.25s ease forwards;
	}
	.sheet {
		width: 100%;
		max-width: 425px;
		background: #fff;
		border-radius: 16px 16px 0 0;
		padding: 20px 24px calc(28px + env(safe-area-inset-bottom, 0));
		animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
	}
	.sheet.closing {
		animation: slide-down 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
	}
	@keyframes overlay-in { from { background: rgba(0,0,0,0); } to { background: rgba(0,0,0,0.35); } }
	@keyframes overlay-out { from { background: rgba(0,0,0,0.35); } to { background: rgba(0,0,0,0); } }
	@keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
	@keyframes slide-down { from { transform: translateY(0); } to { transform: translateY(100%); } }

	.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
	.title { font-size: 15px; font-weight: 500; letter-spacing: 0.04em; color: var(--text); margin: 0; }
	.close-btn { background: none; border: none; font-size: 14px; color: var(--muted); cursor: pointer; padding: 4px; }

	.content { display: flex; flex-direction: column; gap: 20px; }
	.group { display: flex; flex-direction: column; gap: 2px; }
	.group-title { font-size: 12px; color: var(--muted); letter-spacing: 0.06em; padding-bottom: 6px; border-bottom: 1px solid var(--line); margin: 0 0 4px; }
	.row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--bg2); }
	.row:last-child { border-bottom: none; }
	.info { display: flex; align-items: center; gap: 10px; }
	.label { font-size: 12px; color: var(--muted); min-width: 36px; }
	.name { font-size: 15px; font-weight: 500; color: var(--text); }
	.actions { display: flex; gap: 8px; }
	.action-btn {
		width: 34px; height: 34px;
		display: flex; align-items: center; justify-content: center;
		border-radius: 50%; background: var(--bg2);
		text-decoration: none; font-size: 15px;
	}
</style>
