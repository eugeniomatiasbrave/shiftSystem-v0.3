// Procesa la transacción de pago
import { fail, redirect } from "@sveltejs/kit";
import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export const load = async ({ params, locals }) => {
    const id_shift = params.id;
    let token = locals.user?.token;
    
    try {
        // Obtener información del turno
        const response = await axios.get(`${API_URL}/shifts/${id_shift}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // Verificar que el turno esté en estado pending_payment
        const shiftData = response.data.data;
		//console.log(shiftData);
        
        // Verificar si el turno pertenece al usuario actual
        if (shiftData.id_user !== locals.user.id_user) {
            return {
                error: "No tienes permisos para pagar este turno."
            };
        }
        
        return {
            shiftData: shiftData

        };

    } catch (error) {
        console.error("Error loading shift for payment:", error);
        return {
            error: error.response?.data?.message || 'Error al cargar el turno. Por favor, inténtalo nuevamente.'
        };
    }
}

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const id_shift = formData.get('id_shift');
        const amount = formData.get('amount');
        const payment_method = formData.get('payment_method');
        const number_reference = formData.get('number_reference');
        
        // Datos adicionales según el método de pago
        const expiry_date = formData.get('expiry_date');
        const security_code = formData.get('security_code');
        
        const id_user = locals.user.id_user;
        const token = locals.user.token;
        
        try {
            // Formar cuerpo de la solicitud
            const paymentData = {
                id_shift: Number(id_shift),
                id_user: Number(id_user),
                amount: parseFloat(amount),
                payment_method,
                payment_details: {
					number_reference,
                    expiry_date,
                    security_code
                }
            };
            console.log(paymentData);
			
            // Realizar la solicitud de pago
            const response = await axios.post(
                `${API_URL}/payments/create`,
                paymentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            // Si el pago es exitoso, redirigir a la página de confirmación
            if (response.data.success) {
              
                throw redirect(303, `/shifts/${id_shift}/payment/confirmation`);
            }
            
            return {
                success: true,
                data: response.data.data
            };
            
        } catch (error) {
            // Si es una redirección, pasarla hacia arriba
            if (error.status === 303) {
                throw error;
            }
            
            console.error("Error processing payment:", error);
            return fail(500, {
                error: error.response?.data?.message || 'Error al procesar el pago. Por favor, inténtalo nuevamente.'
            });
        }
    }
};

