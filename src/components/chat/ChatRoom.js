import { useState, useEffect, useRef } from "react";
import { createConnection, sendMessage } from "./chat.js";
import { showNotification } from "./notifications.js";

const serverUrl = "https://localhost:1234";

export default function ChatRoom({ roomId, theme }) {
  const [message, setMessage] = useState("");

  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      showNotification("Connected!", themeRef.current);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  function handleSendClick() {
    sendMessage(message);
  }

  return (
    <>
      <h1 className="font-bold mb-2">
        Welcome to the <span className="text-blue-500">{roomId}</span> room!
      </h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="rounded-lg bg-neutral-secondary-medium resize-none border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
      />
      <button
        className="mt-2 bg-gradient-to-r text-white cursor-pointer rounded-lg from-cyan-500 to-blue-500 hover:bg-gradient-to-bl transition-all focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
        onClick={handleSendClick}
      >
        Send
      </button>
    </>
  );
}
