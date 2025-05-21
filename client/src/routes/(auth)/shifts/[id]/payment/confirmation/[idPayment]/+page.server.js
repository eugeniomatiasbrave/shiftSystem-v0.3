import { fail, redirect } from "@sveltejs/kit";
import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export const load = async ({ params, locals }) => {
    const id_payment = params.idPayment;
    const id_shift = params.id;

    try {
        // Obtener datos del pago
        const paymentResponse = await axios.get(`${API_URL}/payments/${id_payment}`, {
            headers: {
                Authorization: `Bearer ${locals.user.token}`
            }
        });

        // Obtener datos del turno
        const shiftResponse = await axios.get(`${API_URL}/shifts/${id_shift}`, {
            headers: {
                Authorization: `Bearer ${locals.user.token}`
            }
        });

        // Verificar que ambas respuestas contienen los datos esperados
        if (paymentResponse.data?.data && shiftResponse.data?.data) {
            return {
                payment: paymentResponse.data.data,
                shift: shiftResponse.data.data
            };
        } else {
            return fail(400, { error: 'No se encontraron datos del pago o turno.' });
        }
    } catch (error) {
        console.error("Error fetching payment or shift data:", error);
        return fail(500, { error: 'Ocurrió un error al obtener los datos. Por favor, intente nuevamente.' });
    }
};

// Actions para manejar el formulario de confirmación de pago
export const actions = {
    default: async ({ request, params, locals }) => {
        const formData = await request.formData();
        const action = formData.get('action');
        const id_payment = params.idPayment;
        const id_shift = params.id;
        
        // Token para autorización
        const token = locals.user?.token;
        if (!token) {
            return fail(401, { error: 'No autorizado. Por favor inicie sesión nuevamente.' });
        }
        
        // Simulación de confirmación de pago
        if (action === 'confirm_payment') {
            try {
                // Llamar al endpoint para confirmar el pago
                await axios.post(
                    `${API_URL}/payments/${id_payment}/confirm`,
                    {
                        transaction_id: `sim_${Date.now()}`, // ID de transacción simulado
                        payment_details: {
                            simulation: true,
                            confirmed_at: new Date().toISOString()
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                // Refrescar la página para mostrar el estado actualizado
                throw redirect(303, `/shifts/${id_shift}/payment/confirmation/${id_payment}?success=true`);
            } catch (error) {
                if (error.status === 303) throw error; // Mantener la redirección
                
                console.error("Error confirmando el pago:", error);
                return fail(500, { 
                    error: error.response?.data?.message || 'Error al confirmar el pago. Inténtalo nuevamente.'
                });
            }
        }
        
        return { success: false };
    }
}; 