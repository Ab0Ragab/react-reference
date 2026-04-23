import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-600 text-lg mb-4">Welcome to My App. Explore and enjoy!</p>
        <Link to="/home" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Home</Link>
      </div>
    </div>
  );
}
