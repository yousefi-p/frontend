import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
})

API.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

const handleTokenRefresh = async (error: any) => {
    const originalConfig = error.config;
    if (
        error.response &&
        error.response.status === 401 &&
        !originalConfig._retry &&
        localStorage.getItem('refresh_token')
    ) {
        originalConfig._retry = true;
        try {
            const res = await axios.post('http://localhost:8000/api/token/refresh/', {
                refresh: localStorage.getItem('refresh_token'),
            });
            localStorage.setItem('access_token', res.data.access);
            originalConfig.headers['Authorization'] = `Bearer ${res.data.access}`;
            return axios(originalConfig);
        } catch (_error) {
            console.error('Refresh token failed:', _error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return Promise.reject(_error);
        }
    }
    return Promise.reject(error);
};

API.interceptors.response.use(
    (res) => res,
    handleTokenRefresh
);

export default API
