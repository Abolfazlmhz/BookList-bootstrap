import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "../App";

const BookInfo = () => {
  const { books } = useContext(BookContext);
  const { id } = useParams();
  if (books.length === 0) {
    return <h4 className="text-center my-5 mx-auto">در حال بارگذاری...</h4>;
  }

  const book = books.find((b) => b.id === id);
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