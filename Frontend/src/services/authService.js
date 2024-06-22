import { signIn, signOut } from '../api/apiAuth';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { signUp } from '../api/apiAuth';

export const authenticateUser = async (dispatch, data) => {
  try {
    const response = await signIn(data.userName, data.password);
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    const decoded = jwtDecode(response.data.data.token);
    dispatch(login(decoded));
    toast.success("Login successful");
    return decoded;
  } catch (error) {
    console.error('Login failed', error);
    toast.error("Login failed");
    throw error;
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await signUp(userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

export const signOutUser = async (data) => {
  try {
    const response = await signOut(data);
    return response;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};