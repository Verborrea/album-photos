import { error } from '@sveltejs/kit';
import { albumSlugs } from '$lib/data/albums';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!albumSlugs.includes(params.album)) {
		error(404, 'Álbum no encontrado');
	}
	return { album: params.album };
};
