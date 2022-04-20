import axios from 'axios';

export const apiRecoverPassword = (data) => axios.post('/recover-password', data);
