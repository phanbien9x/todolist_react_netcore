import axios from 'axios';

export const apiTodolist_Listing = () => axios.get('/Todo');
export const apiTodolist_Add = (data) => axios.post('/Todo', data);
