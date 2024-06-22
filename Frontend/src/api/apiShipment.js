import axios from 'axios';

const API_BASE_URL = 'https://localhost:7276';

export const getShipmentDetails = ( token) => {

  return axios.get(`${API_BASE_URL}/list-shipment-details`,{
    headers: {
      'Accept': '*/*',
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

export const addShipmentDetail = ( token, data) => {

  return axios.post(`${API_BASE_URL}/add-shipment-detail`,data,{
    headers: {
      'Accept': '*/*',
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

export const updateShipmentDetail = ( id, token, data) => {

  return axios.put(`${API_BASE_URL}/update-shipment-detail/${id}`,data,{
    headers: {
      'Accept': '*/*',
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

export const deleteShipmentDetail = (id, token) => {
  return axios.delete(`${API_BASE_URL}/delete-shipment-detail`, {
    headers: {
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
    },
    params: {
      id: id
    }
  });
};