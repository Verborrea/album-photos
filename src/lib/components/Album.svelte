<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Music, VolumeX, Play, Pause } from '@lucide/svelte';
	import PageFlipBook from './PageFlipBook.svelte';
	import AlbumPage from './AlbumPage.svelte';
	import FinalPage from './FinalPage.svelte';
	import PhotoZoomModal from './PhotoZoomModal.svelte';
	import { albumPages } from '$lib/data/pages';
	import { audioState, togglePlay, toggleMute } from '$lib/audio.svelte';

	const totalPages = albumPages.length + 1;
	const finalIndex = albumPages.length;

	let current = $state(0);
	let zoom = $state<{ src: string; rect: DOMRect; rotate: number } | null>(null);

	function handlePhotoClick(src: string, rect: DOMRect, rotate: number) {
		zoom = { src, rect, rotate };
	}

	function closeZoom() {
		zoom = null;
	}
</script>

<div class="album" in:fade>
	<div class="topbar">
		<button class="icon-btn" onclick={toggleMute} aria-label="Silenciar música">
			{#if audioState.muted}
				<VolumeX size={18} />
			{:else}
				<Music size={18} />
			{/if}
		</button>
		<span class="counter font-hand">Página {current + 1} de {totalPages}</span>
		<button class="icon-btn" onclick={togglePlay} aria-label="Pausar o reproducir">
			{#if audioState.playing}
				<Pause size={18} />
			{:else}
				<Play size={18} />
			{/if}
		</button>
	</div>

	<div class="stage">
		<PageFlipBook count={totalPages} bind:current>
			{#snippet children(i: number)}
				{#if i < finalIndex}
					<AlbumPage page={albumPages[i]} pageNumber={i + 1} onPhotoClick={handlePhotoClick} />
				{:else}
					<FinalPage active={current === finalIndex} />
				{/if}
			{/snippet}
		</PageFlipBook>
	</div>

	<div class="dots">
		{#each Array(totalPages) as _, i}
			<button
				class="dot"
				class:active={i === current}
				onclick={() => (current = i)}
				aria-label={`Ir a la página ${i + 1}`}
			></button>
		{/each}
	</div>
</div>

{#if zoom}
	<PhotoZoomModal src={zoom.src} rect={zoom.rect} rotate={zoom.rotate} onClose={closeZoom} />
{/if}

<style>
	.album {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		background: var(--navy-deep);
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: max(0.9rem, env(safe-area-inset-top)) 1rem 0.7rem;
		color: var(--cream);
		z-index: 50;
	}

	.icon-btn {
		width: 2.75rem;
		height: 2.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 50%;
		touch-action: manipulation;
	}

	.icon-btn:active {
		background: rgba(255, 255, 255, 0.18);
	}

	.counter {
		font-size: 1.3rem;
		opacity: 0.85;
	}

	.stage {
		flex: 1;
		position: relative;
		padding: 0 0.6rem 0.6rem;
		max-width: 480px;
		width: 100%;
		margin: 0 auto;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.8rem 0 max(1rem, env(safe-area-inset-bottom));
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: rgba(250, 243, 230, 0.3);
		transition:
			background 0.25s ease,
			transform 0.25s ease;
	}

	.dot.active {
		background: var(--gold);
		transform: scale(1.4);
	}
</style>
