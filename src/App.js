import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./shared/contexts/themeContext";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Welcome from "./pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext value={theme}>
      <div
        className={`min-h-screen ${theme === "dark" ? "bg-black dark" : "bg-gray-100"}`}
      >
        <Header />
        <div className="flex justify-end p-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span
              className={`ms-3 text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Dark mode
            </span>
          </label>
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeContext>
  );
}

export default App;
