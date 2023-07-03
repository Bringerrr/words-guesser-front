import axios from 'axios';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const $api = axios.create({
    baseURL: `${process.env.APP_API || ''}/api`,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
