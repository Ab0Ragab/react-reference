import { useState } from "react";
import { toast } from "react-toastify";
import { useOnlineStatus } from "../shared/hooks/useOnlineStatus";
import Loader from "./Loader";
import { ThemeContext } from "../shared/contexts/themeContext";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("typing");
  const isOnline = useOnlineStatus();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success", { type: "success" });
      toast("That's right!");
    } catch (err) {
      setStatus("typing");
      toast(err.message, { type: "error" });
    }
  }

  const handleTextareaChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <ThemeContext value="light">
      <div className="my-10">
        <h1 className="font-bold mb-2">
          City quiz {isOnline ? "✅ Online" : "❌ Disconnected"}
        </h1>
        <p className="text-blue-500 mb-4">
          In which city is there a billboard that turns air into drinkable
          water?
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={answer}
            onChange={handleTextareaChange}
            disabled={status === "submitting"}
            className=" bg-neutral-secondary-medium resize-none border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
            placeholder="Write your thoughts here..."
          />
          <br />
          <button
            disabled={answer.length === 0 || status === "submitting"}
            type="submit"
            className={
              answer.length === 0 || status === "submitting"
                ? "bg-gray-400 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 cursor-not-allowed transition-all"
                : "bg-gradient-to-r text-white cursor-pointer rounded-lg from-cyan-500 to-blue-500 hover:bg-gradient-to-bl transition-all focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
            }
          >
            {status === "submitting" ? <Loader /> : "Submit"}
          </button>
        </form>
      </div>
    </ThemeContext>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
