import axios from 'axios';

export const apiTodo_Update = ({ id, data }) => axios.patch(`/Todo/${id}`, data);
export const apiTodo_Delete = (id) => axios.delete(`/Todo/${id}`);
