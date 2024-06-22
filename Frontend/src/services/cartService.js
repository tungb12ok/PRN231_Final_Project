import { addToCartAPI, getCartAPI } from '../api/apiCart';
import { toast } from "react-toastify";

export const addToCart = async (productId, quantity, token) => {
  // console.log(quantity, token, productId);
  try {
    const response = await addToCartAPI(productId, quantity, token);
    toast.success("Product added to cart successfully");
    return response.data;
  } catch (error) {
    console.error('Add to cart failed', error);
    toast.error("Add to cart failed: " + error.message);
    throw error;
  }
};

export const getUserCart = async (sortBy = '', token) => {
  try {
    const response = await getCartAPI(sortBy, token);
    return response.data.data.$values;
  } catch (error) {
    console.error('Error fetching cart:', error);
    toast.error('Error fetching cart');
    throw error;
  }
};
