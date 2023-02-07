import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/movieSlice";
import userReducer from "./features/user/userSlice";
import orderReducer from "./features/order/orderSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
    order: orderReducer,
  },
});
