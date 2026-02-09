import { fail } from "@sveltejs/kit";

const API_URL = process.env.VITE_API_URL;

export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const password = formData.get("password");

		// Validación de datos
        if (!email) {
            return fail(400, { email, missing: true });
        }
        if (!firstName) {
            return fail(400, { firstName, missing: true });
        }
        if (!lastName) {
            return fail(400, { lastName, missing: true });
        }
        if (!password) {
            return fail(400, { password, missing: true });
        }

		const body = { email, firstName, lastName, password };

		const res = await fetch(`${API_URL}/sessions/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		
		
		if (res.status !== 200) {
			const resBody = await res.json();
			return fail(res.status, resBody);
		}

		const resBody = await res.json();
	
        return {
           status: 200,
           body: { message: "Register successful", data: resBody }
	    };
    }
};