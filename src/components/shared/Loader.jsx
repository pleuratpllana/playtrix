import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../../assets/Loader.json";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white -mb-10">
      <Lottie
        animationData={successAnimation}
        loop={true}
        style={{ width: 250, height: 250 }}
      />
      <p className="mt-2 font-md text-3xl -mb-20">
        Account created successfully... redirecting you to the dashboard
      </p>
    </div>
  );
};

export default Loader;
