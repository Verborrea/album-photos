<script lang="ts">
	import { fade } from 'svelte/transition';
	import PageFlipBook from './PageFlipBook.svelte';
	import CoverPage from './CoverPage.svelte';
	import AlbumPage from './AlbumPage.svelte';
	import FinalPage from './FinalPage.svelte';
	import PhotoZoomModal from './PhotoZoomModal.svelte';
	import { fastSrc, type AlbumConfig } from '$lib/data/albums';
	import { playWithFadeIn } from '$lib/audio.svelte';

	let { config }: { config: AlbumConfig } = $props();

	// Respaldo: si se llega a este álbum sin pasar por el botón de inicio
	// (o se navega directo de un álbum a otro), esto igual arranca la
	// canción correcta — y si ya estaba sonando la misma, no la reinicia.
	$effect(() => {
		playWithFadeIn(config.audioSrc, config.fadeInMs, config.targetVolume);
	});

	// Página 0 = portada, luego una página por cada elemento de config.pages,
	// y al final la página con la frase de aniversario.
	const totalPages = $derived(config.pages.length + 2);
	const finalIndex = $derived(config.pages.length + 1);

	// Lista de todas las fotos del álbum en orden, para el carrusel del zoom.
	const flatPhotos = $derived(
		config.pages.flatMap((p) => p.photos.map((photo) => fastSrc(photo.src)))
	);

	const colorVars = $derived(
		`--navy-deep:${config.colors.navyDeep}; --navy-mid:${config.colors.navyMid}; --navy-soft:${config.colors.navySoft}; --wine:${config.colors.wine}; --blush:${config.colors.blush}; --gold:${config.colors.gold};`
	);

	let current = $state(0);
	let zoom = $state<{ rect: DOMRect; rotate: number; index: number } | null>(null);

	function handlePhotoClick(src: string, rect: DOMRect, rotate: number) {
		const idx = flatPhotos.indexOf(src);
		zoom = { rect, rotate, index: idx < 0 ? 0 : idx };
	}

	function closeZoom() {
		zoom = null;
	}
</script>

<div class="album" style={colorVars} in:fade>
	<div class="topbar">
		<span class="counter font-hand">Página {current + 1} de {totalPages}</span>
	</div>

	<div class="stage">
		<PageFlipBook count={totalPages} bind:current>
			{#snippet children(i: number)}
				{#if i === 0}
					<CoverPage cover={config.cover} />
				{:else if i <= config.pages.length}
					<AlbumPage
						page={config.pages[i - 1]}
						pageNumber={i}
						onPhotoClick={handlePhotoClick}
					/>
				{:else}
					<FinalPage active={current === finalIndex} />
				{/if}
			{/snippet}
		</PageFlipBook>
	</div>

	<div class="dots">
		{#each Array(totalPages) as _, i (i)}
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
	<PhotoZoomModal
		photos={flatPhotos}
		bind:index={zoom.index}
		rect={zoom.rect}
		rotate={zoom.rotate}
		onClose={closeZoom}
	/>
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
		justify-content: center;
		padding: max(0.9rem, env(safe-area-inset-top)) 1rem 0.7rem;
		color: var(--cream);
		z-index: 50;
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
