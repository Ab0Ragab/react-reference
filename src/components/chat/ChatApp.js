import { useState } from "react";
import ChatRoom from "./ChatRoom";

export default function ChatApp() {
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="bg-white shadow p-5 rounded-lg">
      <div>
        <label>
          <span className="font-semibold">Choose the chat room: </span>
          <select
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="general">general</option>
            <option value="travel">travel</option>
            <option value="music">music</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            checked={isDark}
            onChange={(e) => setIsDark(e.target.checked)}
          />
          <span className="ps-2">Use dark theme</span>
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition mt-2 ms-4"
          onClick={() => setShow(!show)}
        >
          {show ? "Close chat" : "Open chat"}
        </button>
      </div>

      {show && <hr className="my-5" />}
      {show && (
        <ChatRoom
          roomId={roomId}
          key={roomId}
          theme={isDark ? "dark" : "light"}
        />
      )}
    </div>
  );
}
