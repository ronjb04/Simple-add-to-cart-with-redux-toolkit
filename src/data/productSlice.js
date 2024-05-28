import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productList from '../data/productList.json';

export const fetchAllProducts = createAsyncThunk('fetch-all-products', async (apiUrl) => {
  const response = await fetch(apiUrl)
  return response.json()
})

const productSlice = createSlice({
  name: 'products',
  initialState: { data: [], fetchStatus: ''},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase( fetchAllProducts.fulfilled, (state, action) => {
        state.data = action.payload
        state.fetchStatus = 'sucess'
      })
      .addCase( fetchAllProducts.pending, (state) => {
        state.state = 'loading'
      })
      .addCase( fetchAllProducts.rejected, (state) => {
        state.data = productList.products;
        state.state = 'error'
      })
  }
})

export default productSlice;