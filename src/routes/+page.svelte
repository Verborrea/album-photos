<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import { siteConfig } from '$lib/data/config';
	import { albums } from '$lib/data/albums';

	const description = `Un álbum digital para celebrar nuestros ${siteConfig.subtitle}.`;
</script>

<svelte:head>
	<title>Nuestro Aniversario</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="Nuestro Aniversario" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={albums.novios.cover.photo} />
</svelte:head>

<Intro />
