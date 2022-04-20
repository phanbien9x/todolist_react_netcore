import axios from 'axios';

export const apiRegister = (data) => axios.post('/register', data);
