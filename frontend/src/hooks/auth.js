import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
    const res = await axios.post(`${API_URL}/user/login`, { username, password });
    if (res.data.accessToken) {
        sessionStorage.setItem('accessToken', res.data.accessToken);
        sessionStorage.setItem('user', res.data.user);
    }
    return res.data;
};

export const logout = async () => {
    const res = await axios.post(`${API_URL}/user/logout`);
    alert(`${res.data.message}`);
    sessionStorage.removeItem('accessToken');
};
