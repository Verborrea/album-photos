<script lang="ts">
	import { goto } from '$app/navigation';
	import { siteConfig } from '$lib/data/config';
	import { albums, albumSlugs } from '$lib/data/albums';
	import { playWithFadeIn } from '$lib/audio.svelte';

	let opening = $state(false);

	function openAlbum(slug: string) {
		if (opening) return;
		opening = true;
		const album = albums[slug];
		playWithFadeIn(album.audioSrc, album.fadeInMs, album.targetVolume);
		goto(`/${slug}`);
	}
</script>

<div class="intro" class:opening>
	<div class="stars" aria-hidden="true">
		{#each Array(18) as _, i}
			<span
				class="star"
				style="top: {5 + ((i * 37) % 90)}%; left: {(i * 53) % 95}%; animation-delay: {i * 0.3}s;"
			></span>
		{/each}
	</div>

	<div class="heart" aria-hidden="true">♥</div>

	<p class="eyebrow font-hand">{siteConfig.eyebrow}</p>
	<h1 class="title font-script">{siteConfig.title}</h1>
	<p class="subtitle font-serif">{siteConfig.subtitle}</p>

	<div class="buttons">
		{#each albumSlugs as slug, i}
			<button
				class="cta"
				style="animation-delay: {0.85 + i * 0.12}s"
				onclick={() => openAlbum(slug)}
				disabled={opening}
			>
				<span>{albums[slug].label}</span>
			</button>
		{/each}
	</div>

	<p class="date font-serif">{siteConfig.weddingDate}</p>
</div>

<style>
	.intro {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem 1.5rem;
		background:
			radial-gradient(ellipse at 50% 15%, var(--navy-soft) 0%, transparent 60%),
			linear-gradient(160deg, var(--navy-deep) 0%, var(--wine) 130%);
		overflow: hidden;
		transition: opacity 0.6s ease;
	}

	.intro.opening {
		opacity: 0;
		pointer-events: none;
	}

	.stars {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.star {
		position: absolute;
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--gold);
		opacity: 0.6;
		animation: twinkle 3.5s ease-in-out infinite;
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.15;
			transform: scale(1);
		}
		50% {
			opacity: 0.9;
			transform: scale(1.6);
		}
	}

	.heart {
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		font-size: 4rem;
		line-height: 1;
		color: var(--blush);
		margin-bottom: 0.5rem;
		animation: pulse 2.4s ease-in-out infinite;
		filter: drop-shadow(0 0 12px rgba(243, 217, 223, 0.5));
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.15);
		}
	}

	.eyebrow {
		font-size: 1.6rem;
		color: var(--gold);
		letter-spacing: 0.05em;
		margin: 0;
		opacity: 0;
		animation: rise 0.9s ease forwards 0.15s;
	}

	.title {
		font-size: clamp(3.2rem, 14vw, 5.5rem);
		margin: 0.1em 0 0.2em;
		color: var(--cream);
		line-height: 1;
		text-shadow: 0 4px 30px rgba(217, 184, 114, 0.35);
		opacity: 0;
		animation: rise 1s ease forwards 0.35s;
	}

	.subtitle {
		font-size: 1.15rem;
		letter-spacing: 0.35em;
		text-transform: uppercase;
		color: var(--blush);
		margin: 0 0 2.4rem;
		opacity: 0;
		animation: rise 0.9s ease forwards 0.6s;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.9rem;
		width: 100%;
		max-width: 20rem;
	}

	.cta {
		background: linear-gradient(135deg, var(--gold), #c79a4b);
		color: var(--ink);
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		font-weight: 700;
		letter-spacing: 0.01em;
		font-size: 1.05rem;
		padding: 0.9rem 2rem;
		border-radius: 999px;
		box-shadow: 0 10px 30px rgba(217, 184, 114, 0.35);
		opacity: 0;
		animation: rise 0.9s ease forwards;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			opacity 0.4s ease;
	}

	.cta:active {
		transform: scale(0.96);
	}

	.cta:disabled {
		opacity: 0.7;
	}

	.date {
		margin-top: 1.6rem;
		font-size: 1.4rem;
		letter-spacing: 0.1em;
		color: rgba(217, 184, 114, 0.7);
		opacity: 0;
		animation: rise 0.9s ease forwards 1.3s;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
