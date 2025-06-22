import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass =
    "relative block px-3 py-2 transition-colors duration-300 hover:text-cyan-400";
  const mobileLinkClass =
    "block py-3 px-4 text-center transition-colors duration-300 hover:bg-zinc-800 rounded-md";

  return (
    <nav className="bg-black/50 backdrop-blur-lg text-white w-full sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium uppercase">
            <Link to="/movies" className={linkClass}>
              Now Showing
            </Link>
            <Link to="/cinemas" className={linkClass}>
              Theaters
            </Link>
            <Link to="/about" className={linkClass}>
              About Us
            </Link>
          </div>
          <div className="hidden md:block">
            <Link
              to="/login"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-cyan-600 transition-colors"
            >
              Login
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none p-2">
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-1 bg-zinc-900/90 flex flex-col text-sm font-medium uppercase">
          <Link to="/movies" className={mobileLinkClass}>
            Now Showing
          </Link>
          <Link to="/cinemas" className={mobileLinkClass}>
            Theaters
          </Link>
          <Link to="/about" className={mobileLinkClass}>
            About Us
          </Link>
          <Link
            to="/login"
            className="bg-cyan-500 text-white mt-2 py-3 px-4 rounded-md text-center font-semibold hover:bg-cyan-600 transition-colors"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
