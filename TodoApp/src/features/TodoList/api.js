import axios from 'axios';

export const apiTodolist_Listing = () => axios.get('/todo');
export const apiTodolist_Add = (data) => axios.post('/todo', data);
