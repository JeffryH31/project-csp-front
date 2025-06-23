import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("You have been successfully logged out.");
  };

  const buttonClass =
    "px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200";

  return (
    <nav className="bg-black/50 backdrop-blur-lg text-white w-full sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                <span className="text-lg font-medium hidden sm:block glow-text">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <Link
                  to="/history"
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-600`}
                >
                  My Tickets
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${buttonClass} bg-red-600 hover:bg-red-700`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`${buttonClass} bg-cyan-500 hover:bg-cyan-600`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
