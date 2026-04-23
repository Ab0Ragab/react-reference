import { useState } from "react";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2 className="font-bold mb-3">Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
        "apple" and is often translated as "full of apples". In fact, the region
        surrounding Almaty is thought to be the ancestral home of the apple, and
        the wild <i lang="la">Malus sieversii</i> is considered a likely
        candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="bg-white shadow-md rounded-md p-5 mb-5">
      <h3 className="font-semibold mb-2">{title}</h3>
      {isActive ? (
        <p className="text-gray-500">{children}</p>
      ) : (
        <button
          className="bg-gray-300 text-sm hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:bg-gray-50 disabled:cursor-not-allowed"
          onClick={onShow}
        >
          Show
        </button>
      )}
    </section>
  );
}
