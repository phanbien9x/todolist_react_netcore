import axios from 'axios';

export const apiChangePassword = (data) => axios.patch('/change-password', data);
