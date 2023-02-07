import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: {},
  isLoading: false,
  message: "",
  isError: false,
};

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (data1, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:8000/api/movie/order", {
        owner: data1.owner,
        price: data1.price,
        name: data1.name,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: {
    [postOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [postOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    },
    [postOrder.fulfilled]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export default orderSlice.reducer;
