import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  detail: [],
  isLoading: false,
  isError: false,
  message: "",
  cast: {},
};

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}`;

export const getMovies = createAsyncThunk(
  "movie/getMovie",
  async (_, thunkAPI) => {
    try {
      const res = await axios({
        method: "get",
        url,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "movie/detailMovie/:id",
  async (id, thunkAPI) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCastMovie = createAsyncThunk(
  "movie/castMovie/:id",
  async (id, thunkAPI) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },
    [getMovies.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
    [getCastMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getCastMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cast = action.payload;
    },
    [getCastMovie.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
    [getMovieDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovieDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = [action.payload];
    },
    [getMovieDetail.rejected]: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
  },
});

// export const {} = movieSlice.actions;
export default movieSlice.reducer;
