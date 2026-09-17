<script lang="ts">
	import { fly } from 'svelte/transition';
	import { X, ChevronLeft, ChevronRight } from '@lucide/svelte';

	let {
		photos,
		index = $bindable(),
		rect,
		rotate = 0,
		onClose
	}: {
		photos: string[];
		index: number;
		rect: DOMRect;
		rotate?: number;
		onClose: () => void;
	} = $props();

	let expanded = $state(false);
	let dir = $state(1);
	let startX = 0;
	let dragging = false;

	$effect(() => {
		const raf = requestAnimationFrame(() => {
			expanded = true;
		});
		return () => cancelAnimationFrame(raf);
	});

	function close() {
		expanded = false;
		setTimeout(onClose, 380);
	}

	function next() {
		if (index < photos.length - 1) {
			dir = 1;
			index += 1;
		}
	}

	function prev() {
		if (index > 0) {
			dir = -1;
			index -= 1;
		}
	}

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		startX = e.clientX;
	}

	function onPointerUp(e: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		const dx = e.clientX - startX;
		if (Math.abs(dx) < 40) return;
		if (dx < 0) next();
		else prev();
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}

	// Arranca en la posición y el ángulo exactos de la foto en la página,
	// y termina centrada, en grande y derecha (0 grados).
	const initialStyle = `top:${rect.top}px; left:${rect.left}px; width:${rect.width}px; height:${rect.height}px; border-radius:8px; transform: rotate(${rotate}deg);`;
	const finalStyle =
		'top:50%; left:50%; width:min(92vw,640px); height:min(80vh,640px); transform:translate(-50%,-50%) rotate(0deg); border-radius:16px;';
</script>

<svelte:window onkeydown={handleKey} />

<div class="backdrop" class:show={expanded} onclick={close} role="presentation"></div>

<div
	class="frame"
	style={expanded ? finalStyle : initialStyle}
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
	onpointercancel={() => (dragging = false)}
	role="group"
	aria-label="Foto ampliada, desliza para ver otra"
>
	{#key index}
		<img src={photos[index]} alt="" in:fly={{ x: dir * 80, duration: 220 }} />
	{/key}

	<button class="close-btn" onclick={close} aria-label="Cerrar foto">
		<X size={20} />
	</button>

	{#if photos.length > 1}
		{#if index > 0}
			<button class="nav-btn nav-prev" onclick={prev} aria-label="Foto anterior">
				<ChevronLeft size={22} />
			</button>
		{/if}
		{#if index < photos.length - 1}
			<button class="nav-btn nav-next" onclick={next} aria-label="Foto siguiente">
				<ChevronRight size={22} />
			</button>
		{/if}
	{/if}
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 8, 18, 0);
		transition: background 0.42s ease;
		z-index: 190;
	}

	.backdrop.show {
		background: rgba(10, 8, 18, 0.9);
	}

	.frame {
		position: fixed;
		z-index: 200;
		overflow: hidden;
		background: rgba(10, 8, 18, 0.4);
		box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
		transform-origin: center center;
		touch-action: none;
		transition:
			top 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			left 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			width 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			height 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			border-radius 0.42s ease,
			transform 0.42s cubic-bezier(0.2, 0.7, 0.3, 1);
	}

	.frame img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		pointer-events: none;
	}

	.close-btn {
		position: absolute;
		top: 0.6rem;
		right: 0.6rem;
		width: 2.4rem;
		height: 2.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background: rgba(0, 0, 0, 0.45);
		border-radius: 50%;
		z-index: 2;
	}

	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.4rem;
		height: 2.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background: rgba(0, 0, 0, 0.35);
		border-radius: 50%;
		z-index: 2;
	}

	.nav-prev {
		left: 0.6rem;
	}

	.nav-next {
		right: 0.6rem;
	}
</style>
