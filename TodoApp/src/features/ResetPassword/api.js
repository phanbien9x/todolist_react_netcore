import axios from 'axios';

export const apiResetPassword = (code, data) => axios.patch(`/reset-password/${code}`, data);
