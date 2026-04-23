import { useState, useRef } from "react";
import { useTasksDispatch } from "./TasksContext.js";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();
  const inputRef = useRef(null);

  function addTask() {
    inputRef.current.focus();
    if (!text.trim()) return;
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
    setText("");
    inputRef.current.blur();
  }

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <input
        ref={inputRef}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && text.trim()) {
            dispatch({
              type: "added",
              id: nextId++,
              text: text,
            });
            setText("");
          }
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        onClick={addTask}
      >
        Add
      </button>
    </div>
  );
}

let nextId = 3;
