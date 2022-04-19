import axios from 'axios';

export const apiTodo_Update = ({ id, data }) => axios.patch(`/todo/${id}`, data);
export const apiTodo_Delete = (id) => axios.delete(`/todo/${id}`);
