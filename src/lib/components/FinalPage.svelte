<script lang="ts">
	import { finalMessageLines as segments } from '$lib/data/pages';

	let { active }: { active: boolean } = $props();
</script>

<div class="page">
	<div class="glow" aria-hidden="true"></div>

	{#if active}
		{#key active}
			<div class="sparkles" aria-hidden="true">
				{#each Array(14) as _, i}
					<span class="spark" style="left: {(i * 41) % 92}%; animation-delay: {i * 0.4}s;"></span>
				{/each}
			</div>

			<div class="heart-motif" style="animation-delay: 0.1s">♥</div>

			<div class="phrase">
				{#each segments as seg, i}
					<p class="line font-serif" style="animation-delay: {0.4 + i * 0.7}s">
						{seg}
					</p>
				{/each}
			</div>

			<div class="years font-hand" style="animation-delay: {0.4 + segments.length * 0.7 + 0.3}s">
				10 años
			</div>
		{/key}
	{/if}
</div>

<style>
	.page {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2.5rem 1.6rem;
		overflow: hidden;
		background: linear-gradient(160deg, var(--navy-deep) 0%, var(--wine) 140%);
	}

	.glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 40%, rgba(217, 184, 114, 0.25), transparent 65%);
		pointer-events: none;
	}

	.sparkles {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.spark {
		position: absolute;
		bottom: -10%;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--gold);
		opacity: 0;
		animation: float 5.5s ease-in infinite;
	}

	@keyframes float {
		0% {
			opacity: 0;
			transform: translateY(0) scale(0.6);
		}
		15% {
			opacity: 0.9;
		}
		100% {
			opacity: 0;
			transform: translateY(-120%) scale(1.2);
		}
	}

	.heart-motif {
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		font-size: 4.4rem;
		line-height: 1;
		color: var(--blush);
		margin-bottom: 1rem;
		opacity: 0;
		animation: appear 1s ease forwards;
		filter: drop-shadow(0 0 16px rgba(243, 217, 223, 0.5));
	}

	.phrase {
		max-width: 30rem;
	}

	.line {
		font-size: clamp(1.1rem, 4.6vw, 1.5rem);
		line-height: 1.6;
		color: var(--cream);
		margin: 0 0 0.55rem;
		opacity: 0;
		transform: translateY(18px);
		text-wrap: pretty;
		animation: appear 0.9s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
	}

	.line:last-child {
		font-family: 'Great Vibes', cursive;
		font-size: clamp(2rem, 8vw, 2.8rem);
		color: var(--gold);
		margin-top: 0.6rem;
	}

	.years {
		margin-top: 2rem;
		font-size: 1.6rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(250, 243, 230, 0.55);
		opacity: 0;
		animation: appear 1s ease forwards;
	}

	@keyframes appear {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
