import { useState, useContext } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext.js";
import { ThemeContext } from "../../shared/contexts/themeContext";

export default function TaskList() {
  const tasks = useTasks();

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  const theme = useContext(ThemeContext);

  return (
    <li className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
      <input
        type="checkbox"
        className="accent-blue-500"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {isEditing ? (
        <input
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
      ) : (
        <span
          className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : ""}`}
        >
          {task.text}
        </span>
      )}
      <button
        className={`text-xs hover:text-blue-700 transition ${theme === "dark" ? "text-black" : "text-blue-500"}`}
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        className="text-xs text-red-500 hover:text-red-700 transition"
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </li>
  );
}
