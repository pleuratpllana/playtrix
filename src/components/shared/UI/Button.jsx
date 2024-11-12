import { PlayCircleIcon, UserIcon } from "@heroicons/react/24/outline";

// Define the Button component
const Button = ({
  text,
  onClick,
  icon: Icon,
  isSubmit = false,
  additionalClasses = "",
  className = "", // Classname for button styling
  iconClassName = "", // Classname for icon styling
  type = "button", // 'button' or 'submit'
}) => {
  return (
    <button
      onClick={onClick}
      type={isSubmit ? "submit" : type} // Use submit type if specified
      className={`bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-l text-white font-bold px-4 py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 ${className} ${additionalClasses}`}
    >
      <span>{text}</span>
      {Icon && <Icon className={`w-5 h-5 ${iconClassName}`} />}
    </button>
  );
};

export default Button;
