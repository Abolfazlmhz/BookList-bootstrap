import SearchBook from "./components/SearchBook";
import ShowTimer from "./components/ShowTimer";
import ChangeTheme from "./components/changeTheme";
import { Outlet, useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "./features/booksSlice";


export const ThemeContext = createContext("light");
function App() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.books);

  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleTheme = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="container">
      <ThemeContext.Provider value={theme}>
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="btn btn-primary"
          >
            خانه
          </button>
          <h1 className="text-center text-primary fs-3 mt-3 d-inline-block">
            به کتابخانه ابوالفضل خوش آمدید
          </h1>
          <button
            onClick={handleTheme}
            type="button"
            className="btn btn-primary"
          >
            تغییر تم
          </button>
        </div>
        <hr style={{ color: theme === "light" ? "black" : "white" }} />
        <div className="d-flex align-items-start">
            <ShowTimer />
            <SearchBook />
            <Outlet />
            <ChangeTheme />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
