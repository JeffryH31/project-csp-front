import React, { useState } from 'react';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-10 w-auto" src={logo} alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-semibold text-blue-900">
          <a href="#" className="hover:text-yellow-500">HOME</a>
          <a href="#" className="hover:text-yellow-500">TIX NOW</a>
          <a href="#" className="hover:text-yellow-500">TIX EVENTS</a>
          <a href="#" className="hover:text-yellow-500">CAREERS</a>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-4 py-2 rounded-full">
            DOWNLOAD TIX ID
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <span className="block w-6 h-0.5 bg-blue-900 mb-1"></span>
            <span className="block w-6 h-0.5 bg-blue-900 mb-1"></span>
            <span className="block w-6 h-0.5 bg-blue-900"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white">
          <a href="#" className="block py-2 font-semibold text-blue-900 hover:text-yellow-500">HOME</a>
          <a href="#" className="block py-2 font-semibold text-blue-900 hover:text-yellow-500">TIX NOW</a>
          <a href="#" className="block py-2 font-semibold text-blue-900 hover:text-yellow-500">TIX EVENTS</a>
          <a href="#" className="block py-2 font-semibold text-blue-900 hover:text-yellow-500">CAREERS</a>
          <button className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-4 py-2 rounded-full">
            DOWNLOAD TIX ID
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
