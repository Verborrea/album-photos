// Textos de la pantalla de inicio y configuración del audio.
// Cambia lo que quieras aquí, no necesitas tocar ningún componente.
import songSrc from '$lib/assets/music/bridgerton.mp3';
// El sufijo ?enhanced hace que Vite genere versiones AVIF/WebP (con
// sharp) y sirva la más liviana que el navegador soporte.
import coverPhoto from '$lib/assets/photos/portada.jpeg?enhanced';

// Portada del álbum (la primera página, como la tapa de un libro).
export const coverConfig = {
	photo: coverPhoto, // cambia esta foto por la que quieras de portada
	title: 'Nuestra Boda', // título grande en fuente caligráfica
	subtitle: '16 · 09 · 2016' // fecha, en serif
};

export const introConfig = {
	eyebrow: 'Nuestro', // palabra pequeña arriba
	title: 'Aniversario', // título grande en fuente caligráfica
	subtitle: '10 años juntos', // subtítulo en serif
	cta: 'Abrir nuestro álbum', // texto del botón
	weddingDate: '16 · 09 · 2016', // fecha de la boda, se muestra debajo del botón

	// Para cambiar la canción, reemplaza el archivo en src/lib/assets/music/
	// (o cambia el nombre importado arriba).
	audioSrc: songSrc,
	// Volumen final una vez terminado el fundido de entrada (0 a 1).
	targetVolume: 0.85,
	// Duración del fundido de entrada, en milisegundos.
	fadeInMs: 5000
};
