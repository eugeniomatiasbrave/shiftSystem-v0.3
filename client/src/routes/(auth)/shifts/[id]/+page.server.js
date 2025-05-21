import { fail, redirect } from "@sveltejs/kit";
import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export const load = async ({ params, locals, url }) => {
    const id_shift = params.id;
    let token = locals.user?.token;
    
    // Verificar si hay un indicador de redirección después de una reserva exitosa
    const reserved = url.searchParams.get('reserved');
    
    try {
        const response = await axios.get(`${API_URL}/shifts/${id_shift}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const shiftData = response.data.data;
        
        // Si el turno está reservado y venimos de una acción de reserva, redirigir a la página de pago
        if (reserved === 'true' && shiftData && shiftData.status === 'reserved') {
            throw redirect(303, `/shifts/${id_shift}/payment`);
        }

        return {
            shiftId: shiftData
        };
    } catch (error) {
        // Si es una redirección, pasarla hacia arriba
        if (error.status === 303) {
            throw error;
        }
        
        console.error("Error loading shift:", error);
        return {
            error: error.response?.data?.message || 'Error al cargar el turno. Por favor, inténtalo nuevamente.'
        };
    }
}


// Procesa la reserva del turno

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const id_shift = formData.get('id_shift');
        const id_user = locals.user.id_user;
         

        const body = { 
            id_user: Number(id_user), 
            id_shift: Number(id_shift)
        };
        
        // Get token from locals or cookie
        let token = locals.user?.token;
        
        if (!token) {
            // Extract token from cookies if not available in locals
            const cookies = request.headers.get('cookie');
            if (cookies) {
                const matches = cookies.match(/token=([^;]+)/);
                if (matches && matches[1]) {
                    token = matches[1];
                }
            }
        }
        
        if (!token) {
            return fail(401, { error: 'Authentication token not found. Please login again.' });
        }

        try {
            // Reservar turno
            const response = await axios.put(
                `${API_URL}/shifts/${id_shift}/reserve`, 
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Si la reserva es exitosa, redirigir a la página de pago
            if (response.data.success) {
                throw redirect(303, `/shifts/${id_shift}/payment`);
            }
        
            return {
                success: true,
                data: response.data.data || []
            };

        } catch (error) {
            // Si es una redirección, pasarla hacia arriba
            if (error.status === 303) {
                throw error;
            }
            
            console.error("Error reserving shift:", error);
            return fail(500, { 
                error: error.response?.data?.message || 'Error al reservar el turno. Inténtalo nuevamente.'
            });
        }
    }
};
