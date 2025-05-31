import { NavLink, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { useContext } from "react";
import { toast, Slide } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteBook } from "../features/bookSlice";
import "react-toastify/dist/ReactToastify.css";


let ShowBooks = ({ books }) => {

  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBook(id)).unwrap(); // صبر می‌کنه تا حذف تموم بشه
      toast.success("کتاب حذف شد 😁", {
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      navigate("/");
    } catch (error) {
      toast.error("خطایی رخ داد 😥", {
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  return (
    <>
      <h5 style={{ color: theme === "light" ? "black" : "white" }}>کتاب ها</h5>
      <Link
        className="btn btn-success text-center mx-auto"
        to={"/BookList/add"}
        style={{ fontSize: ".9rem" }}
      >
        افزودن کتاب
      </Link>
      {books.map((book) => (
        <div key={book.id} className="d-flex flex-column gap-3">
          <NavLink
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#0dcaf0" : "#0d6efd",
              fontWeight: isActive ? "bold" : "500",
            })}
            to={`/BookList/${book.id}`}
          >
            {book.نام}
          </NavLink>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/BookList/${book.id}/edit`}
              className="btn btn-warning text-center"
              style={{ fontSize: ".9rem", width: "40%" }}
            >
              ویرایش
            </Link>
            <button
              onClick={() => handleDelete(book.id)}
              className="btn btn-danger text-center"
              style={{ fontSize: ".9rem", width: "40%" }}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default ShowBooks;
