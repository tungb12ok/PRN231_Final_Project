import axios from 'axios';

const API_BASE_URL = 'https://localhost:7276/api/Brand';

export const getAllBrands = () => {
  return axios.get(`${API_BASE_URL}/list-all`, {
    headers: {
      'accept': '*/*'
    }
  });
};