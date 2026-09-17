<script lang="ts">
	import type { AlbumPageData } from '$lib/data/pages';

	let {
		page,
		pageNumber,
		onPhotoClick
	}: {
		page: AlbumPageData;
		pageNumber: number;
		onPhotoClick: (src: string, rect: DOMRect, rotate: number) => void;
	} = $props();

	const rotations = [-7, 5, -4, 8, -9, 3, -5, 6];
	const tapeRotations = [-18, 14, -22, 10];

	function click(e: MouseEvent, src: string, rotate: number) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		onPhotoClick(src, rect, rotate);
	}
</script>

<div class="page">
	<div class="page-scroll">
		{#if page.heading}
			<h2 class="heading font-hand">{page.heading}</h2>
		{/if}

		<div class="collage">
			{#each page.photos as photo, i}
				{@const rot = photo.rotate ?? rotations[i % rotations.length]}
				<button
					class="polaroid"
					class:big={i % 3 === 0}
					style="--rot: {rot}deg"
					onclick={(e) => click(e, photo.src, rot)}
					aria-label="Ampliar foto"
				>
					<span
						class="tape"
						style="--trot: {tapeRotations[i % tapeRotations.length]}deg"
						aria-hidden="true"
					></span>
					<img src={photo.src} alt={photo.caption ?? ''} loading="lazy" />
					{#if photo.caption}
						<span class="cap font-hand">{photo.caption}</span>
					{/if}
				</button>
			{/each}
		</div>

		{#if page.note}
			<p class="note font-hand">{page.note}</p>
		{/if}
	</div>

	<div class="page-number font-hand">{pageNumber}</div>
</div>

<style>
	.page {
		position: relative;
		width: 100%;
		height: 100%;
		background:
			radial-gradient(ellipse at top, rgba(255, 255, 255, 0.5), transparent 55%), var(--cream);
		display: flex;
		flex-direction: column;
	}

	.page-scroll {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		touch-action: pan-y;
		padding: 3.4rem 1.4rem 2rem;
		-webkit-overflow-scrolling: touch;
	}

	.heading {
		color: var(--wine);
		font-size: 2.4rem;
		text-align: center;
		margin: 0 0 1.6rem;
		line-height: 1.05;
		white-space: pre-line;
	}

	.collage {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.8rem 0.8rem;
		padding: 0 0.2rem;
	}

	.polaroid {
		position: relative;
		background: #fff;
		padding: 0.6rem 0.6rem 2.5rem;
		box-shadow: 0 10px 22px rgba(42, 34, 48, 0.22);
		transform: rotate(var(--rot));
		width: 42%;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	.polaroid.big {
		width: 54%;
	}

	.polaroid:active {
		transform: rotate(var(--rot)) scale(0.96);
	}

	.polaroid img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		background: #eee;
	}

	.tape {
		position: absolute;
		top: -0.6rem;
		left: 50%;
		width: 2.6rem;
		height: 1rem;
		background: rgba(217, 184, 114, 0.55);
		border: 1px solid rgba(217, 184, 114, 0.7);
		transform: translateX(-50%) rotate(var(--trot));
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.cap {
		position: absolute;
		bottom: 0.6rem;
		left: 0.25rem;
		right: 0.25rem;
		text-align: center;
		font-size: 1.05rem;
		line-height: 0.8;
		color: var(--ink);
	}

	.note {
		text-align: center;
		font-size: 1.5rem;
		color: var(--wine);
		margin: 1.8rem 0 0.5rem;
	}

	.page-number {
		position: absolute;
		bottom: 0.6rem;
		right: 1rem;
		font-size: 1.2rem;
		color: rgba(74, 28, 47, 0.45);
	}
</style>
