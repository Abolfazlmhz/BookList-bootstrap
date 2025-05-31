import { createSlice, createAsyncThunk,createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const booksAdapter = createEntityAdapter();
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBook", async () => {
  const res = await axios.get("http://localhost:9000/books");
  return res.data;
});
export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`http://localhost:9000/books/${id}`);
  return id;
});
  

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---------------- Fetch
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ---------------- Delete
      .addCase(deleteBook.fulfilled, (state, action) => {
        // فیلتر کردن کتاب حذف‌شده از آرایه
        state.items = state.items.filter((book) => book.id !== action.payload);
      });
  },
});
export default bookSlice.reducer;
