<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		count,
		current = $bindable(0),
		children
	}: {
		count: number;
		current: number;
		children: Snippet<[number]>;
	} = $props();

	let bookEl: HTMLDivElement | undefined = $state();

	// angles[i]: rotación de la hoja i, en grados (0 = cerrada a la derecha, -180 = volteada a la izquierda)
	let angles = $state<number[]>(Array.from({ length: count }, (_, i) => (i < current ? -180 : 0)));

	// topIndex: qué hoja tiene prioridad visual (z-index más alto) en este instante.
	// Al avanzar, la hoja que se está volteando conserva la prioridad hasta que
	// termina su propia transición (ver onLeafTransitionEnd); así se ve el volteo
	// completo antes de revelar la página nueva, sin quedar nunca tapada.
	let topIndex = $state(current);
	let previous = current;

	let dragging = $state(false);
	let dragIndex = $state(-1);
	let dragDir: 1 | -1 = 1;
	let startX = 0;
	let width = 1;

	function clamp(v: number, min: number, max: number) {
		return Math.max(min, Math.min(max, v));
	}

	function syncFromCurrent() {
		// Construye un arreglo nuevo sin leer `angles` para no crear una
		// dependencia circular dentro del $effect que llama a esta función.
		const next: number[] = [];
		for (let i = 0; i < count; i++) next.push(i < current ? -180 : 0);
		angles = next;
	}

	// Única fuente de verdad: cada vez que `current` cambia (por swipe, puntos o teclado)
	// y no hay un arrastre activo, las hojas se acomodan solas con transición CSS.
	$effect(() => {
		const c = current;
		if (!dragging) syncFromCurrent();

		if (c !== previous) {
			// Al avanzar: la hoja anterior se queda arriba mientras se voltea.
			// Al retroceder: la hoja que vuelve ya es la protagonista, prioridad inmediata.
			topIndex = c > previous ? previous : c;
			previous = c;
		}
	});

	function onLeafTransitionEnd(i: number) {
		if (i === topIndex) topIndex = current;
	}

	export function next() {
		current = clamp(current + 1, 0, count - 1);
	}
	export function prev() {
		current = clamp(current - 1, 0, count - 1);
	}

	let moved = false;
	let suppressClick = false;

	function onPointerDown(e: PointerEvent) {
		if (!bookEl) return;
		width = bookEl.clientWidth;
		startX = e.clientX;
		dragging = true;
		dragIndex = -1;
		moved = false;
		// Si el gesto anterior terminó fuera de un elemento con click (por lo
		// que nunca se disparó el click que limpia esta bandera), la reseteamos aquí.
		suppressClick = false;
		(e.target as Element).setPointerCapture?.(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		const dx = e.clientX - startX;
		if (Math.abs(dx) > 4) moved = true;

		if (dragIndex === -1) {
			if (Math.abs(dx) < 4) return;
			if (dx < 0 && current < count - 1) {
				dragIndex = current;
				dragDir = 1;
			} else if (dx > 0 && current > 0) {
				dragIndex = current - 1;
				dragDir = -1;
			} else {
				return;
			}
		}

		const progress = clamp(Math.abs(dx) / width, 0, 1);
		const angle = dragDir === 1 ? -180 * progress : -180 + 180 * progress;
		angles = angles.map((a, i) => (i === dragIndex ? angle : a));
	}

	function onPointerUp(e: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		if (moved) suppressClick = true;
		if (dragIndex === -1) return;

		const dx = e.clientX - startX;
		const progress = Math.abs(dx) / width;
		const commit = progress > 0.32;

		if (dragDir === 1 && commit) current = dragIndex + 1;
		else if (dragDir === -1 && commit) current = dragIndex;
		// si no hay commit, el efecto de arriba regresa la hoja a su ángulo de reposo

		dragIndex = -1;
	}

	// El navegador dispara un "click" sintético tras un arrastre (por el pointer
	// capture), lo cual abriría el zoom de la foto sin querer. Lo bloqueamos aquí.
	function onClickCapture(e: MouseEvent) {
		if (suppressClick) {
			e.stopPropagation();
			e.preventDefault();
			suppressClick = false;
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}
</script>

<svelte:window onkeydown={handleKey} />

<div
	class="book"
	role="group"
	aria-label="Álbum, desliza para pasar la página"
	bind:this={bookEl}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onclickcapture={onClickCapture}
>
	{#each Array(count) as _, i}
		{@const isDragging = dragging && i === dragIndex}
		<div
			class="leaf"
			class:no-transition={isDragging}
			ontransitionend={() => onLeafTransitionEnd(i)}
			style="
				z-index: {isDragging ? 999 : i === topIndex ? count + 1 : count - Math.abs(i - topIndex)};
				transform: rotateY({angles[i]}deg);
			"
		>
			<div class="face front">
				{@render children(i)}
			</div>
			<div class="face back">
				<div class="paper-texture"></div>
			</div>
		</div>
	{/each}
</div>

<style>
	.book {
		position: relative;
		width: 100%;
		height: 100%;
		perspective: 1800px;
		touch-action: none;
	}

	.leaf {
		position: absolute;
		inset: 0;
		transform-style: preserve-3d;
		transform-origin: left center;
		will-change: transform;
		transition: transform 0.6s cubic-bezier(0.4, 0.05, 0.2, 1);
	}

	.leaf.no-transition {
		transition: none;
	}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		overflow: hidden;
		border-radius: 18px;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
	}

	.face.back {
		transform: rotateY(180deg);
		background: var(--cream);
	}

	.paper-texture {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.04), transparent 40%),
			radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.04), transparent 40%);
	}
</style>
