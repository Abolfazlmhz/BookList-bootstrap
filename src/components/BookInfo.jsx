import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBookById } from "../features/booksSlice";

const BookInfo = () => {
  const { id } = useParams();

  const book = useSelector((state) => selectBookById(state, id));
  const status = useSelector((state) => state.books.status);

  if (status === "loading") {
    return <h4 className="text-center my-5 mx-auto">در حال بارگذاری...</h4>;
  }

  if (!book) {
    return <h4 className="p-2">کتاب پیدا نشد</h4>;
  }

  return (
    <div
      className="card text-bg-light text-center my-5 mx-auto"
      style={{ minWidth: "18rem" }}
    >
      <div className="card-body">
        <h5 className="card-title mb-3">{book.نام}</h5>
        <p className="card-text text-secondary">نویسنده: {book.نویسنده}</p>
        <p className="card-text text-secondary">قیمت: {book.قیمت}</p>
      </div>
    </div>
  );
};

export default BookInfo;
