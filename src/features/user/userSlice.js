import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  message: "",
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (data1, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/user/profile/${data1.id}`,
        {
          headers: {
            Authorization: `Bearer ${data1.token}`,
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export default userSlice.reducer;
