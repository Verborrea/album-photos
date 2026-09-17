<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import Album from '$lib/components/Album.svelte';
	import { introConfig } from '$lib/data/config';
	import { playWithFadeIn } from '$lib/audio.svelte';

	let view = $state<'intro' | 'album'>('intro');

	function openAlbum() {
		playWithFadeIn(introConfig.audioSrc, introConfig.fadeInMs, introConfig.targetVolume);
		setTimeout(() => {
			view = 'album';
		}, 500);
	}
</script>

<svelte:head>
	<title>Nuestro Aniversario</title>
</svelte:head>

{#if view === 'intro'}
	<Intro onOpen={openAlbum} />
{:else}
	<Album />
{/if}
