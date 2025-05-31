import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BookInfo from "./components/BookInfo";
import FormWork from "./components/FormWork";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import store from "./features/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/BookList/:id" element={<BookInfo />} />
            <Route path="/BookList/add" element={<FormWork />} />
            <Route path="/BookList/:id/edit" element={<FormWork />} />
            <Route path="*" element={<h4 className="p-2">صفحه ناشناس</h4>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} rtl theme="colored" transition={Slide} />
    </Provider>
  </React.StrictMode>
);
