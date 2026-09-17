// ────────────────────────────────────────────────────────────────
// AQUÍ PERSONALIZAS LOS 3 ÁLBUMES (uno por carpeta de fotos).
//
// Cada entrada de `albums` es un álbum completo: su portada, su
// música, sus colores y sus páginas. `slug` es la parte de la URL
// (ej. "altar" → tuapp.com/altar) y debe coincidir con la carpeta en
// src/lib/assets/photos/.
//
// Para reordenar o cambiar texto/fotos dentro de un álbum, edita el
// arreglo `pages` de ese álbum: cada bloque es una página, en el
// orden en que aparece. Máximo 2 fotos por página (con 3 se corta en
// pantallas de celular).
// ────────────────────────────────────────────────────────────────

import type { Picture } from 'vite-imagetools';

import bridgertonSrc from '$lib/assets/music/bridgerton.mp3';
import perfectSrc from '$lib/assets/music/perfect.mp3';

// Las portadas NO llevan ?enhanced: son fotos grandes a pantalla completa y
// generarles AVIF/WebP con sharp demora bastante (sobre todo en desarrollo),
// haciendo que la portada tarde en aparecer. Se sirven tal cual (sin ese
// procesamiento) para que carguen al instante.

// Altar
import altarPortada from '$lib/assets/photos/altar/portada.jpeg';
import altarPadrinos from '$lib/assets/photos/altar/padrinos.jpeg?enhanced';
import altarAmiga from '$lib/assets/photos/altar/amiga.jpeg?enhanced';
import altarConAmigo from '$lib/assets/photos/altar/con-amigo.jpeg?enhanced';
import altarConNinos from '$lib/assets/photos/altar/con-ninos.jpeg?enhanced';
import altarConAmigos from '$lib/assets/photos/altar/con-amigos.jpeg?enhanced';
import altarSaliendo from '$lib/assets/photos/altar/saliendo.jpeg?enhanced';
import altarPastel from '$lib/assets/photos/altar/pastel.jpeg?enhanced';

// Novios
import noviosPortada from '$lib/assets/photos/novios/portada.jpeg';
import firmaNovia from '$lib/assets/photos/novios/fimra-novia.jpeg?enhanced';
import firmaNovio from '$lib/assets/photos/novios/firma-novio.jpeg?enhanced';
import noviosMama from '$lib/assets/photos/novios/mama.jpeg?enhanced';
import noviosSaludo from '$lib/assets/photos/novios/saludo.jpeg?enhanced';
import noviosCarro from '$lib/assets/photos/novios/carro.jpeg?enhanced';
import noviosAbrazo from '$lib/assets/photos/novios/abrazo.jpeg?enhanced';
import noviosAbrazoFuente from '$lib/assets/photos/novios/abrazo-fuente.jpeg?enhanced';
import noviosJuntos from '$lib/assets/photos/novios/juntos.jpeg?enhanced';
import noviosAqui from '$lib/assets/photos/novios/aqui.jpeg?enhanced';
import noviosBrindis from '$lib/assets/photos/novios/brindis.jpeg?enhanced';
import noviosHostia from '$lib/assets/photos/novios/hostia.jpeg?enhanced';
import noviosBocado from '$lib/assets/photos/novios/bocado.jpeg?enhanced';

// Recepción
import recepcionPortada from '$lib/assets/photos/recepcion/portada.jpeg';
import recepcionAlcalde from '$lib/assets/photos/recepcion/alcalde.jpeg?enhanced';
import recepcionCantantes from '$lib/assets/photos/recepcion/cantantes.jpeg?enhanced';
import recepcionInvitadas from '$lib/assets/photos/recepcion/invitadas.jpeg?enhanced';
import recepcionMesa1 from '$lib/assets/photos/recepcion/mesa-1.jpeg?enhanced';
import recepcionMesa2 from '$lib/assets/photos/recepcion/mesa-2.jpeg?enhanced';
import recepcionMesa3 from '$lib/assets/photos/recepcion/mesa-3.jpeg?enhanced';
import recepcionMesa4 from '$lib/assets/photos/recepcion/mesa-4.jpeg?enhanced';
import recepcionMesa5 from '$lib/assets/photos/recepcion/mesa-5.jpeg?enhanced';
import recepcionMesa6 from '$lib/assets/photos/recepcion/mesa-6.jpeg?enhanced';
import recepcionMesa7 from '$lib/assets/photos/recepcion/mesa-7.jpeg?enhanced';
import recepcionTorta from '$lib/assets/photos/recepcion/torta.jpeg?enhanced';
import recepcionCortandoPastel from '$lib/assets/photos/recepcion/cortando-pastel.jpeg?enhanced';

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

export interface AlbumColors {
	navyDeep: string;
	navyMid: string;
	navySoft: string;
	wine: string;
	blush: string;
	gold: string;
}

export interface AlbumConfig {
	slug: string;
	label: string; // texto del botón en la pantalla de inicio
	audioSrc: string;
	targetVolume: number;
	fadeInMs: number;
	colors: AlbumColors;
	cover: { photo: string; title: string; subtitle: string };
	pages: AlbumPageData[];
}

// URL más liviana (WebP) de una foto, para el modal de zoom (que usa
// una sola <img>, no un <picture>).
export function fastSrc(pic: Picture): string {
	const webpSrcset = pic.sources.webp;
	const firstUrl = webpSrcset?.split(',')[0]?.trim().split(' ')[0];
	return firstUrl || pic.img.src;
}

export const albums: Record<string, AlbumConfig> = {
	altar: {
		slug: 'altar',
		label: 'El altar',
		audioSrc: bridgertonSrc,
		targetVolume: 0.85,
		fadeInMs: 5000,
		colors: {
			navyDeep: '#1c1830',
			navyMid: '#2c2450',
			navySoft: '#3d3270',
			wine: '#4a1f4a',
			blush: '#e9d9f3',
			gold: '#c9a86a'
		},
		cover: { photo: altarPortada, title: 'El Altar', subtitle: '16 · 09 · 2016' },
		pages: [
			{
				id: 'padrinos',
				heading: 'Nuestros padrinos',
				note: 'Gracias por acompañarnos',
				photos: [{ src: altarPadrinos, caption: 'Nuestros padrinos' }]
			},
			{
				id: 'con-carino',
				heading: 'Con cariño',
				photos: [
					{ src: altarAmiga, caption: 'Una amiga querida', rotate: -6 },
					{ src: altarConAmigo, caption: 'Un gran amigo', rotate: 6 }
				]
			},
			{
				id: 'en-familia',
				heading: 'En familia',
				photos: [
					{ src: altarConNinos, caption: 'Con los niños', rotate: -6 },
					{ src: altarConAmigos, caption: 'Con los amigos', rotate: 6 }
				]
			},
			{
				id: 'saliendo',
				heading: 'Saliendo de la iglesia',
				note: '¡Ya somos esposos!',
				photos: [
					{ src: altarSaliendo, caption: 'Ya casados', rotate: -6 },
					{ src: altarPastel, caption: 'Nos espera el pastel', rotate: 6 }
				]
			}
		]
	},

	novios: {
		slug: 'novios',
		label: 'Los novios',
		audioSrc: bridgertonSrc,
		targetVolume: 0.85,
		fadeInMs: 5000,
		colors: {
			navyDeep: '#171b30',
			navyMid: '#262f56',
			navySoft: '#333f72',
			wine: '#4a1c2f',
			blush: '#f3d9df',
			gold: '#d9b872'
		},
		cover: { photo: noviosPortada, title: 'Los Novios', subtitle: '16 · 09 · 2016' },
		pages: [
			{
				id: 'promesa',
				heading: 'Firmando la promesa',
				photos: [
					{ src: firmaNovia, caption: 'Ella', rotate: 6 },
					{ src: firmaNovio, caption: 'Él', rotate: -6 }
				]
			},
			{
				id: 'mi-mama',
				heading: 'Con mi mamá',
				photos: [{ src: noviosMama, caption: 'Con mi mamá' }]
			},
			{
				id: 'recien-casados',
				heading: 'Recién casados',
				note: '¡Por fin esposos!',
				photos: [
					{ src: noviosSaludo, caption: '¡Ya casados!' },
					{ src: noviosCarro, caption: 'Rumbo a celebrar' }
				]
			},
			{
				id: 'primer-abrazo',
				heading: 'Nuestro primer abrazo',
				note: 'Ya como esposos',
				photos: [{ src: noviosAbrazo, caption: 'Nuestro primer abrazo', rotate: -6 }]
			},
			{
				id: 'bajo-la-luna',
				heading: 'Bajo la luna',
				photos: [
					{ src: noviosAbrazoFuente, rotate: 6 },
					{ src: noviosJuntos, caption: 'Bajo la luna', rotate: -6 }
				]
			},
			{
				id: 'para-siempre',
				heading: 'Para siempre',
				note: 'Un brindis por nuestra historia',
				photos: [
					{ src: noviosAqui, caption: 'Aquí, contigo' },
					{ src: noviosBrindis, caption: 'Por nosotros' }
				]
			},
			{
				id: 'dulce-comienzo',
				heading: 'Dulce comienzo',
				note: 'El primer pastel de muchos',
				photos: [
					{ src: noviosHostia, caption: 'El primer pastel' },
					{ src: noviosBocado, caption: 'Y el segundo bocado' }
				]
			}
		]
	},

	recepcion: {
		slug: 'recepcion',
		label: 'La recepción',
		audioSrc: perfectSrc,
		targetVolume: 0.85,
		fadeInMs: 5000,
		colors: {
			navyDeep: '#2a1810',
			navyMid: '#4a2418',
			navySoft: '#6b3324',
			wine: '#7a2d1f',
			blush: '#f5ddc8',
			gold: '#e0b34f'
		},
		cover: { photo: recepcionPortada, title: 'La Recepción', subtitle: '16 · 09 · 2016' },
		pages: [
			{
				id: 'alcalde',
				heading: 'Un brindis especial',
				photos: [{ src: recepcionAlcalde, caption: 'Unas palabras del alcalde' }]
			},
			{
				id: 'fiesta',
				heading: 'La fiesta',
				photos: [
					{ src: recepcionCantantes, caption: 'La banda', rotate: -6 },
					{ src: recepcionInvitadas, caption: 'Nuestras invitadas', rotate: 6 }
				]
			},
			{
				id: 'mesa-1',
				heading: 'Nuestra mesa',
				photos: [
					{ src: recepcionMesa1, rotate: -6 },
					{ src: recepcionMesa2, rotate: 6 }
				]
			},
			{
				id: 'mesa-2',
				heading: 'Compartiendo',
				photos: [
					{ src: recepcionMesa3, rotate: -6 },
					{ src: recepcionMesa4, rotate: 6 }
				]
			},
			{
				id: 'mesa-3',
				heading: 'Con los nuestros',
				photos: [
					{ src: recepcionMesa5, rotate: -6 },
					{ src: recepcionMesa6, rotate: 6 }
				]
			},
			{
				id: 'mesa-4',
				heading: 'Compañía',
				photos: [{ src: recepcionMesa7 }]
			},
			{
				id: 'pastel',
				heading: 'El gran pastel',
				photos: [
					{ src: recepcionTorta, caption: 'La torta', rotate: -6 },
					{ src: recepcionCortandoPastel, caption: 'Cortando el pastel', rotate: 6 }
				]
			}
		]
	}
};

export const albumSlugs = Object.keys(albums);

// Frase final animada, dividida en líneas para que aparezcan una por
// una. Unidas con un espacio reproducen el texto original completo.
export const finalMessageLines = [
	'Cumpliendo 10 años..',
	'Gracias Dios por darme un esposo, un compañero',
	'lo único te pido siempre cuidenos,',
	'bendícenos en nuestra  vida diaria .',
	'Amén'
];
