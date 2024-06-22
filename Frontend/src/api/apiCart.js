import axios from 'axios';

const API_BASE_URL = 'https://localhost:7276/api/Cart';

export const addToCartAPI = (productId, quantity, token) => {

  return axios.post(`${API_BASE_URL}/add-to-cart`, {
    productId,
    quantity,
  }, {
    headers: {
      'Accept': '*/*',
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

export const getCartAPI = (sortBy = '', token) => {
  const url = `${API_BASE_URL}/get-cart`;
  const data = {
    perPage: 2,
    currentPage: 0,
    sortBy: sortBy,
    isAscending: true
  };
  return axios.get(url, {
    headers: {
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  });
};


export const getCartItems = (id) => {
  const url = `${API_BASE_URL}/get-cart-item/${id}`;
  return axios.get(url, {
    headers: {
      'accept': '*/*'
    }
  });
};
