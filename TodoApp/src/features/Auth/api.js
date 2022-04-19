import axios from 'axios';
import { BASE_URL } from '../../app/config.js';

export const apiLogin = (data) => axios.post(`${BASE_URL}/login`, data);
export const apiLogout = (data) => axios.get(`${BASE_URL}/logout`, data);