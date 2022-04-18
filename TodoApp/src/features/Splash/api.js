import axios from 'axios';
import { BASE_URL } from './../../app/config.js';

export const apiLogin = (data) => axios.post(`${BASE_URL}/Auth`, data);
