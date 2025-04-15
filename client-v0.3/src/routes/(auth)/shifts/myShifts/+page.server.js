import { redirect } from '@sveltejs/kit';
const API_URL = process.env.VITE_API_URL;

export const load = async ({locals}) => {
   
	const userId = locals.user._id
	
    const getShiftsToUserId = async () => {
        const response = await fetch(`${API_URL}/shifts/user/${userId}`);
        const data = await response.json();
        return data;
    };

    return {
        shiftsUser: await getShiftsToUserId(userId),
    };
}


export const actions = {
    default: async ({ request}) => {
        const formData = await request.formData();
        const userId = '';
        const sid = formData.get('sid');
        const status = 'Vacant';

        if (!sid) {
            return { success: false, error: 'Shift ID is required' };
        }

        const body = { userId, sid, status };

        const result = await fetch(`${API_URL}/shifts/${sid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!result.ok) {
            return { success: false, error: 'Error canceling shift ' };
        }

        throw redirect(303, '/shifts');
    }
}