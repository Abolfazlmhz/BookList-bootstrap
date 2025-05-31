import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./booksSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
