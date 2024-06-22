import axios from 'axios';
import {jwtDecode } from 'jwt-decode';


const API_BASE_URL = 'https://localhost:7276/api/Auth';

export const signIn = (userName, password) => {
  return axios.post(`${API_BASE_URL}/sign-in`, {
    userName,
    password,
  }, {
    headers: {
      'accept': '*/*'
    }
  });
};

export const signUp = (userData) => {
  return axios.post(`${API_BASE_URL}/sign-up`, userData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const signOut = (data) => {
  return axios.post(`${API_BASE_URL}/sign-out`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// const isTokenExpired = (token) => {
//   const decodedToken = jwtDecode(token);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp < currentTime;
// };


// export default refreshToken = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
//     token,
//     refreshToken,
//     userId,
//   }, {
//     headers: {
//       'Content-Type': 'application/json',
//       'accept': '*/*'
//     }
//   });

//   const { newToken, newRefreshToken } = response.data.data;
//   localStorage.setItem('token', newToken);
//   localStorage.setItem('refreshToken', newRefreshToken);
  
//   return newToken;
// };

// axios.interceptors.request.use(
//   async (config) => {
//     let token = localStorage.getItem('token');

//     if (token && isTokenExpired(token)) {
//       try {
//         token = await refreshToken();
//         config.headers['Authorization'] = `Bearer ${token}`;
//       } catch (error) {
//         console.error('Error refreshing token', error);
//         // Optionally handle logout or other actions
//       }
//     } else if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
