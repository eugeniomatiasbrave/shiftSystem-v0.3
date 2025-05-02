import { fail } from '@sveltejs/kit';
import axios from 'axios';
const API_URL = process.env.VITE_API_URL;

export const load = async ({ locals }) => {
	const id_user = locals.user.id_user;

	const getShiftsByUser = async () => {
		try {
			// Get token from locals
			const token = locals.user?.token;
			
			const config = {
				headers: token ? {
					Authorization: `Bearer ${token}`
				} : {}
			};
			
			const response = await axios.get(`${API_URL}/shifts/user/${id_user}`, config);
			
			// Process the data to ensure proper date formatting
			const data = Array.isArray(response.data.data) 
				? response.data.data 
				: [];
			
			return {
				success: true,
				data
			};
		} catch (error) {
			console.error("Error fetching user shifts:", error);
			return {
				success: false,
				data: [],
				error: error.response?.data?.message || "Failed to load your appointments"
			};
		}
	};

	return {
		getShiftsByUser: await getShiftsByUser()
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const id_user = locals.user.id_user;
		const id_shift = formData.get('id_shift');

		if (!id_shift) {
			return fail(400, { error: 'Appointment ID is required for cancellation' });
		}

		const body = { 
			    id_user: Number(id_user),
			    id_shift: Number(id_shift) 
			};

		// 
		let token = locals.user?.token;
		
		if (!token) {
			// Extract from cookies if not available in locals
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
			// Send cancellation request
			const response = await axios.put(
				`${API_URL}/shifts/cancel/${id_shift}`,
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
					error: response.data.message || 'Error cancelling the appointment'
				});
			}

			return {
				success: true,
				message: 'Appointment cancelled successfully'
			};
		} catch (error) {
			console.error('Error cancelling appointment:', error);
			
			// Handle specific error cases
			if (error.response?.status === 403) {
				return fail(403, { 
					error: 'You cannot cancel this appointment. It may be too close to the scheduled time.' 
				});
			}
			
			if (error.response?.status === 404) {
				return fail(404, { 
					error: 'Appointment not found or already cancelled' 
				});
			}
			
			if (error.response) {
				return fail(error.response.status || 500, { 
					error: error.response.data?.message || 'Error cancelling the appointment',
					details: error.response.data
				});
			}
			
			return fail(500, { 
				error: 'An unexpected error occurred. Please try again later.' 
			});
		}
	}
};
