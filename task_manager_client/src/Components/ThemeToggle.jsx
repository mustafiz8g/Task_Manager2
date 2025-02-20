import  { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "darktheme");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "darktheme" : "light";
    setTheme(newTheme);
  };

  return (
   
    <div className=" flex w-12 justify-center items-center  mt-[3.2px]">
    <button className="text-lg" onClick={toggleTheme}>
      {theme === "light" ? <FaMoon /> : <FaSun />} 
     
    </button>
  </div>
    
  );
};

export default ThemeToggle;