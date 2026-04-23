import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1 className="font-extrabold text-6xl mb-2">{children}</h1>;
    case 2:
      return <h2 className="font-bold text-5xl mb-2">{children}</h2>;
    case 3:
      return <h3 className="font-semibold text-4xl mb-2">{children}</h3>;
    case 4:
      return <h4 className="font-medium text-3xl mb-2">{children}</h4>;
    case 5:
      return <h5 className="font-norma text-2xl mb-2">{children}</h5>;
    case 6:
      return <h6 className="font-light text-xl mb-2">{children}</h6>;
    default:
      throw Error("Unknown level: " + level);
  }
}
