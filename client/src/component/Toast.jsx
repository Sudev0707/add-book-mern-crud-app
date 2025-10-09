import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start animation
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false); // start fade out
      setTimeout(onClose, 300); // remove from DOM after fade-out
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div
    //   className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
    //     visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
    //   } ${bgColor} pointer-events-auto z-50`}

     className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      } ${bgColor} pointer-events-auto z-50`}
    >
      {message}
    </div>
  );
};

export default Toast;
