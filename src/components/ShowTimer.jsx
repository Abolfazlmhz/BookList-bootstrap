import React, { useEffect, useState, useRef, useContext } from "react";
import { ThemeContext } from "../App";

const ShowTimer = () => {
  const theme = useContext(ThemeContext);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <p style={{ color: theme === "light" ? "black" : "white" }}>
        تایمر: {timer}
      </p>
    </div>
  );
};

export default ShowTimer;