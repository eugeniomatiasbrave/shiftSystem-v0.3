import { error, fail } from '@sveltejs/kit';
const API_URL = process.env.VITE_API_URL;

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        const body = { email, password };

        // Validación de datos
        if (!email) {
            return fail(400, { email, missing: true });
        }
        if (!password) {
            return fail(400, { password, missing: true });
        }
        if (!validateEmail(email)) {
            return fail(400, { email, invalid: true });
        }

        try {
            const res = await fetch(`${API_URL}/sessions/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.status === 200) {
                // Obtener el token de la cookie
                const setCookieHeader = res.headers.get('set-cookie');
                const token = setCookieHeader
                    ? setCookieHeader.split(';')[0].split('=')[1]
                    : null;

                if (token) {
                    cookies.set('AuthorizationToken', token, {
                        httpOnly: true,
                        path: '/',
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 60 * 60 * 24 // 1 day
                    });

					return { success: true };

                } else {
                    return fail(500, { message: 'Token no encontrado en la respuesta' });
                }
            } else {
                const errorData = await res.json();
                return fail(res.status, { message: errorData.message || 'Datos de acceso incorrectos' });
            }
        } catch (err) {
            console.error('Error: ', err);
            return error(500, 'Something went wrong logging in');
        }
    }
	
};

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}