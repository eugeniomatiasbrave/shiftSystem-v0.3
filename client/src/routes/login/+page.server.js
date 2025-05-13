import { error, fail } from '@sveltejs/kit';
import axios from 'axios';
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
            const response = await axios.post(`${API_URL}/sessions/login`, body, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                // Obtener el token de la cookie
                const setCookieHeader = response.headers['set-cookie'];
                const token = setCookieHeader
                    ? setCookieHeader[0].split(';')[0].split('=')[1]
                    : null;

                if (token) {
                    cookies.set('token', token, {
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
                return fail(response.status, { message: response.data.message || 'Datos de acceso incorrectos' });
            }
        } catch (err) {
            console.error('Error: ', err);
            if (err.response) {
                return fail(err.response.status, { message: err.response.data.message || 'Datos de acceso incorrectos' });
            }
            return error(500, 'Something went wrong logging in');
        }
    }
};

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}