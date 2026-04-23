import { startTransition, useOptimistic } from "react";
import Loader from "../Loader";

export default function QuantityStepper({
  value,
  increaseAction,
  decreaseAction,
}) {
  const [optimisticValue, setOptimisticValue] = useOptimistic(value);
  const isPending = value !== optimisticValue;

  function handleIncrease() {
    startTransition(async () => {
      setOptimisticValue((c) => c + 1);
      await increaseAction();
    });
  }

  function handleDecrease() {
    startTransition(async () => {
      setOptimisticValue((c) => Math.max(0, c - 1));
      await decreaseAction();
    });
  }

  async function formAction(formData) {
    const type = formData.get("type");
    if (type === "ADD") {
      handleIncrease();
    } else {
      handleDecrease();
    }
  }

  return (
    <>
      <span className="text-blue-500">{isPending && <Loader />}</span>
      <form action={formAction}>
        <div className="flex items-center flex-col">
          <button
            type="submit"
            name="type"
            value="ADD"
            className="bg-gray-400 hover:bg-gray-500 text-black hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition w-12"
          >
            ▲
          </button>
          <span className="text-blue-500 font-bold my-2 flex items-center">
            <span>{optimisticValue}</span>
          </span>
          <button
            type="submit"
            name="type"
            value="REMOVE"
            className="bg-gray-400 hover:bg-gray-500 text-black hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition w-12"
          >
            ▼
          </button>
        </div>
      </form>
    </>
  );
}
