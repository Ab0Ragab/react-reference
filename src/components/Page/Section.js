import { LevelContext } from "./LevelContext.js";
import { useContext } from 'react';

export default function Section({ children }) {
  const level = useContext(LevelContext);

  return (
    <section className="border shadow bg-white mb-10 p-5 rounded-lg">
      <LevelContext value={level + 1}>{children}</LevelContext>
    </section>
  );
}
