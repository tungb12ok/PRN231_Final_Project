import axios from 'axios';

const API_BASE_URL = 'https://localhost:7276/api/User/get-all-users';

export const fetchAllUsers = async (token) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};