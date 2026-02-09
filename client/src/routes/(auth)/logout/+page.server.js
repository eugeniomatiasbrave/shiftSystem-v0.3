import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		// Especifica el 'path' al eliminar las cookies
		cookies.delete('token', { path: '/' });
		
		throw redirect(303, '/');
	}
};