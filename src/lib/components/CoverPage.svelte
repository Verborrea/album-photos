<script lang="ts">
	import { coverConfig } from '$lib/data/config';
</script>

<div class="cover">
	<enhanced:img src={coverConfig.photo} alt="" class="cover-photo" />
	<div class="scrim" aria-hidden="true"></div>
	<div class="frame" aria-hidden="true"></div>

	<div class="content">
		<h1 class="title font-script">{coverConfig.title}</h1>
		<div class="rule" aria-hidden="true"></div>
		<p class="date font-serif">{coverConfig.subtitle}</p>
	</div>
</div>

<style>
	.cover {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.cover-photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(23, 27, 48, 0.1) 0%,
			rgba(23, 27, 48, 0.3) 45%,
			rgba(23, 27, 48, 0.94) 100%
		);
	}

	.frame {
		position: absolute;
		inset: 0.7rem;
		border: 1px solid rgba(250, 243, 230, 0.35);
		pointer-events: none;
	}

	.content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 2.2rem 1.8rem 3rem;
		text-align: center;
	}

	.title {
		font-size: clamp(2.4rem, 11vw, 3.6rem);
		color: var(--cream);
		margin: 0;
		line-height: 1.05;
		text-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
	}

	.rule {
		width: 3rem;
		height: 2px;
		margin: 1rem auto;
		background: var(--gold);
		opacity: 0.8;
	}

	.date {
		font-size: 1.1rem;
		letter-spacing: 0.25em;
		color: rgba(250, 243, 230, 0.8);
		margin: 0;
	}
</style>
