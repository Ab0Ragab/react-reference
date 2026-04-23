import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksProvider } from "./TasksContext.js";

export default function TaskApp() {
  return (
    <TasksProvider>
      <div className="my-10 bg-white rounded-xl shadow-md p-6">
        <h1 className="text-lg font-bold mb-4">Prague itinerary</h1>
        <AddTask />
        <TaskList />
      </div>
    </TasksProvider>
  );
}
