import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Error from "../assets/error.png";

export const Error404 = () => {
  return (
    <main className="bg-gradient-to-t from-[#2b2d2d] to-black flex flex-col justify-center items-center min-h-screen text-white">
      <img src={Error} alt="Error Illustration" className="w-auto h-auto" />
      <p className="mt-4 text-3xl mb-6">
        The page you are looking for does not exist
      </p>
      <Link to="/dashboard">
        <span className="mt-8 bg-gradient-to-r py-3.5 px-5 from-green-500 to-green-600 hover:bg-gradient-to-l text-white font-bold rounded-full flex items-center justify-center space-x-2 transition-all duration-300 inline-block">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Go to Dashboard</span>
        </span>
      </Link>
    </main>
  );
};

export default Error404;
