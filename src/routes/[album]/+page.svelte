<script lang="ts">
	import Album from '$lib/components/Album.svelte';
	import { albums } from '$lib/data/albums';

	let { data }: { data: { album: string } } = $props();

	const config = $derived(albums[data.album]);
</script>

<svelte:head>
	<title>{config.cover.title} — Nuestro Aniversario</title>
</svelte:head>

<Album {config} />
