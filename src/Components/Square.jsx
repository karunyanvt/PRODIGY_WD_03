import React from "react";

const Square = ({ value, onClick, size = "small" }) => {
  const baseSize = size === "small" ? "w-16 h-16 md:w-20 md:h-20" : "w-24 h-24"; // Adjust size for responsiveness
  const styles = `flex items-center justify-center ${baseSize} bg-gray-800 border-2 border-gray-600 text-white font-bold text-2xl cursor-pointer 
                  rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-700`;

  return (
    <div className={styles} onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;
