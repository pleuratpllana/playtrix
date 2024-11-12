import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../components/shared/Loader";
import Hero from "../assets/hero.png";
import {
  PlayCircleIcon,
  CheckCircleIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

import Button from "../components/shared/UI/Button";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup
    .string()
    .matches(/@/, "Email must contain the '@' symbol")
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export const Landing = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleForm = () => setIsFormOpen(true);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <Loader />;
  }

  return (
    <main className="bg-gradient-to-t from-[#2b2d2d] to-black w-full min-h-screen flex flex-col lg:flex-row items-center justify-between p-8 lg:p-20 relative overflow-x-hidden">
      {/* Left Section */}
      <div className="left-section flex flex-col max-w-xl lg:max-w-4xl items-start px-1 lg:px-12 mb-10 lg:mb-20 relative transition-all duration-500 ease-in-out">
        {!isFormOpen && (
          <>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight relative">
              <span className="text-white/70">Thousands</span> of songs, crafted
              for your{" "}
              <span className="relative text-white">
                ears
                <span className="line absolute left-0 right-0 top-8 sm:top-10 lg:top-16 h-1.5 bg-gradient-to-r from-green-500 to-green-600"></span>
              </span>
              .
            </h1>
            <p className="text-white/70 text-lg sm:text-xl lg:text-2xl mt-4">
              Anywhere. Anytime. Any Mood.
            </p>
          </>
        )}

        {/* Expandable Button/Form */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isFormOpen
              ? "max-h-screen mt-6 bg-transparent border border-gray-600 p-6 lg:p-10 rounded-lg shadow-lg w-full lg:w-[700px]"
              : "max-h-16 mt-10 w-48"
          }`}
        >
          {!isFormOpen ? (
            <Button
              text="Start Streaming"
              onClick={toggleForm}
              icon={PlayCircleIcon}
              className="py-3.5"
              iconClassName="w-7 h-7"
            />
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white/95">
                Create Your Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-white/90 text-md mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...register("name")}
                    placeholder="Your Name"
                    className="bg-white/20 shadow appearance-none rounded text-white w-full p-3 border-2 focus:border-green-500 focus:ring-0 focus:outline-none transition-all duration-300"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-white/90 text-md mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Your Email"
                    className="bg-white/20 shadow appearance-none rounded text-white w-full p-3 border-2 focus:border-green-500 focus:ring-0 focus:outline-none transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="block text-white/90 text-md mb-2"
                  >
                    Password
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    placeholder="Your Password"
                    className="bg-white/20 shadow appearance-none rounded text-white w-full p-3 border-2 focus:border-green-500 focus:ring-0 focus:outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-12 flex items-center"
                  >
                    {isPasswordVisible ? (
                      <EyeSlashIcon className="w-5 h-5 text-white/90" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-white/90" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-col items-start">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("terms")}
                      className="mr-2 h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-white/90 text-md">
                      I accept the terms and conditions
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <Button
                  text="Join PlayTrix"
                  type="submit"
                  icon={UserIcon}
                  isSubmit={true}
                  className="mt-4"
                />
              </form>
            </div>
          )}
        </div>

        {/* Feature List */}
        {!isFormOpen && (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mt-10 lg:mt-20 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-white" />
              <span>Stream offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-white" />
              <span>Daily updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-white" />
              <span>Free 30-day trial</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="absolute bottom-0 right-0 w-full lg:w-auto flex justify-center lg:block">
        <img src={Hero} alt="Hero" className="custom-img" />
      </div>
    </main>
  );
};

export default Landing;
