import { createSlice } from "@reduxjs/toolkit";                                                 
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
    clearErrorMsg: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            // Use spread operator for clarity
            state.products[index] = {
              ...state.products[index],
              ...action.payload,
            };
          } else {
            console.error("Product not found for update: ", action.payload.id);
          }
        } else {
          console.error("Action payload is undefined");
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the product by ID
        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});
export const { clearErrorMsg, clearProducts } = productSlice.actions;
export default productSlice.reducer;



