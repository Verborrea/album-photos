<script lang="ts">
	let {
		src,
		rect,
		rotate = 0,
		onClose
	}: {
		src: string;
		rect: DOMRect;
		rotate?: number;
		onClose: () => void;
	} = $props();

	let expanded = $state(false);

	$effect(() => {
		const raf = requestAnimationFrame(() => {
			expanded = true;
		});
		return () => cancelAnimationFrame(raf);
	});

	function close() {
		expanded = false;
		setTimeout(onClose, 420);
	}

	// Arranca en la posición y el ángulo exactos de la foto en la página,
	// y termina centrada, en grande y derecha (0 grados).
	const initialStyle = `top:${rect.top}px; left:${rect.left}px; width:${rect.width}px; height:${rect.height}px; border-radius:8px; transform: rotate(${rotate}deg);`;
	const finalStyle =
		'top:50%; left:50%; width:min(90vw,620px); height:min(78vh,620px); transform:translate(-50%,-50%) rotate(0deg); border-radius:16px;';
</script>

<div class="backdrop" class:show={expanded} onclick={close} role="presentation"></div>
<button
	class="zoomed"
	style={expanded ? finalStyle : initialStyle}
	onclick={close}
	aria-label="Cerrar foto"
>
	<img {src} alt="" />
</button>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 8, 18, 0);
		transition: background 0.42s ease;
		z-index: 190;
	}

	.backdrop.show {
		background: rgba(10, 8, 18, 0.88);
	}

	.zoomed {
		position: fixed;
		z-index: 200;
		overflow: hidden;
		box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
		transform-origin: center center;
		transition:
			top 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			left 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			width 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			height 0.42s cubic-bezier(0.2, 0.7, 0.3, 1),
			border-radius 0.42s ease,
			transform 0.42s cubic-bezier(0.2, 0.7, 0.3, 1);
	}

	.zoomed img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
