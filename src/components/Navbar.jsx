import React, { useState } from 'react';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass =
    "relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-500 hover:after:w-full";

  return (
    <nav className="bg-white text-black border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <div className="hidden md:flex text-sm font-medium uppercase">
          <a href="#" className={`${linkClass} block px-3`}>Daftar Film</a>
          <a href="#" className={`${linkClass} block px-3`}>Cari Bioskop</a>
          <a href="#" className={`${linkClass} block px-3`}>Tentang Kami</a>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white flex flex-col text-sm font-medium uppercase">
          <a href="#" className={`${linkClass} block py-2`}>Daftar Film</a>
          <a href="#" className={`${linkClass} block py-2`}>Cari Bioskop</a>
          <a href="#" className={`${linkClass} block py-2`}>Tentang Kami</a>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
