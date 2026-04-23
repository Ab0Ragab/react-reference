import Loader from "../Loader";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export default function Total({ quantity, isPending }) {
  return (
    <div className="flex justify-between font-bold">
      <span>Total</span>
      <span className="text-blue-500">
        {" "}
        {isPending ? <Loader /> : formatter.format(quantity * 9999)}
      </span>
    </div>
  );
}
