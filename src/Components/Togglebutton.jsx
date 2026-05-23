import { useState } from "react";

export default function Togglebutton() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div
      onClick={handleToggle}
      style={{ backgroundColor: isOn ? "#000000" : "#ff0000" }}
      className="relative inline-flex items-center w-28 h-14 px-[5px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
    >
      <div
        style={{
          transform: isOn ? "translateX(60px)" : "translateX(0px)",
          transition: "transform 0.3s ease-in-out",
        }}
        className="w-10 h-10 bg-gray-100 rounded-full shadow-sm z-50"
      ></div>
    </div>
  );
}
