import axios from 'axios';

export const apiLogin = (data) => axios.post(`/login`, data);
export const apiLogout = (data) => axios.get(`/logout`, data);
