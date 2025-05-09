import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const registerUser = async (data) => {
  return await axios.post(`${API_BASE_URL}/users/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_BASE_URL}/users/login`, data);
}; 