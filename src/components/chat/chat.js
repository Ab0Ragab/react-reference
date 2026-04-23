import { toast } from "react-toastify";

export function sendMessage(message) {
  (message?.trim() &&
    toast("🔵 You sent: " + message, {
      position: "bottom-center",
    })) ||
    toast("please enter a message", {
      type: "info",
      position: "bottom-center",
    });
}

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error("Cannot add the handler twice.");
      }
      if (event !== "connected") {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    },
  };
}
