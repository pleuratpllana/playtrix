import { useRef } from "react";

const Accordion = ({ id, question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  return (
    <div
      className={`border-b pb-7 ${
        isOpen ? "border-green-600" : "border-white/80"
      } bg-transparent shadow-sm`}
    >
      <h3
        onClick={() => onToggle(id)}
        className={`font-semibold text-xl cursor-pointer flex justify-between items-center ${
          isOpen ? "text-green-600" : "text-white/90"
        }`}
      >
        {question}
        <span className={`${isOpen ? "text-green-600" : "text-white/90"}`}>
          {isOpen ? "-" : "+"}
        </span>
      </h3>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
        }}
      >
        <p className="mt-2 text-white/80 text-md">{answer}</p>
      </div>
    </div>
  );
};

export default Accordion;
