// frontend/src/services/api.js
// Use axios to interact with backend APIs
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

export const fetchDisasters = async () => {
  const res = await axios.get(`${API_BASE_URL}/disasters`);
  return res.data;
};

// Add more API functions as needed 