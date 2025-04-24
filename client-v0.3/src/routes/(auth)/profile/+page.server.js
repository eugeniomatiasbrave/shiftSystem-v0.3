import { fail } from '@sveltejs/kit';
import axios from 'axios';


export const load = async ({ locals }) => {
    //console.log('Server Load Ran');
console.log('locals:', locals.user);
    return {
       user: locals.user,
    };
};

export const actions = {
    users: async ({ request,locals }) => {
      const formData = await request.formData();
      const id_user = formData.get('id');
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const role = locals.user.role; // Obtener el rol del usuario desde locals.user
  
      // Validación de datos
      if (!id_user || !firstName || !lastName || !email || !role) {
        return fail(400, { error: 'Todos los campos son obligatorios' });
      }
   const data = {
        firstName,
        lastName,
        email,
        role
      };



      //obtener las cookies del usuario
      const cookies = request.headers.get('cookie');
      console.log('Cookies:', cookies);

      //enviar las cookies en los headers de la peticion
      try {
        const response = await axios.put(
          `http://localhost:8080/api/users/${id_user}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${cookies}`, // Agregar el token de autorización
            }
          }
        );
  
        if (response.status !== 200) {
          return fail(response.status, { error: response.data.message || 'Error al actualizar el perfil' });
        }
  
        return { success: true };
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        return fail(500, { error: 'Error interno del servidor' });
      }
    }
  };
