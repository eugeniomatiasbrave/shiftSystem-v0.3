// Lógica del servidor para turnos

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

