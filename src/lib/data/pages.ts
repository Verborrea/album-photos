// ────────────────────────────────────────────────────────────────
// AQUÍ PERSONALIZAS EL CONTENIDO DEL ÁLBUM (orden, texto y fotos).
//
// La portada (la primera página, con una sola foto) se edita aparte,
// en src/lib/data/config.ts → `coverConfig`.
//
// Cada objeto dentro de `albumPages` es UNA página del libro, en el
// orden en que aparece en este arreglo — para reordenar páginas,
// simplemente mueve el bloque `{ id: ..., heading: ..., ... }`
// completo a otra posición del arreglo.
//
// Dentro de cada página:
//   `heading` → título grande de la página.
//   `note`    → notita pequeña al final de la página.
//   `photos`  → arreglo de fotos, en el orden que quieras que aparezcan.
//               Cada foto puede tener `caption` (el texto bajo la foto).
// Cambia cualquiera de esos textos directamente aquí abajo.
//
// Una página puede tener las fotos que quieras (el diseño las acomoda
// solo, tipo collage).
//
// Para usar tus propias fotos:
//   1. Copia tus imágenes dentro de `src/lib/assets/photos/`.
//   2. Impórtalas arriba (como las que ya están) y referéncialas en
//      `albumPages` dentro de `src`.
// Puedes borrar, agregar o reordenar páginas y fotos libremente.
//
// `rotate` es la inclinación de la foto en grados (negativo = hacia
// la izquierda). Si no la pones, se usa una por defecto según la
// posición de la foto en la página.
// ────────────────────────────────────────────────────────────────

import type { Picture } from 'vite-imagetools';
// El sufijo ?enhanced hace que Vite genere versiones AVIF/WebP de cada
// foto (con sharp) y sirva la más liviana que el navegador soporte —
// las fotos cargan bastante más rápido que con el .jpeg original.
import alfombra from '$lib/assets/photos/alfombra.jpeg?enhanced';
import firmaNovia from '$lib/assets/photos/fimra-novia.jpeg?enhanced';
import firmaNovio from '$lib/assets/photos/firma-novio.jpeg?enhanced';
import saludo from '$lib/assets/photos/saludo.jpeg?enhanced';
import carro from '$lib/assets/photos/carro.jpeg?enhanced';
import abrazo from '$lib/assets/photos/abrazo.jpeg?enhanced';
import abrazoFuente from '$lib/assets/photos/abrazo-fuente.jpeg?enhanced';
import juntos from '$lib/assets/photos/juntos.jpeg?enhanced';
import aqui from '$lib/assets/photos/aqui.jpeg?enhanced';
import brindis from '$lib/assets/photos/brindis.jpeg?enhanced';
import hostia from '$lib/assets/photos/hostia.jpeg?enhanced';
import bocado from '$lib/assets/photos/bocado.jpeg?enhanced';

export interface AlbumPhoto {
	src: Picture;
	caption?: string;
	rotate?: number;
}

export interface AlbumPageData {
	id: string;
	heading?: string;
	note?: string;
	photos: AlbumPhoto[];
}

// Máximo 2 fotos por página (con 3 se corta en pantallas de celular).
export const albumPages: AlbumPageData[] = [
	{
		id: 'ceremonia',
		heading: 'La ceremonia',
		note: 'El día que dijimos que sí',
		photos: [{ src: alfombra, caption: 'Nuestra entrada', rotate: -6 }]
	},
	{
		id: 'promesa',
		heading: 'Firmando la promesa',
		photos: [
			{ src: firmaNovia, caption: 'Ella', rotate: 6 },
			{ src: firmaNovio, caption: 'Él', rotate: -6 }
		]
	},
	{
		id: 'recien-casados',
		heading: 'Recién casados',
		note: '¡Por fin esposos!',
		photos: [
			{ src: saludo, caption: '¡Ya casados!' },
			{ src: carro, caption: 'Rumbo a celebrar' }
		]
	},
	{
		id: 'primer-abrazo',
		heading: 'Nuestro primer abrazo',
		note: 'Ya como esposos',
		photos: [{ src: abrazo, caption: 'Nuestro primer abrazo', rotate: -6 }]
	},
	{
		id: 'bajo-la-luna',
		heading: 'Bajo la luna',
		photos: [
			{ src: abrazoFuente, rotate: 6 },
			{ src: juntos, caption: 'Bajo la luna', rotate: -6 }
		]
	},
	{
		id: 'para-siempre',
		heading: 'Para siempre',
		note: 'Un brindis por nuestra historia',
		photos: [
			{ src: aqui, caption: 'Aquí, contigo' },
			{ src: brindis, caption: 'Por nosotros' }
		]
	},
	{
		id: 'dulce-comienzo',
		heading: 'Dulce comienzo',
		note: 'El primer pastel de muchos',
		photos: [
			{ src: hostia, caption: 'El primer pastel' },
			{ src: bocado, caption: 'Y el segundo bocado' }
		]
	}
];

// URL más liviana (WebP) de una foto, para el modal de zoom (que usa
// una sola <img>, no un <picture>).
export function fastSrc(pic: Picture): string {
	const webpSrcset = pic.sources.webp;
	const firstUrl = webpSrcset?.split(',')[0]?.trim().split(' ')[0];
	return firstUrl || pic.img.src;
}

// Frase final animada del álbum, dividida en líneas para que aparezcan
// una por una. Unidas con un espacio reproducen el texto original completo.
export const finalMessageLines = [
	'Cumpliendo 10 años..',
	'Gracias Dios por darme un esposo, un compañero',
	'lo único te pido siempre cuidenos,',
	'bendícenos en nuestra  vida diaria .',
	'Amén'
];
