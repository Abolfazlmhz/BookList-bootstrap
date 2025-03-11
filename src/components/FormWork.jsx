import React, { useContext, useEffect } from "react";
import { ThemeContext, BookContext } from "../App";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const FormWork = (props) => {
  console.log(props,"ok");
  
  const { books, fetch } = useContext(BookContext);
  const theme = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { id: editId } = useParams();
  const navigate = useNavigate();

  const editBook = !isNaN(editId) && books.find((book) => book.id === editId);

  useEffect(() => {
    if (editBook) {
      setValue("نام", editBook.نام || "");
      setValue("نویسنده", editBook.نویسنده || "");
      setValue("قیمت", editBook.قیمت || "");
    } else {
      setValue("نام", "");
      setValue("نویسنده", "");
      setValue("قیمت", "");
    }
  }, [editBook]);

  if (editId && !editBook) {
    return (
      <h4
        className="p-2"
        style={{ color: theme === "light" ? "black" : "white" }}
      >
        کتاب پیدا نشد
      </h4>
    );
  }

  const onSubmit = async (data) => {
    const newBook = {
      id: isNaN(editId)
        ? `${parseInt(books[books.length - 1].id) + 1}`
        : editId,
      نام: data.نام,
      نویسنده: data.نویسنده,
      قیمت: data.قیمت,
    };
    try {
      if (isNaN(editId)) {
        await axios.post("http://localhost:9000/books", newBook);
      } else {
        await axios.put(`http://localhost:9000/books/${editId}`, newBook);
      }
      fetch();
      navigate(`/BookList/${newBook.id}`);
      toast.success("با موفقیت انجام شد 😁", {
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-center my-5 mx-auto"
    >
      <div>
        <label
          htmlFor="نام"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          نام کتاب:
        </label>
        <input
          className="form-control"
          id="title"
          {...register("نام", { required: "نام کتاب الزامی است." })}
        />
        {errors.نام && (
          <span className="text-danger">{errors.نام.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="نویسنده"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          نام نویسنده:
        </label>
        <input
          className="form-control"
          id="author"
          {...register("نویسنده", { required: "نام نویسنده الزامی است." })}
        />
        {errors.نویسنده && (
          <span className="text-danger">{errors.نویسنده.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="قیمت"
          style={{ color: theme === "light" ? "black" : "white" }}
        >
          قیمت:
        </label>
        <input
          className="form-control"
          id="price"
          type="number"
          {...register("قیمت", {
            required: "لطفا قیمت را وارد کنید",
            min: {
              value: 80000,
              message: "حداقل قیمت 80000 است.",
            },
            max: {
              value: 800000,
              message: "قیمت بسیار بالاست!",
            },
          })}
        />
        {errors.قیمت && (
          <span className="text-danger">{errors.قیمت.message}</span>
        )}
      </div>

      <button className="btn btn-primary mt-2 w-50" type="submit">
        {isNaN(editId) ? "افزودن" : "ویرایش"}
      </button>
    </form>
  );
};
export default FormWork;
