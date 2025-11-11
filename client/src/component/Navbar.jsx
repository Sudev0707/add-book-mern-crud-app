import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };

  return (
    <nav className="w-full flex justify-between items-center bg-gray-100 shadow-md px-6 py-4 fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="font-extrabold text-3xl text-blue-700 tracking-wide cursor-pointer">
          CRUD
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-800">
        <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200"></li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200"></li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200"></li>
      </ul>

      {/* Optional CTA Button */}
      <div className="hidden md:flex">
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 shadow transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div
        className="md:hidden flex flex-col gap-[5px] cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-[3px] bg-gray-800 rounded-md"></span>
        <span className="w-6 h-[3px] bg-gray-800 rounded-md"></span>
        <span className="w-6 h-[3px] bg-gray-800 rounded-md"></span>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-100 shadow-md md:hidden transition-all duration-300 ease-in-out">
          <ul className="flex flex-col items-center gap-4 py-5 font-medium text-gray-800">
            <li
              className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {/* Home */}
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {/* About */}
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {/* Contact */}
            </li>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 shadow transition-all duration-200">
              Sign In
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
