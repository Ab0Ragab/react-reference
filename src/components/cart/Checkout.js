import { useActionState } from "react";
import { addToCart, removeFromCart } from "./api";
import Total from "./Total";
import QuantityStepper from "./QuantityStepper";

export default function Checkout() {
  const [count, dispatchAction, isPending] = useActionState(
    updateCartAction,
    0,
  );

  function addAction() {
    dispatchAction({ type: "ADD" });
  }

  function removeAction() {
    dispatchAction({ type: "REMOVE" });
  }

  return (
    <div className="bg-white shadow p-5 rounded-lg mt-5">
      <h2 className="font-bold mb-2">Checkout</h2>
      <div className="flex justify-between">
        <span>Eras Tour Tickets</span>
        <QuantityStepper
          value={count}
          increaseAction={addAction}
          decreaseAction={removeAction}
        />
      </div>
      <hr className="my-4" />
      <Total quantity={count} isPending={isPending} />
    </div>
  );
}

async function updateCartAction(prevCount, actionPayload) {
  switch (actionPayload.type) {
    case "ADD": {
      return await addToCart(prevCount);
    }
    case "REMOVE": {
      return await removeFromCart(prevCount);
    }
    default:
      return prevCount;
  }
}
