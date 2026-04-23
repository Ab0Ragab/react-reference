import { toast } from "react-toastify";

export function showNotification(message, theme) {
  toast(message, {
    style: {
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#333",
    },
  });
}
