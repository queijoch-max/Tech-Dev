export const API_URL = "http://localhost:3000/api";

export const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("token");

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
};
