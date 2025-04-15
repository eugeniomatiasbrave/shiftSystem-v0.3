
export const load = async ({ locals, url }) => {
	
if (locals.user) {
        return {
            user: locals.user,
            url: url.pathname
        };
		
	} else {
		return {
			user: null,
			url: url.pathname
		};
	}
	
};
