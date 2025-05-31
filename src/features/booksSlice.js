import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const booksAdapter = createEntityAdapter();
const initialState = booksAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchBooks = createAsyncThunk("books/fetchBook", async () => {
  const res = await axios.get("http://localhost:9000/books");
  return res.data;
});
export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`http://localhost:9000/books/${id}`);
  return id;
});
export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
  const res = await axios.post("http://localhost:9000/books", newBook);
  return res.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook) => {
    const res = await axios.put(
      `http://localhost:9000/books/${updatedBook.id}`,
      updatedBook
    );
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        booksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        booksAdapter.removeOne(state, action.payload);
      })
      .addCase(addBook.fulfilled, (state, action) => {
        booksAdapter.addOne(state, action.payload);
      })

      .addCase(updateBook.fulfilled, (state, action) => {
        booksAdapter.upsertOne(state, action.payload);
      });
  },
});
export default bookSlice.reducer;
export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectIds: selectBookIds,
} = booksAdapter.getSelectors((state) => state.books);
