import axios from 'axios';

export const apiGetUserInfo = () => axios.get('/user-info');
export const apiChangeUserInfo = (data) => axios.patch('/user-info', data);
