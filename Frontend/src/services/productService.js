// src/services/productService.js
import { getProductList, getProductById,getProductSortBy   } from '../api/apiProduct';

export const fetchProducts = async (sortBy = '') => {
  try {
    const response = await getProductList(sortBy);
    const { total, data } = response.data;
    return { total, products: data.$values };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsSorted = async (sortBy = '') => {
  try {
    const response = await getProductSortBy(sortBy);
    return response.data.data.$values;
  } catch (error) {
    console.error('Error fetching sorted products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await getProductById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};