import Axios from 'axios';

export const axios = Axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

axios.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);
