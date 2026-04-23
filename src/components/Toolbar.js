import { useContext } from "react";
import { ThemeContext } from "../shared/contexts/themeContext";

function Button({ click, children }) {
  const theme = useContext(ThemeContext);
  return (
    <button
      className={`bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded me-3 mb-2 ${theme === "dark" ? "text-black" : "text-blue-700"}`}
      onClick={click}
    >
      {children}
    </button>
  );
}

export default function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div className="flex  flex-wrap mb-3">
      <Button click={onPlayMovie}>Play Movie</Button>
      <Button click={onUploadImage}>Upload Image</Button>
    </div>
  );
}
