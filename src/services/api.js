import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://todo-list-6o3p.onrender.com";

export const getTasks = () => axios.get(`${API_URL}/api/tasks/all`);
export const createTask = (data) =>
  axios.post(`${API_URL}/api/tasks/create`, data);
export const updateTask = (id, data) =>
  axios.put(`${API_URL}/api/tasks/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_URL}/api/tasks/${id}`);
