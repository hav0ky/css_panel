import axios from 'axios';

const next_axios = axios.create();

// Add a request interceptor
next_axios.interceptors.request.use(
    config => {
        config.headers['Content'] = 'application/json';
        config.headers['Accept'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_AUTH_SECRET}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default next_axios