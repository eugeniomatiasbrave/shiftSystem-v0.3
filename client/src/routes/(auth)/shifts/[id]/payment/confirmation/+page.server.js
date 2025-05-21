// Lógica del servidor para confirmación del pago exitoso

import { fail } from '@sveltejs/kit';
import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export const actions = {
    reserve: async ({ request, locals }) => {
        const formData = await request.formData();
        const id_user = locals.user.id_user;
        const id_shift = formData.get("id_shift");

        // Validate input
        if (!id_shift) {
            return fail(400, { error: 'Please select an appointment to reserve' });
        }

        // Prepare request body
        const body = { 
            id_user: Number(id_user), 
            id_shift: Number(id_shift)
        };

        console.log("Request body:", body);
        
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
            // Send reservation request to API
            const response = await axios.put(
                `${API_URL}/shifts/reserve/${id_shift}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
       
            if (response.status !== 200) {
                return fail(response.status, { 
                    error: response.data.message || 'Error reserving the appointment' 
                });
            }
    
            return { 
                success: true,
                message: 'Appointment reserved successfully',
                updatedUser: response.data 
            };
        }
        catch (error) {
            console.error("Error reserving appointment:", error);

            // Handle specific error cases
            if (error.response?.status === 409) {
                return fail(409, { error: 'This appointment is no longer available' });
            }
            
            if (error.response?.status === 403) {
                return fail(403, { error: 'You are not authorized to reserve this appointment' });
            }
            
            if (error.response) {
                return fail(error.response.status || 500, { 
                    error: error.response.data?.message || 'Error reserving the appointment',
                    details: error.response.data
                });
            }
            
            return fail(500, { error: 'An unexpected error occurred. Please try again later.' });
        }
    }
};