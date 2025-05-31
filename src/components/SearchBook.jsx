import { useState, useContext, useMemo, useCallback } from "react";
import { ThemeContext } from "../App";
import ShowBook from "./ShowBook";
import { useSelector } from "react-redux";
import {selectAllBooks} from "../features/booksSlice"

const SearchBook = () => {
  const theme = useContext(ThemeContext);
 

  const [searchWhat, setSearchWhat] = useState("");
  const books = useSelector(selectAllBooks);

  let filteredBooks = useMemo(
    () => books.filter((book) => book.نام.includes(searchWhat)),
    [books, searchWhat]
  );

  const Search = useCallback(
    (e) => {
      setSearchWhat(e.target.value);
    },
    [setSearchWhat]
  );
  // const input = useRef(null);
  // console.log(input.current.value);
  return (
    <div
      className="d-flex flex-column gap-3 px-4 text-center"
      style={{
        borderLeft: "1px solid black",
        borderColor: theme === "light" ? "black" : "white",
        width: "20%",
      }}
    >
      <input
        // ref={input}
        onChange={Search}
        type="text"
        className="form-control form-text"
        placeholder="جستجوی کتاب"
      />
      <ShowBook books={filteredBooks} />
    </div>
  );
};
export default SearchBook;
