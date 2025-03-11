import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

const ChangeTheme = () => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.background = theme === "light" ? "white" : "#323232";
  }, [theme]);

  return null;
};

export default ChangeTheme;