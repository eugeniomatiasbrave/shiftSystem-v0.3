
export const load = async ({ locals, url }) => {
    return {
        user: locals.user || null,
        url: url.pathname
    };
};
