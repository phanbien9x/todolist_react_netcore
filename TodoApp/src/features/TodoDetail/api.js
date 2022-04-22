import axios from 'axios';

export const apiTodoDetail = (id) => axios.get(`/todo/${id}`);
