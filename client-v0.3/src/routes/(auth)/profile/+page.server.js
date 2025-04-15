import { redirect } from '@sveltejs/kit';
const API_URL = process.env.VITE_API_URL;

export const load = async ({ locals }) => {
    console.log('Server Load Ran')

    const getUserByEmail = async () => {
        const email = locals.user.email;
        const response = await fetch(`${API_URL}/users/email/${email}`);
        const data = await response.json();
        return data;
    };
    
    return {
        user: await getUserByEmail(),
    };
}
    
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const userId = formData.get('id');
        const name = formData.get('name');
        const email = formData.get('email');
        const avatar = formData.get('avatar');

        const uploaderFormData = new FormData();
        uploaderFormData.append('name', name);
        uploaderFormData.append('email', email);
        uploaderFormData.append('avatar', avatar);

      // console.log('AvatarFormData:', uploaderFormData); llega bien

        const result = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            body: uploaderFormData,
            });
    
            if (!result.ok) {
                return { success: false, error: 'Error' };
            }
            
            throw redirect(303, '/profile');
        }
    }

        