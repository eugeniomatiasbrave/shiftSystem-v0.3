import { fail } from "@sveltejs/kit";
import axios from 'axios';
const API_URL = process.env.VITE_API_URL;

export const load = async ({ locals, url }) => {
    // Extract query parameters for filtering if needed
    const date = url.searchParams.get('date');
    
    const getShifts = async () => {
        try {
            // Get user token for potential authenticated requests
            const token = locals.user?.token;
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            // Add date filter if provided
            const params = date ? { date } : {};
            
            const response = await axios.get(`${API_URL}/shifts`, { 
                params,
                headers 
            });
            
            return {
                success: true,
                data: response.data.data || []
            };
        } catch (error) {
            console.error("Error fetching shifts:", error);
            return {
                success: false,
                data: [],
                error: error.response?.data?.message || "Failed to load available shifts"
            };
        }
    };

    return {
        shifts: await getShifts(),
    };
};

//obtener las cookies del usuario

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
