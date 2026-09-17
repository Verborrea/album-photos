export const audioState = $state({ playing: false, muted: false, started: false });

let audioEl: HTMLAudioElement | null = null;
let fadeRaf = 0;

function easeInOutQuad(t: number) {
	return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function ensureAudio(src: string) {
	if (!audioEl) {
		audioEl = new Audio(src);
		audioEl.loop = true;
		audioEl.preload = 'auto';
	}
	return audioEl;
}

export function playWithFadeIn(src: string, durationMs = 5000, targetVolume = 0.85) {
	const el = ensureAudio(src);
	el.volume = 0;
	audioState.started = true;
	cancelAnimationFrame(fadeRaf);

	el.play()
		.then(() => (audioState.playing = true))
		.catch(() => {
			// Autoplay bloqueado o archivo faltante: no rompemos la app.
			audioState.playing = false;
		});

	const start = performance.now();
	const step = (now: number) => {
		if (!audioEl) return;
		const t = Math.min(1, (now - start) / durationMs);
		audioEl.volume = easeInOutQuad(t) * targetVolume;
		if (t < 1) fadeRaf = requestAnimationFrame(step);
	};
	fadeRaf = requestAnimationFrame(step);
}

export function togglePlay() {
	if (!audioEl) return;
	if (audioEl.paused) {
		audioEl
			.play()
			.then(() => (audioState.playing = true))
			.catch(() => {});
	} else {
		audioEl.pause();
		audioState.playing = false;
	}
}

export function toggleMute() {
	if (!audioEl) return;
	audioEl.muted = !audioEl.muted;
	audioState.muted = audioEl.muted;
}

function pauseAudio() {
	audioEl?.pause();
	audioState.playing = false;
}

// Si la persona cambia de pestaña, minimiza el navegador o sale de la
// página, paramos la música — en el celular si no, se queda sonando
// de fondo aunque ya no se vea el álbum.
if (typeof document !== 'undefined') {
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) pauseAudio();
	});
	window.addEventListener('pagehide', pauseAudio);
}
