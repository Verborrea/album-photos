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

import alfombra from '$lib/assets/photos/alfombra.jpeg';
import firmaNovia from '$lib/assets/photos/fimra-novia.jpeg';
import firmaNovio from '$lib/assets/photos/firma-novio.jpeg';
import saludo from '$lib/assets/photos/saludo.jpeg';
import carro from '$lib/assets/photos/carro.jpeg';
import abrazo from '$lib/assets/photos/abrazo.jpeg';
import abrazoFuente from '$lib/assets/photos/abrazo-fuente.jpeg';
import juntos from '$lib/assets/photos/juntos.jpeg';
import aqui from '$lib/assets/photos/aqui.jpeg';
import brindis from '$lib/assets/photos/brindis.jpeg';
import hostia from '$lib/assets/photos/hostia.jpeg';
import bocado from '$lib/assets/photos/bocado.jpeg';

export interface AlbumPhoto {
	src: string;
	caption?: string;
	rotate?: number;
}

export interface AlbumPageData {
	id: string;
	heading?: string;
	note?: string;
	photos: AlbumPhoto[];
}

export const albumPages: AlbumPageData[] = [
	{
		id: 'ceremonia',
		heading: 'La ceremonia',
		note: 'El día que dijimos que sí',
		photos: [
			{ src: alfombra, caption: 'Nuestra entrada', rotate: -6 },
			{ src: firmaNovia, caption: 'Firmando la promesa', rotate: 8 },
			{ src: firmaNovio, caption: 'Para toda la vida', rotate: -4 }
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
		note: 'Bajo la luna, ya como esposos',
		photos: [
			{ src: abrazo, caption: 'Nuestro primer abrazo', rotate: -7 },
			{ src: abrazoFuente, rotate: 9 },
			{ src: juntos, caption: 'Bajo la luna', rotate: -3 }
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

// Frase final animada del álbum, dividida en líneas para que aparezcan
// una por una. Unidas con un espacio reproducen el texto original completo.
export const finalMessageLines = [
	'Cumpliendo 10 años..',
	'Gracias Dios por darme un esposo, un compañero',
	'lo único te pido siempre cuidenos,',
	'bendícenos en nuestra  vida diaria .',
	'Amén'
];
