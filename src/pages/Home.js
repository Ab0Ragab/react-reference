import PackingList from "../components/PackingList";
import FilterableProductTable from "../components/FilterableProductTable";
import Toolbar from "../components/Toolbar";
import Gallery from "../components/Gallery";
import { toast } from "react-toastify";
import Form from "../components/Form";
import Accordion from "../components/Accordion";
import TaskApp from "../components/tasks/TaskApp";
import ChatApp from "../components/chat/ChatApp";
import { PRODUCTS } from "../shared/data/data";
import Checkout from "../components/cart/Checkout";
import Users from "../components/Users";
import { Suspense } from "react";
import Loader from "../components/Loader";
import AnimationExample from "../components/AnimationExample";
import { createPortal } from "react-dom";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 place-items-center min-h-screen py-10 gap-20 px-20">
      <div className="col-span-1 md:col-span-3 w-full">
        {createPortal(
          <footer className="bg-gray-800 text-white text-center py-1 text-xs">
            <p>
              &copy; {currentYear} My App. All rights reserved.
            </p>
          </footer>,
          document.body,
        )}
        <Gallery />
        <ChatApp />
        <Checkout />
      </div>

      <div className="col-span-1 md:col-span-6 w-full">
        <Toolbar
          onPlayMovie={() => toast("Playing!")}
          onUploadImage={() => toast("Uploading!")}
        />
        <PackingList />
        <Form />
        <Accordion />
        <Suspense fallback={<Loader />}>
          <Users />
        </Suspense>
      </div>

      <div className="col-span-1 md:col-span-3 w-full">
        <FilterableProductTable products={PRODUCTS} />
        <TaskApp />
        <AnimationExample />
      </div>
    </div>
  );
}
