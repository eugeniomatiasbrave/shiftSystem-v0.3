import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		// Especifica el 'path' al eliminar las cookies
		cookies.delete('AuthorizationToken', { path: '/' });
		
		throw redirect(303, '/');
	}
};