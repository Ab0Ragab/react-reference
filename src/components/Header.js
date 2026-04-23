import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../shared/contexts/themeContext";

export default function Header() {
  const { pathname } = useLocation();
  const theme = useContext(ThemeContext);
  const isHome = pathname === "/home";

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 shadow ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <h1 className="text-xl font-bold">My App</h1>
      <Link
        to={isHome ? "/" : "/home"}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isHome ? "Welcome" : "Home"}
      </Link>
    </header>
  );
}
