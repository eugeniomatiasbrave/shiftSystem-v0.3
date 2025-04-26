import { fail } from "@sveltejs/kit";
import axios from 'axios';
const API_URL = process.env.VITE_API_URL;

export const load = async () => {
    const getShifts = async () => {
        const response = await fetch(`${API_URL}/shifts`);
        const data = await response.json();
        return data;
    };

    return {
        shifts: await getShifts(),
    };
};

//obtener las cookies del usuario

export const actions = {
    reserve: async ({ request, locals }) => {
        const formData = await request.formData();
        const id_user = locals.user.id_user; // Obtener el ID del usuario desde `locals`
        const id_shift = formData.get("id");
        const status = formData.get("status");

        const body = { id_user, id_shift, status };
        console.log("body:", body);
       
        // Crear el turno y agregarlo al usuario
        const cookies = request.headers.get('cookie');
        console.log('Cookies:', cookies);

        try {
        const response = await axios.put(
            `http://localhost:8080/api/shifts/reserve/${id_shift}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies}`, // Agregar el token de autorización
                }
            });
       
		if (response.status !== 200) {
            return fail(response.status, { error: response.data.message || 'Error al actualizar el perfil' });
          }
    
          return { 
            success: true,
            updatedUser: response.data };
        }
        catch (error) {
            console.error("Error reservando el turno:", error);
            return fail(500, { error: 'Error reservando el turno' });
        }
    }
};
