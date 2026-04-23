import { useState, startTransition, Suspense } from "react";

function VideoPlaceholder() {
  return (
    <div className="animate-pulse bg-gray-300 rounded-lg w-64 h-36 flex items-center justify-center">
      <span className="text-gray-500">Loading video...</span>
    </div>
  );
}

function Video() {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg w-64 h-36 flex items-center justify-center text-white font-bold shadow-lg">
      🎬 Video Loaded
    </div>
  );
}

export default function AnimationExample() {
  const [showItem, setShowItem] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-xl bg-white shadow">
      <h3 className="text-lg font-semibold">Animation Toggle Example</h3>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >
        {showItem ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path d="M5 12h14" />
            </svg>
            Hide
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Show
          </>
        )}
      </button>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showItem
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <Suspense fallback={<VideoPlaceholder />}>
          <Video />
        </Suspense>
      </div>
    </div>
  );
}
