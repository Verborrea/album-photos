<script lang="ts">
	import { fly } from 'svelte/transition';

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
		if (Math.abs(dx) < 40) {
			// Toque sin arrastre: cierra la foto (ya no hay botón de X).
			close();
			return;
		}
		if (dx < 0) next();
		else prev();
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}

	// El cuadro ocupa siempre su tamaño y posición finales (centrado); solo
	// animamos `transform` (nunca top/left/width/height) para que la
	// animación corra en el compositor de la GPU y no en layout — así se ve
	// fluida también en Android, no solo en iPhone.
	const finalW = Math.min(window.innerWidth * 0.92, 640);
	const finalH = Math.min(window.innerHeight * 0.8, 640);
	const dx = rect.left + rect.width / 2 - window.innerWidth / 2;
	const dy = rect.top + rect.height / 2 - window.innerHeight / 2;
	const scaleX = rect.width / finalW;
	const scaleY = rect.height / finalH;
	const initialTransform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`;
	const finalTransform = 'translate(-50%, -50%)';
</script>

<svelte:window onkeydown={handleKey} />

<div class="backdrop" class:show={expanded} onclick={close} role="presentation"></div>

<div
	class="frame"
	style="transform: {expanded ? finalTransform : initialTransform}; border-radius: {expanded
		? '16px'
		: '8px'};"
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
	onpointercancel={() => (dragging = false)}
	role="group"
	aria-label="Foto ampliada, desliza para ver otra"
>
	{#key index}
		<img src={photos[index]} alt="" in:fly={{ x: dir * 80, duration: 220 }} />
	{/key}
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
		top: 50%;
		left: 50%;
		width: min(92vw, 640px);
		height: min(80vh, 640px);
		z-index: 200;
		overflow: hidden;
		background: rgba(10, 8, 18, 0.4);
		box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
		transform-origin: center center;
		touch-action: none;
		will-change: transform;
		transition:
			transform 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			border-radius 0.42s ease;
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

</style>
