import { createAsyncThunk } from '@reduxjs/toolkit';                                                                    
import { fetchProductAPI, createProductAPI, updateProductAPI, deleteProductAPI } from '../../api/productAPI';

/* Fetch, create, update, and delete products using the Product API function. */
export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProductAPI();
      return products;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create',
  async (newProduct, { rejectWithValue }) => {
    try {
      const createdProduct = await createProductAPI(newProduct);
      return createdProduct;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product. Please try again later.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async (productData, { rejectWithValue }) => {
    const payload = {
      code: productData.code,
      name: productData.name,
      description: productData.description,
      active: productData.active,
      price: productData.price,
      stock: parseInt(productData.stock),
      weight: productData.weight,
      brand: productData.brand,
      color: productData.color,
      size: productData.size,
      length: productData.length,
      width: productData.width,
      height: productData.height,
      image: productData.image,
      category_id: productData.category_id,
      supplier_id: productData.supplier_id,
      updated_by: productData.updated_by,
      updated_at: new Date().toISOString(),
    };

    try {
      console.log("payload: ", payload);
      const response = await updateProductAPI(productData.id, payload);
      console.log("[response] response: ", response);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProductAPI(id);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product.';
      return rejectWithValue(errorMessage);
    }
  }
);

/* Good Code */

/* Handle Non-HTTP Errors (Network or Server Down): */
// const handleAPIError = (error, defaultMessage) => {
//   if (!error.response) {
//     return 'Network error. Please try again later.';
//   }
//   return error.response?.data?.message || defaultMessage;
// };

// const handleAPIError = (error, defaultMessage) => {
//   return error.response?.data?.message || defaultMessage;
// };

// export const updateProduct = createAsyncThunk(
//   'product/update',
//   async (productData, { rejectWithValue }) => {
//     const payload = {
//       ...productData,
//       stock: parseInt(productData.stock),
//       updated_at: new Date().toISOString(),
//     };

//     try {
//       const response = await updateProductAPI(productData.id, payload);
//       return response;
//     } catch (error) {
//       return rejectWithValue(handleAPIError(error, 'Failed to update product.'));
//     }
//   }
// );

// export const createProduct = createAsyncThunk(
//   'product/create',
//   async (newProduct, { rejectWithValue }) => {
//     try {
//       const createdProduct = await createProductAPI(newProduct);
//       return createdProduct;
//     } catch (error) {
//       return rejectWithValue(handleAPIError(error, 'Failed to create product. Please try again later.'));
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   'product/delete',  // singular for consistency
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await deleteProductAPI(id);
//       return response;
//     } catch (error) {
//       return rejectWithValue(handleAPIError(error, 'Failed to delete product.'));
//     }
//   }
// );
