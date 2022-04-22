import axios from 'axios';

export const apiTodoDetail = (id) => axios.get(`/todo/${id}`);
export const apiUploadAttachment = ({ id, file }) =>
  axios.post(`/todo/${id}/attachment`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const apiDeleteAttachment = (id) => axios.delete(`/todo/attachment/${id}`);
