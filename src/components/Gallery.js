import { useState } from "react";
import { sculptureList } from "../shared/data/data";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;
  const hasPrev = index > 0;

  const handleNextClick = () => {
    hasNext ? setIndex(index + 1) : setIndex(0);
  };

  const handlePrevClick = () => {
    hasPrev ? setIndex(index - 1) : setIndex(0);
  };

  const handleMoreClick = () => {
    setShowMore(!showMore);
  };

  let sculpture = sculptureList[index];

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={sculpture.url} alt={sculpture.alt} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {sculpture.name}{" "}
            <span className="text-blue-400"> by {sculpture.artist} </span>(
            {index + 1} of {sculptureList.length})
          </div>
          <p className="text-gray-700 text-base">
            {showMore && <span>{sculpture.description}</span>}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button
            onClick={handleMoreClick}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {showMore ? "Hide" : "Show"} details
          </button>
        </div>
      </div>

      <div className="flex my-5">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-s disabled:bg-gray-50 disabled:cursor-not-allowed"
          onClick={handlePrevClick}
          disabled={!hasPrev}
        >
          Prev
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-e disabled:bg-gray-50 disabled:cursor-not-allowed"
          onClick={handleNextClick}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </>
  );
}
